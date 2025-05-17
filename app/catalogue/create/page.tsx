
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {CategoryForm} from "@/app/ui/catalogue/category/create-form";

export default async function Page() {
    // const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Catalogue", href: "/catalogue" },
                    {
                        label: "Create Category",
                        href: "/catalogue/create",
                        active: true,
                    },
                ]}
            />
            <CategoryForm/>
        </main>
    );
}
