import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import UsersDataTable from "./data-table";
import { fetchUsers } from "@/app/lib/apis/userApi";
import { UserSchema } from "@/app/lib/schemas/userSchema";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("users"),
  };
}

export default async function Page() {
  const t = await getTranslations("UsersPage");
  const a = await getTranslations("Actions");
  const users: UserSchema[] = await fetchUsers();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t("users")}</h1>
        <Button asChild>
          <Link href="#">
            <CirclePlus /> {a("create")} {t("user")}
          </Link>
        </Button>
      </div>
      <UsersDataTable data={users} />
    </>
  );
}
