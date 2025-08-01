"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {ArrowUpDown, Columns} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {generateAvatarFallback} from "@/app/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {UserSchema} from "@/app/lib/schemas/userSchema";
import {MailingToggle} from "@/app/ui/users/mailing-toggle";
import {CustomerTypeSelect} from "@/app/ui/users/customer-type-select";
import Link from "next/link";
import {TableDetailsDropdown} from "@/app/ui/shared/table/table-details-dropdown";
import {CustomerBadge} from "@/app/ui/users/customer-badge";
import {TablePopover} from "@/app/ui/shared/table/table-popover";
import {USER_TYPE_LABELS} from "@/app/lib/schemas/commonSchema";

export const columns: ColumnDef<UserSchema>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "first_name",
        header: "Name",
        cell: ({row}) => (
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>{generateAvatarFallback(row.getValue("first_name"))}</AvatarFallback>
                </Avatar>
                <div className="capitalize">
                    <Link
                        href={`/users/${row.original.id}`}>{row.getValue("first_name")}
                    </Link>
                </div>
            </div>
        )
    },
    {
        accessorKey: "last_name",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Фамилия
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => (
            <div className="capitalize">
                <Link
                    href={`/users/${row.original.id}`}>{row.getValue("last_name")}
                </Link>
            </div>
        )
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("email")
    },
    {
        accessorKey: "phone",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Телефон
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("phone")
    },
    {
        accessorKey: "city",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Город
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("city")
    },
    {
        accessorKey: "shipping_company",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Доставка
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("shipping_company")
    },
    {
        accessorKey: "notes",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Примечание
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("notes")
    },
    {
        accessorKey: "customer_type",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Тип
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => {
            const customer_type = row.original.customer_type;
            return <CustomerBadge customerType={customer_type}/>
        }
    },
    {
        accessorKey: "mailing",
        header: "Рассылка",
        cell: ({row}) => {
            const user = row.original;
            return <MailingToggle {...user} />;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "type_v2",
        header: "Тип V2",
        cell: ({row}) => {
            const user = row.original;
            return <CustomerTypeSelect {...user} />;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <TableDetailsDropdown href={`/users/${row.original.id}`}/>
            );
        }
    }
];

export default function UsersDataTable({data}: { data: UserSchema[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [customerTypeFilter, setCustomerTypeFilter] = React.useState<string>("");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    const customer_types = Object.entries(USER_TYPE_LABELS).map(([value, label]) => ({
        value,
        label
    }));

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 py-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Search users..."
                        value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("first_name")?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <TablePopover
                        options={customer_types}
                        selected={customerTypeFilter}
                        onSelect={(currentValue) => {
                            setCustomerTypeFilter((prev) => {
                                const newValue = currentValue === prev ? "" : currentValue;
                                table.getColumn("customer_type")?.setFilterValue(newValue);
                                return newValue;
                            });
                        }}
                        label={"Тип"}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="ml-auto">
                            <Columns/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
