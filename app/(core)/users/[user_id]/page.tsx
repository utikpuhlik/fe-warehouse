import Link from "next/link";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LatestActivity } from "@/app/(core)/users/[user_id]/latest-activity";
import {ProfileCard} from "@/app/(core)/users/[user_id]/profile-card";
import {UserSchema} from "@/app/lib/schemas/userSchema";
import {fetchUserById} from "@/app/lib/apis/userApi";
import {notFound} from "next/navigation";
import {OrderPaginatedSchema, OrderSchema} from "@/app/lib/schemas/orderSchema";
import {fetchOrders} from "@/app/lib/apis/orderApi";
import { CardBalance } from "@/app/(core)/users/[user_id]/card-balance";
import type {Metadata} from "next";

type Props = {
    params: Promise<{ user_id: string }>
};
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { user_id } = await params;
    const user: UserSchema = await fetchUserById(user_id);

    return {
        title: `${user.first_name} ${user.last_name} | TCF`
    };
}

export default async function Page({params}: Props) {
    const {user_id} = await params;
    const user: UserSchema = await fetchUserById(user_id);
    const data: OrderPaginatedSchema = await fetchOrders(user_id);
    const orders: OrderSchema[] = data.items;
    if (!user) {
        notFound()
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Профиль</h1>
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
                    <CardBalance />
                </div>
                <div className="space-y-4 xl:col-span-2">
                    <LatestActivity orders={orders}/>
                </div>
            </div>
        </div>
    );
}
