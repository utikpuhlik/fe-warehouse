import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS, OrderStatusEnum } from "@/app/lib/schemas/commonSchema";

interface OrderBadgeProps {
    orderStatus: OrderStatusEnum;
}

export function OrderBadge({ orderStatus }: OrderBadgeProps) {
    const orderMap: Record<OrderStatusEnum, "warning" | "info" | "success" | "outline" | "destructive"> = {
        NEW: "success",
        IN_PROGRESS: "info",
        SHIPPING: "warning",
        COMPLETED: "success",
        CANCELED: "destructive",
    };

    const label = ORDER_STATUS_LABELS[orderStatus] ?? orderStatus;
    const orderClass = orderMap[orderStatus] ?? "outline";

    return (
        <Badge variant={orderClass} className="capitalize">
            {label}
        </Badge>
    );
}