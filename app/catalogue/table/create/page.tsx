import { fetchCategories, fetchUsers } from "@/app/lib/data-tcf";
import Form from "@/app/ui/catalogue/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function Page() {
	const employees = await fetchUsers("employee");
	const categories = await fetchCategories();

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
