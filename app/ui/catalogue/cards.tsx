"use client"



import Image from "next/image";
import Link from "next/link";

// components/category-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import {EditCategoryDialog} from "@/app/ui/catalogue/category/edit-category-dialog";
import {updateCategoryAction} from "@/app/lib/actions-tcf";
import {imageUrlPlaceholder} from "@/app/lib/config/config";
import {type CategoryPutSchema} from "@/app/lib/schemas/categorySchema";

type CategoryCardProps = {
	name: string
	image_url: string
	category_slug: string
	category_id: string
}

export function CategoryCard({ name, image_url, category_slug, category_id }: CategoryCardProps) {
	const handleSubmit = async (data: CategoryPutSchema) => {
		try {
			await updateCategoryAction(category_id, data)
			console.log("Category updated successfully")
		} catch (error) {
			console.error("Update failed", error)
		}
	}

	return (
		<Card className="relative group">
			<Link href={`/catalogue/${category_slug}`}>
			<CardContent className="flex flex-col items-center p-4">
				<Image
					src={image_url}
					alt={name}
					width={100}
					height={100}
					className="rounded-md object-cover"
				/>
				<h3 className="p-4 text-center text-sm font-medium">{name}</h3>
			</CardContent>
			</Link>

			{/* Модалка с редактированием */}
			<EditCategoryDialog
				initialData={{ name, image_url }}
				action={handleSubmit}
			/>
		</Card>
	)
}


export function SubCategoryCard({
	title,
	image_url,
	category_slug,
	sub_category_slug,
}: {
	title: string;
	image_url: string;
	category_slug: string;
	sub_category_slug: string;
}) {
	return (
		<div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
			<Link href={`/catalogue/${category_slug}/${sub_category_slug}`}>
				<div className="flex flex-col items-center p-7">
					<Image
						src={image_url ?? imageUrlPlaceholder}
						alt={sub_category_slug}
						width={100}
						height={100}
						className="block"
					/>
					<h3 className="p-4 text-center text-sm font-medium">{title}</h3>
				</div>
			</Link>
		</div>
	);
}

export function ProductCard({
	id,
	name,
	image_url,
	category_slug,
	sub_category_slug,
}: {
	id: string;
	name: string;
	image_url: string | null;
	category_slug: string;
	sub_category_slug: string;
}) {
	return (
		<div className="rounded-xl bg-gray-50 shadow-sm overflow-hidden">
			<Link href={`/catalogue/${category_slug}/${sub_category_slug}/${id}`}>
				<div className="flex flex-col items-center p-4">
					<Image
						src={image_url ?? imageUrlPlaceholder}
						alt={id}
						width={100}
						height={100}
						className="object-contain mb-2"
					/>
					<h3 className="text-center text-sm font-medium mb-1">{name}</h3>
				</div>
			</Link>
		</div>
	);
}

export function OfferCard({
	name,
	image_url,
	price_rub,
	brand,
	manufacturer_number,
	description,
}: {
	name: string;
	image_url: string | null;
	price_rub: number;
	brand: string;
	manufacturer_number: string;
	description?: string | null;
}) {
	return (
		<div className="max-w-xl mx-auto rounded-2xl shadow-md bg-white p-6">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-shrink-0">
					<Image
						src={image_url ?? imageUrlPlaceholder}
						alt={name}
						width={300}
						height={300}
						className="rounded-lg object-contain bg-gray-100"
					/>
				</div>

				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-xl font-bold text-gray-800 mb-2">{name}</h1>
						<p className="text-gray-500 text-sm mb-4">
							<span className="font-medium">Бренд:</span> {brand}
							<br />
							<span className="font-medium">Производитель №:</span>{" "}
							{manufacturer_number}
						</p>
						{description && (
							<p className="text-sm text-gray-600 mb-4">{description}</p>
						)}
					</div>

					<p className="text-lg font-semibold text-green-700 mt-4">
						{price_rub.toFixed(0)} ₽
					</p>
				</div>
			</div>
		</div>
	);
}
