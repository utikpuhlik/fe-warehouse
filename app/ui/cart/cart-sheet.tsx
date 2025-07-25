"use client"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/app/shared/api/cartStoreProvider"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function CartSheet() {
    const items = useCartStore((state) => state.items)
    const remove = useCartStore((state) => state.remove)
    const clear = useCartStore((state) => state.clear)
    const increment = useCartStore((state) => state.increment)
    const decrement = useCartStore((state) => state.decrement)

    return (
        <div className="fixed top-4 right-4 z-50">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {items.length > 0 && (
                        <Badge
                            variant="secondary"
                            className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5"
                        >
                            {items.length}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-[500px] sm:w-[540px] flex flex-col justify-between max-h-screen overflow-y-scroll">
                <div>
                    <SheetHeader>
                        <SheetTitle>Корзина</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="mt-4 pr-2">
                        {items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Корзина пуста</p>
                        ) : (
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="border-b pb-3 flex flex-col gap-2"
                                    >
                                        <div className="flex gap-3">
                                            <div className="relative w-[72px] h-[72px] rounded overflow-hidden border">
                                                <Image
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-sm">
                                                        <div className="font-medium leading-tight">
                                                          <Link href={`/catalogue/${item.product.sub_category.category.slug}/${item.product.sub_category.slug}/${item.product.id}`}>
                                                            {item.product.name}
                                                          </Link>
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            {item.brand} — {item.manufacturer_number}
                                                        </div>
                                                        <div className="text-muted-foreground text-xs">
                                                            {item.product.sub_category?.name}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => remove(item.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => decrement(item.id)}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <span className="text-sm">{item.quantity} шт</span>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() => increment(item.id)}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="text-sm font-medium">
                                                        {item.price_rub} ₽ × {item.quantity} ={" "}
                                                        <span className="text-primary">
                              {item.price_rub * item.quantity} ₽
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ScrollArea>
                </div>

                <SheetFooter className="mt-4 flex flex-col gap-2">
                    <Button
                        variant="secondary"
                        onClick={clear}
                        disabled={items.length === 0}
                    >
                        Очистить корзину
                    </Button>
                    <Button disabled={items.length === 0}>Создать накладную</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
        </div>
    )
}
