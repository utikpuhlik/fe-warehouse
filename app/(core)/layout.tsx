import {Toaster} from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {cookies} from "next/headers";
import Sidebar from "@/components/layout/sidebar";

export default async function CoreLayout(
    {
        children
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    const cookieStore = await cookies();
    const defaultOpen =
        cookieStore.get("sidebar_state")?.value === "true" ||
        cookieStore.get("sidebar_state") === undefined;

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar/>
            <SidebarInset>
                <Header/>
                <div
                    className="@container/main p-4 xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto xl:group-data-[theme-content-layout=centered]/layout:mt-8">
                    {children}
                </div>
                <Toaster/>
            </SidebarInset>
        </SidebarProvider>
    );
}