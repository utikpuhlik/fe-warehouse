import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { notFound } from "next/navigation";
import {fetchProductById} from "@/app/lib/apis/productApi";

type Params = Promise<{
	id: string;
}>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const id = params.id;
	const [product] = await Promise.all([
		fetchProductById(id),
	]);
	if (!product) {
		notFound();
	}
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
