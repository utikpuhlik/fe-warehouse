import {CardHeader, Card, CardContent, CardTitle} from "@/components/ui/card";
import {formatCurrency} from "@/app/lib/utils";
import {useTranslations} from "next-intl";

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
    const t = useTranslations("CartSummaryCard");

    return (
        <Card className="w-full p-0">
            <CardHeader className="p-4">
                <CardTitle className="text-lg">{t('order_summary')}</CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-base font-medium">
                    <span>{t('Retail')}</span>
                    <span>{formatCurrency(total_sum_retail)}</span>
                </div>
                <div className="flex justify-between text-base font-medium">
                    <span>{t('Wholesale')}</span>
                    <span>{formatCurrency(total_sum_wholesale)}</span>
                </div>
                <div className="flex justify-between text-base font-medium">
                    <span>{t('Super_wholesale')}</span>
                    <span>{formatCurrency(total_sum_super_wholesale)}</span>
                </div>
            </CardContent>
        </Card>
    );
}