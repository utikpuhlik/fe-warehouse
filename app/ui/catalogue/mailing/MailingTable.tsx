'use client'

import type { UserSchema } from "@/app/lib/schemas/userSchema"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { CustomerTypeSelect } from "@/app/ui/catalogue/mailing/customer-type-select"
import { MailingToggle } from "@/app/ui/catalogue/mailing/customer-mailing-toggle"

export default function MailingTable({ users }: { users: UserSchema[] }) {
    return (
        <Table>
            <TableCaption>Таблица Пользователей.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Имя</TableHead>
                    <TableHead>Фамилия</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Город</TableHead>
                    <TableHead>Доставка</TableHead>
                    <TableHead>Примечание</TableHead>
                    <TableHead>Тип клиента</TableHead>
                    <TableHead>Рассылка</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.first_name}</TableCell>
                        <TableCell>{user.last_name ?? 'TCF'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.shipping_company}</TableCell>
                        <TableCell>{user.notes}</TableCell>
                        <TableCell><CustomerTypeSelect {...user} /></TableCell>
                        <TableCell><MailingToggle {...user} /></TableCell>
                        <TableCell>...</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={9}>Total</TableCell>
                    <TableCell className="text-right">{users.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
