import Image from "next/image";
import Link from "next/link";

import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map(offer => (
            <TableRow key={offer.id} className="group relative">
              <TableCell>
                <Link
                  href={`/catalogue/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product_id}`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={offer.product.image_url ?? undefined}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${offer.product.name}`}
                    />
                    <span>{offer.product.name}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell>{offer.brand}</TableCell>
              {/*<TableCell>{offer.cross_number}</TableCell>*/}
              <TableCell>{offer.manufacturer_number}</TableCell>
              <TableCell>{offer.quantity}</TableCell>
              <TableCell>{`${offer.price_rub} ₽`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
