import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";
import {CategoryForm} from "@/app/ui/catalogue/category/create-form";

export default async function Page() {
    const customers = await fetchCustomers();

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
