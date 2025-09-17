import { CirclePlus } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { fetchUsers } from "@/app/lib/apis/userApi";
import { UserPaginatedSchema } from "@/app/lib/schemas/userSchema";
import { Button } from "@/components/ui/button";

import UsersDataTable from "./data-table";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("users"),
  };
}

export default async function Page() {
  const t = await getTranslations("UsersPage");
  const a = await getTranslations("Actions");
  const users: UserPaginatedSchema = await fetchUsers();

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
      <UsersDataTable data={users.items} />
    </>
  );
}
