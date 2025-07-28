"use client";

// import {useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {page_routes, PageRoutesType} from "@/lib/routes-config";

import {
    Sidebar as SidebarContainer,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    // useSidebar
} from "@/components/ui/sidebar";
import {ScrollArea} from "@/components/ui/scroll-area";
import Logo from "@/components/layout/logo";

export default function Sidebar() {
    const pathname = usePathname();
    // const {setOpen, setOpenMobile, isMobile} = useSidebar();
    // useEffect(() => {
    //     if (isMobile) setOpenMobile(false);
    // }, [pathname]);


    return (
        <SidebarContainer collapsible="icon" variant="floating" className="bg-background">
            <SidebarHeader className="p-0 overflow-hidden rounded-t-md">
                <Link
                    href="/main"
                    className="flex h-20 md:h-30 px-2 bg-blue-900"
                >
                    <Logo />
                </Link>
            </SidebarHeader>


            <SidebarContent className="overflow-hidden">
                <ScrollArea className="h-full">
                    <SidebarMenu className="space-y-1 px-2 py-4">
                        {page_routes.map((route: PageRoutesType) => (
                            <SidebarMenuItem key={route.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === route.href}
                                    className="transition-colors rounded-md px-2 py-2 hover:bg-primary/15 text-base [&_svg]:h-5 [&_svg]:w-5"
                                    tooltip={route.title}
                                >
                                    <Link href={route.href}>
                                        <route.icon className="text-muted-foreground"/>
                                        <span>{route.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarContent>
        </SidebarContainer>
    );
}
