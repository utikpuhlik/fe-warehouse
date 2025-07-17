import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import NavLinks from "@/app/ui/dashboard/nav-links";
import Logo from "@/app/ui/logo";
import { ModeToggle } from "@/app/ui/mode-toggle";

export default function SideNav() {
    return (
        <aside className="flex h-full flex-col justify-between border-r bg-background p-2 text-foreground">
            <div>
                <Link
                    className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-900 p-4 md:h-40"
                    href="/"
                >
                    <div className="w-32 text-white md:w-40">
                        <Logo />
                    </div>
                </Link>
                <NavLinks />
            </div>

            <SignedIn>
                <div className="flex items-center justify-between gap-2 mt-4">
                    <ModeToggle />
                    <UserButton showName />
                </div>
            </SignedIn>
        </aside>
    );
}
