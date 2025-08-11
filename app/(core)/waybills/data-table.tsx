"use client";

import * as React from "react";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronLeft, ChevronRight, Columns} from "lucide-react";
import {useDebouncedCallback} from "use-debounce";

// Custom hook for fetching data
import {useWaybills} from "@/hooks/useTableNavigation";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
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
import {Checkbox} from "@/components/ui/checkbox";
import {formatDateToLocal, generateAvatarFallback} from "@/app/lib/utils";
import {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {UserSchema} from "@/app/lib/schemas/userSchema";
import {TableDetailsDropdown} from "@/app/ui/shared/table/table-details-dropdown";
import {TablePopover} from "@/app/ui/shared/table/table-popover";
import {WaybillBadge} from "@/app/ui/waybill/waybill-badge";

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
        accessorKey: "customer",
        header: "Клиент",
        cell: ({row}) => {
            const customer: UserSchema = row.original.customer;
            const fullName = `${customer.first_name} ${customer.last_name || ''}`;
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
        header: ({column}) => (
            <Button
                className="-ml-3"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Тип
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => {
            const waybill_type = row.original.waybill_type;
            return <WaybillBadge waybillType={waybill_type}/>;
        },
    },
    {
        accessorKey: "is_pending",
        header: ({column}) => (
            <Button
                className="-ml-3"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Статус
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => {
            const isPending: boolean = row.original.is_pending;

            const {variant, label}: { variant: "info" | "success"; label: string } = isPending
                ? {variant: "info", label: "Черновик"}
                : {variant: "success", label: "Завершено"};

            return <Badge variant={variant} className="capitalize">{label}</Badge>;
        },
    },
    {
        accessorKey: "author",
        header: "Автор",
        cell: ({row}) => {
            const author = row.original.author;
            const fullName = `${author.first_name} ${author.last_name || ''}`;
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
        header: ({column}) => (
            <Button
                className="-ml-3"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Примечание
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => <div className="max-w-[200px] truncate">{row.getValue("note")}</div>,
    },
    {
        accessorKey: "created_at",
        header: ({column}) => (
            <Button
                className="-ml-3"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Дата
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => {
            const raw: string = row.getValue("created_at");
            return formatDateToLocal(raw, "ru-RU", true);
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => <TableDetailsDropdown href_edit={`/waybills/${row.original.id}`}/>,
    },
];


// --- The Data Table Component ---
export default function WaybillDataTable() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // --- State derived from URL Search Params ---
    const query = searchParams.get("q") ?? "";
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("per_page") ?? "10";
    const waybillTypeParam = searchParams.get("waybill_type") ?? "";
    const isPendingParam = searchParams.get("is_pending") ?? "";


    // --- Local Component State ---
    const [inputValue, setInputValue] = React.useState(query);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Memoize pagination state to avoid re-renders
    const pagination = React.useMemo<PaginationState>(() => ({
        pageIndex: Number(page) - 1,
        pageSize: Number(pageSize),
    }), [page, pageSize]);

    // --- Data Fetching via Custom Hook ---
    const {data, isLoading, isError} = useWaybills(query, pagination, waybillTypeParam, isPendingParam);

    // --- Handlers to update URL ---
    const updateURLParams = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        params.set("page", "1"); // Reset to first page on any filter change
        router.push(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        updateURLParams({q: value});
    }, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debouncedSearch(e.target.value);
    };

    const updateFilter = (key: string, value: string | null) => {
        updateURLParams({[key]: value});
    };

    // Options for TablePopovers
    const waybill_types = [
        {label: "Все типы", value: ""},
        {label: "Приход", value: "WAYBILL_IN"},
        {label: "Расход", value: "WAYBILL_OUT"},
        {label: "Возврат", value: "WAYBILL_RETURN"},
    ];

    const waybill_statuses = [
        {label: "Все статусы", value: ""},
        {label: "Черновик", value: "true"},
        {label: "Завершено", value: "false"},
    ];


    // --- Table Definition ---
    const tableData = data?.items ?? [];
    const pageCount = data?.pages ?? 0;

    const table = useReactTable({
        data: tableData,
        columns,
        pageCount,
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onPaginationChange: (updater) => {
            if (typeof updater !== 'function') return;
            const newPagination = updater(pagination);
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(newPagination.pageIndex + 1));
            params.set("per_page", String(newPagination.pageSize));
            router.push(`${pathname}?${params.toString()}`);
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
    });

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Поиск по клиенту, примечанию..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="max-w-sm"
                />
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
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Columns className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
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
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Загрузка...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                                    Ошибка при загрузке данных.
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
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
                                    Ничего не найдено.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 pt-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>
                    <span className="text-sm">
                        {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}