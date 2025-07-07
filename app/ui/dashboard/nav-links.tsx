"use client";

import {
  ClipboardDocumentListIcon,
  // CurrencyDollarIcon,
  ShoppingCartIcon,
  TableCellsIcon,
  UserGroupIcon,
  // InboxIcon,
  DocumentArrowDownIcon,
  UserIcon,
  // EyeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
// import { Users2Icon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { name: "Пользователи", href: "/mailing", icon: UserGroupIcon },
  { name: "Users", href: "/users", icon: UserGroupIcon },
  { name: "Каталог", href: "/catalogue", icon: ClipboardDocumentListIcon },
  { name: "Поиск", href: "/search", icon: MagnifyingGlassIcon },
  { name: "Catalogue Table", href: "/table", icon: TableCellsIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon },
  { name: "Накладные", href: "/waybills", icon: DocumentArrowDownIcon },
  { name: "Профиль", href: "/profile", icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
