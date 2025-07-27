import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import NavLinks from "@/components/layout/nav-links";
import Logo from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/header/theme-toggle";

export default function SideNav() {
  return (
    <aside className="flex h-full flex-col justify-between border-r bg-background p-2 text-foreground">
      <div>
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-900 p-2 md:h-40"
          href="/public"
        >
          <div className="w-32 text-white md:w-40">
            <Logo />
          </div>
        </Link>
        <NavLinks />
      </div>

      <SignedIn>
        <div className="flex items-center justify-between gap-2 mt-4">
          <ThemeToggle />
          <UserButton showName />
        </div>
      </SignedIn>
    </aside>
  );
}
