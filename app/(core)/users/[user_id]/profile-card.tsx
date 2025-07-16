"use client";

import * as React from "react";
import { Mail, MapPin, PhoneCall, Notebook, CheckCircle, List, IdCard } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {UserSchema} from "@/app/lib/schemas/userSchema";

export function ProfileCard({user}: {user: UserSchema}) {
  return (
    <Card className="relative">
      <CardContent>
        <Badge className="absolute start-4 top-4">{user.is_active ? "Active" : "False"}</Badge>
        <div className="space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="size-20">
              <AvatarImage src={`https://bundui-images.netlify.app/avatars/10.png`} alt="@shadcn" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h5 className="text-xl font-semibold">{user.first_name} {user.last_name}</h5>
              <div className="text-muted-foreground text-sm">{user.role}</div>
            </div>
          </div>
          <div className="bg-muted grid grid-cols-3 divide-x rounded-md border text-center *:py-3">
            <div>
              <h5 className="text-lg font-semibold">0</h5>
              <div className="text-muted-foreground text-sm">Заказов</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">1</h5>
              <div className="text-muted-foreground text-sm">Активных заказов</div>
            </div>
            <div>
              <h5 className="text-lg font-semibold">4.5KК</h5>
              <div className="text-muted-foreground text-sm">Оборот</div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground size-4" /> {user.email}
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="text-muted-foreground size-4" /> {user.phone}
            </div>
            <div className="flex items-center gap-3">
              <List className="text-muted-foreground size-4" /> {user.customer_type}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-muted-foreground size-4" />
              {user.city ?? "Город не указан"}
            </div>
            <div className="flex items-center gap-3">
              <Notebook className="text-muted-foreground size-4" />
              {user.notes ?? "Нет заметок"}
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-muted-foreground size-4" />
              {user.mailing ? "Подписан на рассылку" : "Не подписан на рассылку"}
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="text-muted-foreground size-4" />
              {`Clerk: ${user.clerk_id}`}
            </div>
            <div className="flex items-center gap-3">
              <IdCard className="text-muted-foreground size-4" />
              {`Internal: ${user.id}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
