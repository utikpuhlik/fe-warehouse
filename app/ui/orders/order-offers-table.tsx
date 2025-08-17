import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import type { OrderOfferSchema } from "@/app/lib/schemas/orderOfferSchema";
import type { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { DeleteOrderOfferProxy } from "@/app/ui/orders/delete-order-offer";
import Link from "next/link";
import { OrderBadge } from "@/app/ui/orders/order-badge";
import { CustomerBadge } from "@/app/ui/users/customer-badge";
import { formatCurrency } from "@/app/lib/utils";
import { OrderOfferQuantityEditor } from "@/app/ui/orders/quantity-editor";
import { getDictionary } from "@/app/lib/i18n";
import { zOrderStatusEnum } from "@/app/lib/schemas/commonSchema";
import { getTranslations } from "next-intl/server";

const currentLang = "ru";
const dict = getDictionary(currentLang);

type OrderOffersTableProps = {
  order: OrderSchema;
};
export default async function OrderOffersTable({
  order,
}: OrderOffersTableProps) {
  const table = await getTranslations("OrderAndWaybillTable");
  const order_offers: OrderOfferSchema[] = order.order_offers;

  const totalSumRub = order_offers.reduce(
    (acc: number, order_offer: OrderOfferSchema) =>
      acc + order_offer.price_rub * order_offer.quantity,
    0,
  );

  if (!order_offers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {dict.orderDataTable.composition}
            <div className="flex items-center space-x-2">
              <OrderBadge orderStatus={order.status} />
              <CustomerBadge customerType={order.user.customer_type} />
            </div>
          </CardTitle>
        </CardHeader>
        <div className="p-4 text-muted-foreground">Позиции не добавлены</div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {dict.orderDataTable.composition}
          <div className="flex items-center space-x-2">
            <OrderBadge orderStatus={order.status} />
            <CustomerBadge customerType={order.user.customer_type} />
          </div>
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{table("number")}</TableHead>
            <TableHead>{table("address_code")}</TableHead>
            <TableHead>{table("photo")}</TableHead>
            <TableHead>{table("system")}</TableHead>
            <TableHead>{table("subsystem")}</TableHead>
            <TableHead>{table("product_name")}</TableHead>
            <TableHead>{table("manufacturer")}</TableHead>
            <TableHead>{table("manufacturer_number")}</TableHead>
            <TableHead>{table("quantity")}</TableHead>
            <TableHead>{table("price")}</TableHead>
            <TableHead>{table("total")}</TableHead>
            {order.status != zOrderStatusEnum.Enum.COMPLETED && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {order_offers.map((order_offer: OrderOfferSchema, index) => (
            <TableRow key={order_offer.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order_offer.offer.address_id}</TableCell>
              <TableCell>
                <Image
                  src={order_offer.offer.product.image_url}
                  alt={order_offer.offer.product.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}`}
                >
                  {order_offer.offer.product.sub_category.category.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}`}
                >
                  {order_offer.offer.product.sub_category.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}/${order_offer.offer.product_id}`}
                >
                  {order_offer.offer.product.name}
                </Link>
              </TableCell>
              <TableCell>{order_offer.brand}</TableCell>
              <TableCell>{order_offer.manufacturer_number}</TableCell>
              <TableCell>
                <OrderOfferQuantityEditor orderOffer={order_offer} />
              </TableCell>
              <TableCell>{formatCurrency(order_offer.price_rub)}</TableCell>
              <TableCell>
                {formatCurrency(order_offer.price_rub * order_offer.quantity)}
              </TableCell>
              {order.status != zOrderStatusEnum.Enum.COMPLETED && (
                <TableCell>
                  <DeleteOrderOfferProxy {...order_offer} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="font-semibold bg-muted/40">
            <TableCell colSpan={9} />
            <TableCell className="text-right">Σ</TableCell>
            <TableCell>{formatCurrency(totalSumRub)}</TableCell>
            {order.status != zOrderStatusEnum.Enum.COMPLETED && <TableCell />}
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
