import {StatCard} from "@/app/ui/catalogue/dashboard/stat-card";
import {fetchUsersCount} from "@/app/lib/apis/userApi";

export async function UsersCard() {
    const { count } = await fetchUsersCount();
    return <StatCard title="Кол-во клиентов" value={count} />;
}
