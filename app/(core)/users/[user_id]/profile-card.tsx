"use client";

import { CheckCircle, IdCard, List, Mail, MapPin, Notebook, PhoneCall } from "lucide-react";
import * as React from "react";

import { USER_ROLE_LABELS, USER_TYPE_LABELS } from "@/app/lib/schemas/commonSchema";
import { UserSchema } from "@/app/lib/schemas/userSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileCard({ user }: { user: UserSchema }) {
  return (
    <Card className="relative">
      <CardContent>
        <Badge className="absolute start-4 top-4">{USER_TYPE_LABELS[user.customer_type]}</Badge>
        <div className="mt-4 space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="size-20">
              <AvatarImage src={`https://bundui-images.netlify.app/avatars/10.png`} alt="@shadcn" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h5 className="text-xl font-semibold">
                {user.first_name} {user.last_name}
              </h5>
              <div className="text-sm text-muted-foreground">{USER_ROLE_LABELS[user.role]}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x rounded-md border bg-muted text-center *:py-3">
            <div>
              <h5 className="text-lg font-semibold">0</h5>
              <div className="text-sm text-muted-foreground">Заказов</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">1</h5>
              <div className="text-sm text-muted-foreground">Активных заказов</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">4.5KК</h5>
              <div className="text-sm text-muted-foreground">Оборот</div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" /> {user.email}
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="size-4 text-muted-foreground" /> {user.phone}
            </div>
            <div className="flex items-center gap-3">
              <List className="size-4 text-muted-foreground" /> {USER_TYPE_LABELS[user.customer_type]}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              {user.city ?? "Город не указан"}
            </div>
            <div className="flex items-center gap-3">
              <Notebook className="size-4 text-muted-foreground" />
              {user.note ?? "Нет заметок"}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="size-4 text-muted-foreground" />
              {user.mailing ? "Подписан на рассылку" : "Не подписан на рассылку"}
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="size-4 text-muted-foreground" />
              {`Clerk: ${user.clerk_id}`}
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="size-4 text-muted-foreground" />
              {`Internal: ${user.id}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
