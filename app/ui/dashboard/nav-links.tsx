"use client";

import {
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  TableCellsIcon,
  UserGroupIcon,
  DocumentArrowDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {cn} from "@/lib/utils";
import {LucideIcon} from "lucide-react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: "Home", href: "/dashboard", icon: HomeIcon },
  // {
  // 	name: "Invoices",
  // 	href: "/dashboard/invoices",
  // 	icon: DocumentDuplicateIcon,
  // },
  { name: "Панель", href: "/", icon: HomeIcon },
  { name: "Пользователи", href: "/users", icon: UserGroupIcon },
  { name: "Каталог", href: "/catalogue", icon: ClipboardDocumentListIcon },
  { name: "Поиск", href: "/search", icon: MagnifyingGlassIcon },
  { name: "Catalogue Table", href: "/table", icon: TableCellsIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon },
  { name: "Накладные", href: "/waybills", icon: DocumentArrowDownIcon },
  { name: "История", href: "/history", icon: ClockIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
      <nav className="flex flex-col space-y-1">
        {links.map((link) => {
          const LinkIcon: LucideIcon = link.icon;
          const isActive = pathname === link.href;

          return (
              <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
              >
                <LinkIcon className="h-6 w-6" />
                <span>{link.name}</span>
              </Link>
          );
        })}
      </nav>
  );
}
