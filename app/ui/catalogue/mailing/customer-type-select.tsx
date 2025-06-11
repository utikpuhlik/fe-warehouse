"use client"

import type { UserSchema } from "@/app/lib/schemas/userSchema";
import { updateUserAction } from "@/app/lib/actions/userAction";
import { toast } from "@/hooks/use-toast";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";

const options = [
    { label: "Розница", value: "USER_RETAIL" },
    { label: "Опт", value: "USER_WHOLESALE" },
    { label: "Супер-опт", value: "USER_SUPER_WHOLESALE" },
] as const;

export function CustomerTypeSelect(user: UserSchema) {
    const [selected, setSelected] = useState(user.customer_type);
    const [isPending, startTransition] = useTransition();

    const handleChange = (value: typeof selected) => {
        setSelected(value);
        startTransition(() => {
            updateUserAction(user)
                .then(() => toast({ title: "Успешно", description: `Пользователь ${user.email} обновлён` }))
                .catch(() =>
                    toast({
                        title: "Ошибка",
                        description: "Не удалось обновить пользователя",
                        variant: "destructive",
                    })
                );
        });
    };

    const label = options.find((o) => o.value === selected)?.label ?? selected;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isPending}>
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem key={option.value} onSelect={() => handleChange(option.value)}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
