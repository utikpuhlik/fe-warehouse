import { fetchUsers } from "@/app/lib/apis/userApi";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { notFound } from "next/navigation";
import {fetchProductById} from "@/app/lib/apis/productApi";

type Params = Promise<{
	id: string;
}>;

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
	console.log(users)
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Products", href: "/catalogue/table" },
					{
						label: "Edit Product",
						href: `/catalogue/table/${id}/edit`,
						active: true,
					},
				]}
			/>
			{/*<Form id={id} product={product} users={users} />*/}
		</main>
	);
}
