import Link from "next/link";


import {CirclePlus} from "lucide-react";
import { Button } from "@/components/ui/button";
import UsersDataTable from "./data-table";
import {generateMeta} from "@/app/lib/utils";
import {fetchUsers} from "@/app/lib/apis/userApi";
import {UserSchema} from "@/app/lib/schemas/userSchema";

export async function generateMetadata() {
  return generateMeta({
    title: "Users List",
    description:
      "A list of users generated using the Tanstack Table. Built with Tailwind CSS, Shadcn UI and Next.js.",
    canonical: "/pages/users"
  });
}


export default async function Page() {
  const users: UserSchema[] = await fetchUsers();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button asChild>
          <Link href="#">
            <CirclePlus /> Add New User
          </Link>
        </Button>
      </div>
      <UsersDataTable data={users} />
    </>
  );
}
