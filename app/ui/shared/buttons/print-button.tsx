import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Printer} from "lucide-react";

export function PrintButton({ orderId }: { orderId: string }) {
    return (
        <Button asChild variant="outline">
            <Link href={`/orders/${orderId}/print`}>
                <Printer/>
                Print
            </Link>
        </Button>
    );
}