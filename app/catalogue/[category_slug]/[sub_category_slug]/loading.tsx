import { lusitana } from "@/app/ui/fonts";
import { CardSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Каталог
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{Array.from({ length: 24 }).map((_, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		</main>
	);
}
