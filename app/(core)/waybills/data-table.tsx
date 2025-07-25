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
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, Columns} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {formatDateToLocal, generateAvatarFallback} from "@/app/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {
    WaybillPaginatedSchema,
    WaybillSchema,
} from "@/app/lib/schemas/waybillSchema";
import Link from "next/link";
import {PaginationButton} from "@/app/ui/shared/buttons/pagination-button";
import {TablePopover} from "@/app/ui/shared/table/table-popover";
import {useTableNavigation} from "@/hooks/useTableNavigation";
import {TableDetailsDropdown} from "@/app/ui/shared/table/table-details-dropdown";
import {UserSchema} from "@/app/lib/schemas/userSchema";

export const columns: ColumnDef<WaybillSchema>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
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
        enableHiding: false,
    },
    {
        accessorKey: "fullName",
        header: "Клиент",
        cell: ({row}) => {
            const customer: UserSchema = row.original.customer;
            const fullName = `${customer.first_name} ${customer.last_name}`;

            return (
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarFallback>{generateAvatarFallback(fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        <Link href={`/users/${customer.id}`} className="hover:underline">
                            {fullName}
                        </Link>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "waybill_type",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Тип
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => {
            const waybill_type = row.original.waybill_type;

            const waybillMap = {
                WAYBILL_IN: "info",
                WAYBILL_OUT: "success",
                WAYBILL_RETURN: "warning",
            } as const;

            const labelMap = {
                WAYBILL_IN: "Приход",
                WAYBILL_OUT: "Расход",
                WAYBILL_RETURN: "Возврат",
            };

            const customerClass = waybillMap[waybill_type] ?? "outline";
            const label = labelMap[waybill_type] ?? waybill_type;

            return (
                <Badge variant={customerClass} className="capitalize">
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "is_pending",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Статус
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => {
            const isPending: boolean = row.original.is_pending;

            const statusMap: Record<
                "true" | "false",
                { variant: "info" | "success"; label: string }
            > = {
                true: {variant: "info", label: "Черновик"},
                false: {variant: "success", label: "Завершено"},
            };

            const {variant, label} =
                statusMap[String(isPending) as "true" | "false"];

            return (
                <Badge variant={variant} className="capitalize">
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Автор",
        cell: ({row}) => {
            const author = row.original.author;
            const fullName = `${author.first_name} ${author.last_name}`;

            return (
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarFallback>{generateAvatarFallback(fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        <Link href={`/users/${author.id}`} className="hover:underline">
                            {fullName}
                        </Link>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "note",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Примечание
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("note"),
    },
    {
        accessorKey: "created_at",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => {
            const raw: string = row.getValue("created_at");
            return formatDateToLocal(raw, "ru-RU", true);
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return <TableDetailsDropdown href={`/waybills/${row.original.id}`}/>;
        },
    },
];

export default function WaybillDataTable({
                                             data,
                                         }: {
    data: WaybillPaginatedSchema;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const {
        getParam,
        updateFilter,
        updatePage,
        // searchParams,
    } = useTableNavigation();

    const currentPage = Number(getParam("page", "1"));
    const pageIndex = currentPage - 1;
    const pageSize = data.size;

    const waybillTypeParam = getParam("waybill_type");
    const isPendingParam = getParam("is_pending");

    const table = useReactTable({
        data: data.items,
        columns,
        manualPagination: true,
        pageCount: data.pages,
        state: {
            pagination: {pageIndex, pageSize},
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const waybill_types = [
        {
            value: "WAYBILL_IN",
            label: "Приход",
        },
        {
            value: "WAYBILL_OUT",
            label: "Расход",
        },
        {
            value: "WAYBILL_RETURN",
            label: "Возврат",
        },
    ];

    const waybill_statuses = [
        {
            value: "true",
            label: "Черновик",
        },
        {
            value: "false",
            label: "Проведена",
        },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 py-4">
                <div className="flex gap-2">
                    {/*<Input*/}
                    {/*    placeholder="Поиск.."*/}
                    {/*    value={*/}
                    {/*        (table*/}
                    {/*            .getColumn("counterparty_name")*/}
                    {/*            ?.getFilterValue() as string) ?? ""*/}
                    {/*    }*/}
                    {/*    onChange={(event) =>*/}
                    {/*        table*/}
                    {/*            .getColumn("counterparty_name")*/}
                    {/*            ?.setFilterValue(event.target.value)*/}
                    {/*    }*/}
                    {/*    className="max-w-sm"*/}
                    {/*/>*/}
                    <TablePopover
                        options={waybill_types}
                        selected={waybillTypeParam}
                        onSelect={(val) => updateFilter("waybill_type", val)}
                        label="Тип"
                    />
                    <TablePopover
                        options={waybill_statuses}
                        selected={isPendingParam}
                        onSelect={(val) => updateFilter("is_pending", val)}
                        label="Статус"
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
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
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
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
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
                    <PaginationButton
                        direction="prev"
                        onClick={() => updatePage(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    <span className="text-sm text-muted-foreground">
            {currentPage}/{data.pages}
          </span>
                    <PaginationButton
                        direction="next"
                        onClick={() => updatePage(currentPage + 1)}
                        disabled={currentPage >= data.pages}
                    />
                </div>
            </div>
        </div>
    );
}
