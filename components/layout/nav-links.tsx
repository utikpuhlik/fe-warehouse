"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {cn} from "@/lib/utils";
import { LucideIcon} from "lucide-react";
import {page_routes} from "@/lib/routes-config";

export default function NavLinks() {
  const pathname = usePathname();

  return (
      <nav className="flex flex-col space-y-1">
        {page_routes.map((link) => {
          const LinkIcon: LucideIcon = link.icon;
          const isActive = pathname === link.href;

          return (
              <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
              >
                <LinkIcon className="h-6 w-6" />
                <span>{link.title}</span>
              </Link>
          );
        })}
      </nav>
  );
}
