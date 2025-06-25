import { fetchCurrentUser } from "@/app/lib/apis/userApi";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "Профиль | TCF"
}
export default async function ProfilePage() {
    const user = await fetchCurrentUser();

    if (!user) {
        notFound();
    }

    return (
        <main className="max-w-4xl mx-auto py-10 px-4">
            <Card className="flex items-start space-x-6 p-6">
                <div className="relative h-24 w-24">
                    <Image
                        src={user.avatar_url ?? "https://storage.yandexcloud.net/tcf-images/default-avatar.svg"}
                        alt={`${user.first_name} ${user.last_name ?? ""}`}
                        fill
                        className="rounded-full object-cover border"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-semibold">
                            {user.first_name} {user.last_name}
                        </CardTitle>
                    </CardHeader>

                    <div className="text-muted-foreground text-sm">{user.email}</div>

                    {user.position && (
                        <div className="text-sm">
                            <span className="font-medium">Должность:</span> {user.position}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">{user.role}</Badge>
                        {user.is_superuser && <Badge variant="destructive">Суперпользователь</Badge>}
                        {user.is_verified && <Badge>Подтверждён</Badge>}
                        {!user.is_active && <Badge variant="outline">Неактивен</Badge>}
                    </div>
                </div>
            </Card>
        </main>
    );
}
