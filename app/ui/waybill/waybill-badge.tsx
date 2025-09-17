import { WAYBILL_TYPE_LABELS, WaybillTypeEnum } from "@/app/lib/schemas/commonSchema";
import { Badge } from "@/components/ui/badge";

interface WaybillBadgeProps {
  waybillType: WaybillTypeEnum;
}

export function WaybillBadge({ waybillType }: WaybillBadgeProps) {
  const waybillMap: Record<WaybillTypeEnum, "warning" | "info" | "success"> = {
    WAYBILL_IN: "info",
    WAYBILL_OUT: "success",
    WAYBILL_RETURN: "warning",
  };

  const label = WAYBILL_TYPE_LABELS[waybillType] ?? waybillType;
  const waybillClass = waybillMap[waybillType] ?? "outline";

  return (
    <Badge variant={waybillClass} className="capitalize">
      {label}
    </Badge>
  );
}
