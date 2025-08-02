import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Pencil} from "lucide-react";

export function EditOrderButton({ orderId }: { orderId: string }) {
  return (
    <Button asChild>
      <Link href={`/orders/${orderId}/edit`}>
        <Pencil/>
        Edit
      </Link>
    </Button>
  );
}