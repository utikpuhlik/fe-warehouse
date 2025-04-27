import Form from '@/app/ui/catalogue/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProductById, fetchUsers } from '@/app/lib/data-tcf';
import {notFound} from "next/navigation";

type Params = Promise<{
    id: string;
}>

export default async function Page(props: { params: Params }) {
    const params = await props.params;
    const id = params.id;
    const [product, users] = await Promise.all([
        fetchProductById(id),
        fetchUsers(),
    ]);
    if (!product) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/catalogue/table' },
                    {
                        label: 'Edit Product',
                        href: `/catalogue/table/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form id={id} product={product} users={users} />
        </main>
    );
}