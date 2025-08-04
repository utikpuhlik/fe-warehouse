"use client";

import type {UserSchema} from "@/app/lib/schemas/userSchema";
import {updateUserAction} from "@/app/lib/actions/userAction";
import {toast} from "@/hooks/use-toast";
import {Switch} from "@/components/ui/switch"
import {useTransition, useState} from "react";

interface MailingToggleProps {
    user: UserSchema;
}

export function MailingToggle({user}: MailingToggleProps) {
    const [value, setValue] = useState(user.mailing);
    const [isPending, startTransition] = useTransition();

    const handleChange = (checked: boolean) => {
        setValue(checked);
        startTransition(() => {
            updateUserAction(user.id, {...user, mailing: checked})
            try {
                toast({
                    title: "Рассылка обновлена",
                    description: `Пользователь ${user.email} ${checked ? "подписан" : "отписан"}`,
                })
            } catch (error) {
                console.error("Error updating user:", error);
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить пользователя",
                    variant: "destructive",
                })
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Switch checked={value} onCheckedChange={handleChange} disabled={isPending}/>
        </div>
    );
}
