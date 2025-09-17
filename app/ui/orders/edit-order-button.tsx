import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EditOrderButton({ orderId }: { orderId: string }) {
  return (
    <Button asChild>
      <Link href={`/orders/${orderId}/edit`}>
        <Pencil />
        Edit
      </Link>
    </Button>
  );
}
