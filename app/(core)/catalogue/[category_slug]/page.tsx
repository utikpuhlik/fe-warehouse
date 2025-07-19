
import { SubCategoryCard } from "@/app/ui/catalogue/cards/sub-category-card";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchCategoryBySlug} from "@/app/lib/apis/categoryApi";
import {fetchSubCategories} from "@/app/lib/apis/subCategoryApi";
import {CreateSubCategoryModal} from "@/app/ui/catalogue/sub-category/create-dialog";
import type {SubCategory} from "@/app/lib/schemas/subCategorySchema";
import type {Category} from "@/app/lib/schemas/categorySchema";
import { notFound } from "next/navigation";
import type {Metadata} from "next";

type Props = {
	params: Promise<{ category_slug: string }>
};

export async function generateMetadata(
	{ params }: Props
): Promise<Metadata> {
	const { category_slug } = await params;
	const category: Category = await fetchCategoryBySlug(category_slug);
	if (!category) {
		return {
			title: "Категория не найдена | TCF",
			description: "Запрошенная категория не существует.",
			robots: { index: false, follow: false },
		};
	}

	return {
		title: `${category.name} | TCF`,
		description: `Подкатегории категории ${category.name}`,
	};
}

export default async function SubCategoriesPage({params}: Props ) {
	const { category_slug } = await params;
	const category: Category = await fetchCategoryBySlug(category_slug);
	if (!category) {
		notFound();
	}

	const subcategories: SubCategory[] = await fetchSubCategories(category.id);

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
			<CreateSubCategoryModal {...category}/>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
				{subcategories.map((sub: SubCategory) => (
					<SubCategoryCard
						key={sub.id}
						{...sub}
					/>
				))}
			</div>
		</main>
	);
}
