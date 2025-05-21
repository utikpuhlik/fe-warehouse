
import { SubCategoryCard } from "@/app/ui/catalogue/cards/sub-category-card";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchCategoryBySlug} from "@/app/lib/apis/categoryApi";
import {fetchSubCategories} from "@/app/lib/apis/subCategoryApi";
import {CreateSubCategoryModal} from "@/app/ui/catalogue/sub-category/create-dialog";

type Params = Promise<{
	category_slug: string;
}>;

export default async function SubCategoriesPage(props: { params: Params }) {
	const params = await props.params;
	const category_slug = params.category_slug;
	const category = await fetchCategoryBySlug(category_slug);
	const subcategories = await fetchSubCategories(category_slug);
	console.log(subcategories)
	return (
		<main>
			<div className="mb-4 flex items-center justify-between">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Каталог", href: "/catalogue" },
					{
						label: category.name,
						href: `/catalogue/${category_slug}`,
						active: true,
					},
				]}
			/>
			<CreateSubCategoryModal category_id={category.id} category_slug={category.slug}/>
			</div>
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
