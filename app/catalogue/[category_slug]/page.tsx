import { fetchSubCategories } from "@/app/lib/data-tcf";
import { SubCategoryCard } from "@/app/ui/catalogue/cards";
import { lusitana } from "@/app/ui/fonts";

type Props = {
    params: { category_slug: string };
};

export default async function SubCategoriesPage({ params }: Props) {
    const { category_slug } = await params;
    const subcategories = await fetchSubCategories(category_slug);

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Subcategories for "{category_slug}"
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {subcategories.map((sub) => (
                    <SubCategoryCard
                        key={sub.id}
                        title={sub.name}
                        image_url={sub.image_url}
                        slug={sub.slug}
                        parentSlug={category_slug}
                    />
                ))}
            </div>
        </main>
    );
}
