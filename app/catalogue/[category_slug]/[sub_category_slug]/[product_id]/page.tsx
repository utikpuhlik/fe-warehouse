
import {OfferCard} from "@/app/ui/catalogue/cards/offer-card";
import {fetchProductById} from "@/app/lib/apis/productApi";
import {fetchOffersByProductId} from "@/app/lib/apis/offerApi";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import type {OfferSchema, OffersSchema} from "@/app/lib/schemas/offerSchema";
import {notFound} from "next/navigation";
import { CreateOfferModal } from "@/app/ui/catalogue/offer/create-dialog";
import type {Product} from "@/app/lib/schemas/productSchema";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
	product_id: string;
}>;

export default async function OffersPage(props: { params: Params }) {
	const params = await props.params;
	const product_id = params.product_id;

	const product: Product = await fetchProductById(product_id);

	if (!product) {
		notFound();
	}
	const category_slug = product.category_slug;
	const sub_category_slug = product.sub_category_slug;

	const offersData: OffersSchema = await fetchOffersByProductId(product_id);
	const offers: OfferSchema[] = offersData.items ?? [];

	return (
		<main>
		<div className="mb-4 flex items-center justify-between">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: "/catalogue" },
					{
						label: product.category_name,
						href: `/catalogue/${category_slug}`,
						active: false,
					},
					{
						label: product.sub_category_name,
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
      <CreateOfferModal {...product}/>
		</div>
			<div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
				{offers.map((offer) => (
					<OfferCard
						key={offer.id}
						{...offer}
					/>
				))}
			</div>
		</main>
	);
}