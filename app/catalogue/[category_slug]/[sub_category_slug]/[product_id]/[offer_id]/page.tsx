
import { OfferCard } from "@/app/ui/catalogue/cards";
import { lusitana } from "@/app/ui/fonts";
import {fetchOffersByProductId} from "@/app/lib/apis/offerApi";

// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
type Params = Promise<{
	category_slug: string;
	sub_category_slug: string;
	product_id: string;
	offer_id: string;
}>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const product_id = params.product_id;
	const offer_id = params.offer_id;

	const offerData = await fetchOffersByProductId(product_id);

	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Product: {offerData.name}
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				<OfferCard key={product_id} {...offerData} />
			</div>
		</main>
	);
}
