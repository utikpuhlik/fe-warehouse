import { CustomerTypeEnum, USER_TYPE_LABELS } from "@/app/lib/schemas/commonSchema";
import { Badge } from "@/components/ui/badge";

interface CustomerBadgeProps {
  customerType: CustomerTypeEnum;
}

export function CustomerBadge({ customerType }: CustomerBadgeProps) {
  const customerMap: Record<CustomerTypeEnum, "warning" | "info" | "success" | "outline"> = {
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
