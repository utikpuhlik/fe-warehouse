import { OfferCard } from "@/app/ui/catalogue/cards/offer-card";
import { fetchProductById } from "@/app/lib/apis/productApi";
import { fetchOffersByProductId } from "@/app/lib/apis/offerApi";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import type {
  OfferSchema,
  OfferPaginatedSchema,
} from "@/app/lib/schemas/offerSchema";
import { notFound } from "next/navigation";
import { CreateOfferModal } from "@/app/ui/catalogue/offer/create-dialog";
import type { Product } from "@/app/lib/schemas/productSchema";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Props = {
  params: Promise<{ product_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_id } = await params;
  const product = await fetchProductById(product_id);
  if (!product) {
    const t = await getTranslations("PageTitles");
    const tDesc = await getTranslations("PageDescriptions");
    return {
      title: t("product_not_found"),
      description: tDesc("product_not_found"),
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} | TCF`,
    description: `Предложения для товара ${product.name}, категория ${product.sub_category.category.name}, подкатегория ${product.sub_category.name}`,
  };
}

export default async function OffersPage({ params }: Props) {
  const breadcrumbT = await getTranslations("Breadcrumbs");
  const { product_id } = await params;

  const product: Product = await fetchProductById(product_id);

  if (!product) {
    notFound();
  }
  const category_slug = product.sub_category.category.slug;
  const sub_category_slug = product.sub_category.slug;

  const offersData: OfferPaginatedSchema =
    await fetchOffersByProductId(product_id);
  const offers: OfferSchema[] = offersData.items ?? [];

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumbs
          breadcrumbs={[
            { label: breadcrumbT("catalogue"), href: "/catalogue" },
            {
              label: product.sub_category.category.name,
              href: `/catalogue/${category_slug}`,
              active: false,
            },
            {
              label: product.sub_category.name,
              href: `/catalogue/${category_slug}/${sub_category_slug}`,
              active: false,
            },
            {
              label: product.name,
              href: `/catalogue/${category_slug}/${sub_category_slug}/${product_id}`,
              active: true,
            },
          ]}
        />
        <CreateOfferModal {...product} />
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </main>
  );
}
