"use client"
import {
    Sheet,
    SheetContent, SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button"
import {ShoppingCart,} from "lucide-react"
import {useCartStore} from "@/app/shared/api/cartStoreProvider"
import {CreateWaybillFromCartDialog} from "@/app/ui/cart/create-waybill-from-cart-dialog";
import {useUser} from "@clerk/nextjs"
import {CartItemCard} from "@/app/ui/cart/cart-item-card";
import {OfferSchema} from "@/app/lib/schemas/offerSchema";
import {CartSummaryCard} from "@/app/ui/cart/cart-summary-card";
import {CreateOrderFromCartButton} from "./create-order-from-cart-button"
import {useTranslations} from "next-intl";

export function CartSheet() {
    const t = useTranslations("CartSheet")
    const items = useCartStore((state) => state.items)
    const remove = useCartStore((state) => state.remove)
    const clear = useCartStore((state) => state.clear)
    const increment = useCartStore((state) => state.increment)
    const decrement = useCartStore((state) => state.decrement)
    const {isSignedIn, user, isLoaded} = useUser();

// TODO(design): change to badge
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5"/>
                    {items.length > 0 && (
                        <span
                            className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {items.length}
                </span>
                    )}
                </Button>
            </SheetTrigger>

            {/*<SheetContent*/}
            {/*    className="w-[500px] sm:w-[540px] flex flex-col justify-between max-h-screen overflow-y-scroll">*/}
            <SheetContent className="w-full px-4 sm:max-w-lg md:px-6 flex flex-col">
                <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                        {items.length} {items.length === 1 ? t('item') : t('items')} в корзине
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="pr-2">
                    <div className="mt-4 space-y-6">
                        {/* Cart Items */}
                        <div className="space-y-4">
                            {items.map((item: OfferSchema) => (
                                <CartItemCard
                                    key={item.id}
                                    offer={item}
                                    onIncrement={increment}
                                    onDecrement={decrement}
                                    onRemove={remove}
                                />
                            ))}
                        </div>
                    </div>
                </ScrollArea>
                <SheetFooter className="mt-4 mr-2 flex flex-col gap-4 sm:flex-col">
                    <CartSummaryCard
                        total_sum_retail={items.reduce(
                            (s, i) => s + i.price_rub * i.quantity,
                            0,
                        )}
                        total_sum_wholesale={items.reduce(
                            (s, i) => s + i.wholesale_price_rub * i.quantity,
                            0,
                        )}
                        total_sum_super_wholesale={items.reduce(
                            (s, i) => s + i.super_wholesale_price_rub * i.quantity,
                            0,
                        )}
                    />
                    <div className="flex flex-row gap-4">
                        <Button
                            variant="secondary"
                            onClick={clear}
                            disabled={items.length === 0}
                            className="w-full"
                        >
                            {t('wipe_cart')}
                        </Button>

                        {isLoaded && isSignedIn && items.length > 0 && (
                            <>
                                <CreateWaybillFromCartDialog
                                    author_id={user?.publicMetadata._id as string}
                                    items={items}
                                />
                                <CreateOrderFromCartButton
                                    user_id={user?.publicMetadata._id as string}
                                    address_id="356f1d6f-0514-4e40-aad5-d59b91674320"
                                    items={items}
                                />
                            </>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
