import { Suspense } from "react"
import { fetchUsers } from "@/app/lib/apis/userApi"
import MailingTable from "@/app/ui/catalogue/mailing/MailingTable"
import SkeletonTableBasic from "@/app/ui/catalogue/skeletons/TableSkeleton"

export const dynamic = 'force-dynamic'

async function MailingTableWrapper() {
	const users = await fetchUsers()
	return <MailingTable users={users} />
}

export default function MailingPage() {
	return (
		<Suspense fallback={<SkeletonTableBasic width={6} height={6}/>}>
			<MailingTableWrapper />
		</Suspense>
	)
}