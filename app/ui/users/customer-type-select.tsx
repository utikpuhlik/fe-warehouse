"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { updateUserAction } from "@/app/lib/actions/userAction";
import { zCustomerTypeEnum, type CustomerTypeEnum } from "@/app/lib/schemas/commonSchema";
import type { UserSchema } from "@/app/lib/schemas/userSchema";
import { CustomerBadge } from "@/app/ui/users/customer-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface CustomerTypeSelectProps {
  user: UserSchema;
}

export function CustomerTypeSelect({ user }: CustomerTypeSelectProps) {
  const [selected, setSelected] = useState<CustomerTypeEnum>(user.customer_type);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Toast");

  const handleChange = (value: string) => {
    const casted = value as CustomerTypeEnum;
    setSelected(casted);

    startTransition(async () => {
      try {
        await updateUserAction(user.id, { ...user, customer_type: casted });
        toast({
          title: t("success"),
          description: `${t("user_updated")} ${user.email}`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: t("error"),
          description: t("user_update_error"),
          variant: "destructive",
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <CustomerBadge customerType={selected} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {zCustomerTypeEnum.options.map((value: CustomerTypeEnum) => (
          <DropdownMenuItem key={value} onSelect={() => handleChange(value)}>
            <CustomerBadge customerType={value} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
