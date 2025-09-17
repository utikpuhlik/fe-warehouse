import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { fetchCategories } from "@/app/lib/apis/categoryApi";
import type { Category } from "@/app/lib/schemas/categorySchema";
import { SearchDropdown } from "@/app/modules/search-dropdown/search-dropdown";
import { CatalogueCard } from "@/app/ui/catalogue/cards/catalogue-card";
import { CreateCategoryModal } from "@/app/ui/catalogue/category/create-dialog";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  const tDesc = await getTranslations("PageDescriptions");
  return {
    title: t("catalogue"),
    description: tDesc("catalogue"),
  };
}

export default async function CategoriesPage() {
  const t = await getTranslations("CataloguePage");
  const categories: Category[] = await fetchCategories();
  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">{t("catalogue")}</h1>
        <SearchDropdown />
        <CreateCategoryModal />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category: Category) => (
          <CatalogueCard key={category.id} type="category" entity={category} />
        ))}
      </div>
    </main>
  );
}
