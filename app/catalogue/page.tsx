
import type { Category } from "@/app/lib/schemas/categorySchema";
import { CategoryCard } from "@/app/ui/catalogue/cards/category-card";
import { lusitana } from "@/app/ui/fonts";
import {fetchCategories} from "@/app/lib/apis/categoryApi";
import {CreateCategoryModal} from "@/app/ui/catalogue/category/create-dialog";

export default async function CategoriesPage() {
	const categories: Category[] = await fetchCategories();
	return (
		<main>
			<div className="mb-4 flex items-center justify-between">
				<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
					Каталог
				</h1>
				<CreateCategoryModal />
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{categories.map((category: Category) => (
					<CategoryCard
						key={category.id}
						{...category}
					/>
				))}
			</div>
		</main>
	);
}
