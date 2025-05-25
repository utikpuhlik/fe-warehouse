import {BreadcrumbsSkeleton, CardSkeletonV2} from "@/app/ui/skeletons";


export default function Loading() {
	return (
		<main>
			<BreadcrumbsSkeleton />
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
				{Array.from({ length: 16 }).map((_, i) => (
					<CardSkeletonV2 key={i} />
				))}
			</div>
		</main>
	);
}
