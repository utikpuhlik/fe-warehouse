import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Breadcrumb {
	label: string;
	href: string;
	active?: boolean;
}

export default function Breadcrumbs({
                                        breadcrumbs,
                                    }: {
    breadcrumbs: Breadcrumb[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="mb-4 block">
            <ol className="flex items-center text-base text-muted-foreground">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href} className="flex items-center">
                        <Link
                            href={breadcrumb.href}
                            aria-current={breadcrumb.active ? "page" : undefined}
                            className={clsx(
                                "transition-colors",
                                breadcrumb.active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {breadcrumb.label}
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                            <ChevronRight className="mx-2 h-5 w-5 text-muted-foreground" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
