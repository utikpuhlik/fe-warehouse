"use client"

import type {UserSchema} from "@/app/lib/schemas/userSchema"
import {updateUserAction} from "@/app/lib/actions/userAction"
import {toast} from "@/hooks/use-toast"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {useTransition, useState} from "react"
import {
    zUserTypeEnum,
    type UserTypeEnum,
} from "@/app/lib/schemas/commonSchema"
import {CustomerBadge} from "@/app/ui/users/customer-badge";

interface CustomerTypeSelectProps {
    user: UserSchema
}

export function CustomerTypeSelect({user}: CustomerTypeSelectProps) {
    const [selected, setSelected] = useState<UserTypeEnum>(user.customer_type)
    const [isPending, startTransition] = useTransition()

    const handleChange = (value: string) => {
        const casted = value as UserTypeEnum
        setSelected(casted)

        startTransition(async () => {
            try {
                await updateUserAction(user.id, {...user, customer_type: casted})
                toast({
                    title: "Успешно",
                    description: `Пользователь ${user.email} обновлён`,
                })
            } catch (error) {
                console.error("Error updating user:", error)
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить пользователя",
                    variant: "destructive",
                })
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isPending}>
                    <CustomerBadge customerType={selected}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {zUserTypeEnum.options.map((value: UserTypeEnum) => (
                    <DropdownMenuItem key={value} onSelect={() => handleChange(value)}>
                        <CustomerBadge customerType={value}/>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
