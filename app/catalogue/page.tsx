
import type { Category } from "@/app/lib/schemas/categorySchema";
import { CategoryCard } from "@/app/ui/catalogue/cards/category-card";
import { lusitana } from "@/app/ui/fonts";
import {fetchCategories} from "@/app/lib/apis/categoryApi";

export default async function Catalogue() {
	const categories: Category[] = await fetchCategories();
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Каталог
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{categories.map((category: Category) => (
					<CategoryCard
						key={category.id}
						name={category.name}
						image_url={category.image_url}
						category_slug={category.slug}
						category_id={category.id}
					/>
				))}
			</div>
		</main>
	);
}
