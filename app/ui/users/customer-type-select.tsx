"use client";

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
import {
  zUserTypeEnum,
  type UserTypeEnum,
} from "@/app/lib/schemas/commonSchema";
import { CustomerBadge } from "@/app/ui/users/customer-badge";
import { useTranslations } from "next-intl";

interface CustomerTypeSelectProps {
  user: UserSchema;
}

export function CustomerTypeSelect({ user }: CustomerTypeSelectProps) {
  const [selected, setSelected] = useState<UserTypeEnum>(user.customer_type);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Toast");

  const handleChange = (value: string) => {
    const casted = value as UserTypeEnum;
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
        {zUserTypeEnum.options.map((value: UserTypeEnum) => (
          <DropdownMenuItem key={value} onSelect={() => handleChange(value)}>
            <CustomerBadge customerType={value} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
