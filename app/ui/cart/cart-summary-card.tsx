import {CardHeader, Card, CardContent, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/app/lib/utils";

export function CartSummaryCard(
    {
        total_sum_retail = 0,
        total_sum_wholesale = 0,
        total_sum_super_wholesale = 0,
    }: {
        total_sum_retail?: number;
        total_sum_wholesale?: number;
        total_sum_super_wholesale?: number;
    }) {

    return (
        <Card className="w-full p-0">
            <CardHeader className="p-4">
                <CardTitle className="text-lg">Сводка заказа</CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-base font-medium">
                    <span>Итоговая сумма розница</span>
                    <span>{formatCurrency(total_sum_retail)}</span>
                </div>
                <div className="flex justify-between text-base font-medium">
                    <span>Итоговая сумма опт</span>
                    <span>{formatCurrency(total_sum_wholesale)}</span>
                </div>
                <div className="flex justify-between text-base font-medium">
                    <span>Итоговая сумма супер-опт</span>
                    <span>{formatCurrency(total_sum_super_wholesale)}</span>
                </div>
            </CardContent>
        </Card>
    );
}