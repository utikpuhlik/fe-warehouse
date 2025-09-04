import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils/utils";
import Link from "next/link";

type CartItemCardProps = {
  offer: OfferSchema;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItemCard({
  offer,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps) {
  return (
    <Card key={offer.id} className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="flex">
          {/* Product Image */}
          <div className="relative h-auto w-28 flex-shrink-0">
            <Image
              src={offer.product.image_url}
              alt={offer.product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-medium">
                  <Link
                    href={`/catalogue/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product.id}`}
                  >
                    {offer.product.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-xs">
                  <Link
                    href={`/catalogue/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}`}
                  >
                    {offer.product.sub_category.name}
                  </Link>
                </p>
                <p className="text-muted-foreground text-xs">
                  {offer.brand} • {offer.manufacturer_number}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(offer.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onDecrement(offer.id)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm">
                  {offer.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onIncrement(offer.id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">
                  {formatCurrency(offer.price_rub * offer.quantity)}
                </div>
                {/*{offer.price_rub && (*/}
                {/*    <div className="text-muted-foreground text-xs line-through">*/}
                {/*        $*/}
                {/*        {(offer.price_rub * offer.quantity).toFixed(*/}
                {/*            2,*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
