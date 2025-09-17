"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Columns } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { ORDER_STATUS_LABELS } from "@/app/lib/schemas/commonSchema";
import { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils/utils";
import { OrderStatusSelect } from "@/app/ui/orders/order-status-select";
import { TableDetailsOrderDropdown } from "@/app/ui/shared/table/table-details-dropdown";
import { TablePopover } from "@/app/ui/shared/table/table-popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const columns: ColumnDef<OrderSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "№",
    cell: ({ row }) => (
      <Link href={`/orders/${row.getValue("id")}`} className="text-muted-foreground hover:text-primary hover:underline">
        #{row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button className="-ml-3" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Дата
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw: string = row.getValue("created_at");
      return formatDateToLocal(raw, "ru-RU", true);
    },
  },
  {
    accessorKey: "customer",
    header: "Клиент",
    cell: ({ row }) => {
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
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const order: OrderSchema = row.original;
      return <OrderStatusSelect order={order} />;
    },
  },
  {
    accessorKey: "total_sum",
    header: ({ column }) => {
      return (
        <Button className="-ml-3" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Сумма
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw: number = row.getValue("total_sum");
      return formatCurrency(raw);
    },
  },
  {
    accessorKey: "note",
    header: "Заметка",
    cell: ({ row }) => <div className="capitalize">{row.getValue("note")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <TableDetailsOrderDropdown order_id={row.original.id} />;
    },
  },
];

export default function OrdersDataTable({ data }: { data: OrderSchema[] }) {
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
      rowSelection,
    },
  });

  const statuses = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search orders..."
              value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
              onChange={event => table.getColumn("customer")?.setFilterValue(event.target.value)}
              className="md:max-w-sm"
            />
            <TablePopover
              options={statuses}
              onSelect={currentValue => {
                setOrderStatusFilter(prev => {
                  const newValue = currentValue === prev ? "" : currentValue;
                  table.getColumn("status")?.setFilterValue(newValue);
                  return newValue;
                });
              }}
              selected={orderStatusFilter}
              label={"Статус"}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="ml-auto">
                {/*<span className="hidden lg:inline">Columns</span>*/}
                <Columns />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value => column.toggleVisibility(value)}
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
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
