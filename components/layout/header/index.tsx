"use client";

import { UserButton } from "@clerk/nextjs";
import { PanelLeftIcon } from "lucide-react";
import * as React from "react";

import { CartSheet } from "@/app/ui/cart/cart-sheet";
import LocaleSwitcher from "@/components/layout/header/locale-swithcer";
import Search from "@/components/layout/header/search";
import { ThemeToggle } from "@/components/layout/header/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-50 flex flex-col">
      <header className="flex h-14 items-center gap-3 bg-background/50 px-4 backdrop-blur-xl lg:h-[60px]">
        <Button onClick={toggleSidebar} size="icon" variant="outline" className="flex md:hidden lg:flex">
          <PanelLeftIcon />
        </Button>
        <Search />
        <CartSheet />
        <LocaleSwitcher />
        <ThemeToggle />
        <UserButton showName />
      </header>
    </div>
  );
}
