import SideNav from "@/app/ui/shared/sidenav";
import {Toaster} from "@/components/ui/toaster";
import {CartSheet} from "@/app/ui/cart/cart-sheet";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav/>
            </div>
            <div className="relative flex-grow p-6 md:overflow-y-auto md:p-12">
                {/* Корзина должна быть доступна в любом месте */}
                <div className="absolute top-6 right-6 z-50">
                    <CartSheet/>
                </div>

                {children}
            </div>

            <Toaster/>
        </div>
    );
}