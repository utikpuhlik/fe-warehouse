"use client";

import * as React from "react";
import {PanelLeftIcon} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";

import Search from "@/components/layout/header/search";
import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/layout/header/theme-toggle";
import {UserButton} from "@clerk/nextjs";
import {CartSheet} from "@/app/ui/cart/cart-sheet";

export default function Header() {
    const {toggleSidebar} = useSidebar();

    return (
        <div className="sticky top-0 z-50 flex flex-col">
            <header className="bg-background/50 flex h-14 items-center gap-3 px-4 backdrop-blur-xl lg:h-[60px]">
                <Button
                    onClick={toggleSidebar}
                    size="icon"
                    variant="outline"
                    className="flex md:hidden lg:flex">
                    <PanelLeftIcon/>
                </Button>
                <Search/>
                <CartSheet/>
                <ThemeToggle/>
                <UserButton showName/>
            </header>
        </div>
    );
}