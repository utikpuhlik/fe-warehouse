import { Printer } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PrintButton({ orderId }: { orderId: string }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/orders/${orderId}/print`}>
        <Printer />
        Print
      </Link>
    </Button>
  );
}
