import SideNav from "@/app/ui/dashboard/sidenav";
import { Toaster } from "@/components/ui/toaster";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Рассылка | TCF",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
                <Toaster />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}