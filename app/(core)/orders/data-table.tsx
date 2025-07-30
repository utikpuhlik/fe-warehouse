"use client";

import * as React from "react";
import Link from "next/link";
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
import {
    ArrowUpDown,
    Columns,
} from "lucide-react";

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
import {Checkbox} from "@/components/ui/checkbox";
import {Card, CardContent} from "@/components/ui/card";
import {OrderSchema} from "@/app/lib/schemas/orderSchema";
import {formatDateToLocal} from "@/app/lib/utils";
import {TableDetailsDropdown} from "@/app/ui/shared/table/table-details-dropdown";
import {TablePopover} from "@/app/ui/shared/table/table-popover";
import {ORDER_STATUS_LABELS} from "@/app/lib/schemas/commonSchema";
import {OrderBadge} from "@/app/ui/orders/order-badge";


export const columns: ColumnDef<OrderSchema>[] = [
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
        accessorKey: "id",
        header: "# Какое правило использовать для номера заказа? композит?",
        cell: ({row}) => (
            <Link
                href={`/orders/${row.getValue("id")}`}
                className="text-muted-foreground hover:text-primary hover:underline">
                #{row.getValue("id")}
            </Link>
        )
    },
    {
        accessorKey: "total_sum",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Сумма
                    <ArrowUpDown className="size-3"/>
                </Button>
            );
        },
        cell: ({row}) => `${row.getValue("total_sum")} ₽`
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({row}) => {
            const customer = row.original.user;

            return (
                <div className="space-y-1">
                    <div className="font-semibold">
                        <Link href={`/users/${customer.id}`} className="hover:underline">
                            {customer.first_name} {customer.last_name}
                        </Link>
                    </div>
                    <div className="text-muted-foreground">
                        <Link href={`/users/${customer.id}`} className="hover:underline">
                            {customer.email}
                        </Link>
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "created_at",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    created_at
                    <ArrowUpDown className="size-3"/>
                </Button>
            );
        },
        cell: ({row}) => {
            const raw: string = row.getValue("created_at")
            return formatDateToLocal(raw, "ru-RU", true);
        }
    },
    {
        accessorKey: "note",
        header: "Note",
        cell: ({row}) => <div className="capitalize">{row.getValue("note")}</div>
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="size-3"/>
                </Button>
            );
        },
        cell: ({row}) => {
            const status = row.original.status;
            return <OrderBadge orderStatus={status}/>
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <TableDetailsDropdown href={`/orders/${row.original.id}`}/>
            );
        }
    }
];

export default function OrdersDataTable({data}: { data: OrderSchema[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [orderStatusFilter, setOrderStatusFilter] = React.useState<string>("");

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

    const statuses = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
        value,
        label
    }));

    return (
        <>
        <Card>
            <CardContent className="space-y-6">
                <div className="flex gap-2 mt-4">
                    <Input
                        placeholder="Search orders..."
                        value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("customer")?.setFilterValue(event.target.value)
                        }
                        className="md:max-w-sm"
                    />
                    <div className="hidden gap-2 md:flex">
                        <TablePopover
                            options={statuses}

                            onSelect={(currentValue) => {
                                setOrderStatusFilter((prev) => {
                                    const newValue = currentValue === prev ? "" : currentValue;
                                    table.getColumn("status")?.setFilterValue(newValue);
                                    return newValue;
                                });
                            }}
                            selected={orderStatusFilter}
                            label={"Статус"}
                        />
                    </div>
                    <div className="ms-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <span className="hidden lg:inline">Columns</span> <Columns/>
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
                <div className="flex items-center justify-end space-x-2">
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
            </CardContent>
        </Card>
        </>
    );
}
