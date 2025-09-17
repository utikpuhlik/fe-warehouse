"use client";

// import {useEffect} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/layout/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar
} from "@/components/ui/sidebar";
import { page_routes, PageRoutesType } from "@/lib/routes-config";

export default function Sidebar() {
  const pathname = usePathname();
  // const {setOpen, setOpenMobile, isMobile} = useSidebar();
  // useEffect(() => {
  //     if (isMobile) setOpenMobile(false);
  // }, [pathname]);

  return (
    <SidebarContainer collapsible="icon" variant="floating" className="bg-background">
      <SidebarHeader className="overflow-hidden rounded-t-md p-0">
        <Link href="/main" className="md:h-30 flex h-20 bg-blue-900 px-2">
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
                  className="rounded-md px-2 py-2 text-base transition-colors hover:bg-primary/15 [&_svg]:h-5 [&_svg]:w-5"
                  tooltip={route.title}
                >
                  <Link href={route.href}>
                    <route.icon className="text-muted-foreground" />
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
