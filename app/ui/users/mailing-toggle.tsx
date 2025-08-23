"use client";

import type { UserSchema } from "@/app/lib/schemas/userSchema";
import { updateUserAction } from "@/app/lib/actions/userAction";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { useTransition, useState } from "react";
import { useTranslations } from "next-intl";

interface MailingToggleProps {
  user: UserSchema;
}

export function MailingToggle({ user }: MailingToggleProps) {
  const [value, setValue] = useState(user.mailing);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Toast");

  const handleChange = (checked: boolean) => {
    setValue(checked);
    startTransition(() => {
      try {
        updateUserAction(user.id, { ...user, mailing: checked });
        toast({
          title: t("mailing_updated"),
          description: `${t("user_updated")} ${user.email} ${checked ? t("subscribed") : t("unsubscribed")}`,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        toast({
          title: t("error"),
          description: t("user_update_error"),
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={value}
        onCheckedChange={handleChange}
        disabled={isPending}
      />
    </div>
  );
}
