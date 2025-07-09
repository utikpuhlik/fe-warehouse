import Link from "next/link";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LatestActivity } from "@/app/(core)/users/[user_id]/latest-activity";
import {ProfileCard} from "@/app/(core)/users/[user_id]/profile-card";
import {UserSchema} from "@/app/lib/schemas/userSchema";
import {fetchUser} from "@/app/lib/apis/userApi";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{ user_id: string }>
};

export default async function Page({params}: Props) {
    const {user_id} = await params;
    const user: UserSchema = await fetchUser(user_id);
    if (!user) {
        notFound()
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Profile Page</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/users">
                            <Settings />
                            Settings
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="space-y-4 xl:col-span-1">
                    <ProfileCard user={user}/>
                </div>
                <div className="space-y-4 xl:col-span-2">
                    <LatestActivity />
                </div>
            </div>
        </div>
    );
}
