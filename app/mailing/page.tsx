import type {UserSchema} from "@/app/lib/schemas/userSchema";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell, TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {fetchUsers} from "@/app/lib/apis/userApi";

export default async function MailingPage() {
	const users: UserSchema[] = await fetchUsers();
	return (
		<Table>
			<TableCaption>Таблица Пользователей.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Имя</TableHead>
					<TableHead>Фамилия</TableHead>
					<TableHead>Позиция</TableHead>
					<TableHead className="text-right">Email</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell className="font-medium">{user.first_name}</TableCell>
						<TableCell>{user.last_name ?? 'TCF'}</TableCell>
						<TableCell>{user.position}</TableCell>
						<TableCell className="text-right">{user.email}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">{users.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
