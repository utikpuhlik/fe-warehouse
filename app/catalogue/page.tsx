import { fetchCategories } from "@/app/lib/data-tcf";
import type { Category } from "@/app/lib/schemas-tcf";
import { CategoryCard } from "@/app/ui/catalogue/cards";
import { lusitana } from "@/app/ui/fonts";

export default async function Catalogue() {
	const categories: Category[] = await fetchCategories();
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Каталог
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{categories.map((category) => (
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
