import { Badge } from "@/components/ui/badge";
import { UserTypeEnum, USER_TYPE_LABELS } from "@/app/lib/schemas/commonSchema";

interface CustomerBadgeProps {
    customerType: UserTypeEnum;
}

export function CustomerBadge({ customerType }: CustomerBadgeProps) {
    const customerMap: Record<UserTypeEnum, "warning" | "info" | "success" | "outline"> = {
        USER_RETAIL: "warning",
        USER_WHOLESALE: "info",
        USER_SUPER_WHOLESALE: "success",
    };

    const label = USER_TYPE_LABELS[customerType] ?? customerType;
    const customerClass = customerMap[customerType] ?? "outline";

    return (
        <Badge variant={customerClass} className="capitalize">
            {label}
        </Badge>
    );
}