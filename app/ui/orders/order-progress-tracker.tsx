import { OrderStatusEnum } from "@/app/lib/schemas/commonSchema";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  CheckCircle2,
  BellPlus,
  Package,
  Truck,
  BanIcon,
} from "lucide-react";
import { formatDateToLocal } from "@/app/lib/utils";
import { OrderBadge } from "@/app/ui/orders/order-badge";
import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderProgressProps {
  status: OrderStatusEnum;
  updatedAt: string;
}

const progressStatuses: Exclude<OrderStatusEnum, "CANCELED">[] = [
  "NEW",
  "IN_PROGRESS",
  "SHIPPING",
  "COMPLETED",
];

const statusLabels: Record<Exclude<OrderStatusEnum, "CANCELED">, string> = {
  NEW: "Новый",
  IN_PROGRESS: "Сборка",
  SHIPPING: "Отправлен",
  COMPLETED: "Завершен",
};

const statusIcons: Record<Exclude<OrderStatusEnum, "CANCELED">, JSX.Element> = {
  NEW: <BellPlus className="size-5" />,
  IN_PROGRESS: <Package className="size-5" />,
  SHIPPING: <Truck className="size-5" />,
  COMPLETED: <CheckCircle className="size-5" />,
};

export function OrderProgressTracker({
  status,
  updatedAt,
}: OrderProgressProps) {
  if (status === "CANCELED") {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <BanIcon className="size-5" />
        <OrderBadge orderStatus={status} />
      </div>
    );
  }

  const currentStepIndex = progressStatuses.indexOf(status);
  const progressValue =
    currentStepIndex === -1
      ? 0
      : (currentStepIndex / (progressStatuses.length - 1)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Информация о доставке
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pt-1">
          <div className="mb-2 flex items-center justify-between">
            {progressStatuses.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              const icon = isCompleted ? (
                <CheckCircle2 className="size-5" />
              ) : (
                statusIcons[step]
              );

              const circleClass =
                isCompleted || isCurrent
                  ? "bg-green-600 text-white dark:bg-green-900"
                  : "bg-muted border";

              return (
                <div key={step} className="text-center">
                  <div
                    className={`mx-auto flex size-12 items-center justify-center rounded-full text-lg ${circleClass}`}
                  >
                    {icon}
                  </div>
                  <div className="mt-2 text-xs">{statusLabels[step]}</div>
                </div>
              );
            })}
          </div>
          <div className="space-y-6">
            <Progress
              className="w-full"
              value={progressValue}
              color="bg-green-200 dark:bg-green-800"
            />
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              <OrderBadge orderStatus={status} />
              {formatDateToLocal(updatedAt, "ru-RU", false)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
