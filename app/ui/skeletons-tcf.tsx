// Loading animation
const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
	return (
		<div
			className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-50 shadow-sm`}
		>
			<div className="flex flex-col items-center">
				{/* Image placeholder (64x64) */}
				<div className="mt-4 h-[64px] w-[64px] bg-gray-200 rounded" />

				{/* Title placeholder (mimics h3) */}
				<div className="h-[20px] w-[80%] bg-gray-200 rounded-md mt-4 mb-4" />
			</div>
		</div>
	);
}

export function CardsSkeleton() {
	return (
		<>
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</>
	);
}
