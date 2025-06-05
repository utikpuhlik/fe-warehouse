"use client";

import Image from "next/image";
import { imageUrlPlaceholder } from "@/app/lib/config/config";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {EditOfferModal} from "@/app/ui/catalogue/offer/edit-dialog";

export default function OffersTable({ offers }: { offers: OfferSchema[] }) {
	return (
		<div className="mt-6 w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Товар</TableHead>
						<TableHead>Бренд</TableHead>
						{/*<TableHead>Кросс-номер</TableHead>*/}
						<TableHead>Номер производителя</TableHead>
						<TableHead>Остаток</TableHead>
						<TableHead>Цена</TableHead>
						<TableHead className="text-right">Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{offers.map((offer) => (
						<TableRow key={offer.id} className="group relative">
							<TableCell>
								<div className="flex items-center gap-3">
									<Image
										src={offer.image_url ?? imageUrlPlaceholder}
										className="rounded-full"
										width={28}
										height={28}
										alt={`${offer.product_name}`}
									/>
									<span>{offer.product_name}</span>
								</div>
							</TableCell>
							<TableCell>{offer.brand}</TableCell>
							{/*<TableCell>{offer.cross_number}</TableCell>*/}
							<TableCell>{offer.manufacturer_number}</TableCell>
							<TableCell>{offer.quantity}</TableCell>
							<TableCell>{`${offer.price_rub} ₽`}</TableCell>
							<TableCell className="text-right">
								<EditOfferModal {...offer} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
