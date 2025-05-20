import Form from "@/app/ui/catalogue/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchUsers} from "@/app/lib/apis/userApi";
import {fetchCategories} from "@/app/lib/apis/categoryApi";
import type {Category} from "@/app/lib/schemas/categorySchema";

export default async function Page() {
	const employees = await fetchUsers("employee");
	const categories: Category[] = await fetchCategories();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Products", href: "/catalogue/table" },
					{
						label: "Create Product",
						href: "/catalogue/table/create",
						active: true,
					},
				]}
			/>
			<Form employees={employees} categories={categories} />
		</main>
	);
}
