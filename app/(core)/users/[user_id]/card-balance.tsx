"use client";

import * as React from "react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Printer} from "lucide-react";

export function CardBalance() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Баланс</CardTitle>
                <Button variant="outline">
                    <Printer/>
                    Print
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Badge>₽ 1,000</Badge>
                    <Badge>USD 100</Badge>
                    <Badge>EUR 50</Badge>
                    TODO: прокинуть сюда данные о балансе пользователя (приход - расход - оплата) + кнопка экспорта в
                    эксель через вызов API docx3R
                </div>

            </CardContent>
        </Card>
    );
}
