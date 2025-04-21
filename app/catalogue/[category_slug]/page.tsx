import { fetchSubCategories } from "@/app/lib/data-tcf";
import { SubCategoryCard } from "@/app/ui/catalogue/cards";
import { lusitana } from "@/app/ui/fonts";

type Params = Promise<{
    category_slug: string;
}>


export default async function SubCategoriesPage(props: {params: Params}) {
    const params = await props.params;
    const category_slug = params.category_slug;
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
                        sub_category_slug={sub.slug}
                        category_slug={category_slug}
                    />
                ))}
            </div>
        </main>
    );
}
