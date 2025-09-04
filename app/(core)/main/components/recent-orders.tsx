"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TableDetailsOrderDropdown } from "@/app/ui/shared/table/table-details-dropdown";
import { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { formatCurrency, generateAvatarFallback } from "@/app/lib/utils/utils";
import { OrderBadge } from "@/app/ui/orders/order-badge";
import { OrderStatusEnum } from "@/app/lib/schemas/commonSchema";
import { useTranslations } from "next-intl";

const columns: ColumnDef<OrderSchema>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Button
        variant="link"
        className="text-muted-foreground hover:text-primary h-auto p-0"
      >
        <Link href={`/orders/${row.original.id}`}>#{row.getValue("id")}</Link>
      </Button>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.user;
      const fullName = `${customer.first_name} ${customer.last_name}`;
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{generateAvatarFallback(fullName)}</AvatarFallback>
          </Avatar>
          <div className="capitalize">
            <Link
              href={`/users/${row.original.user.id ?? "#"}`}
              className="text-muted-foreground hover:text-primary h-auto p-0"
            >
              {fullName}
            </Link>
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return row.original.user.first_name
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "total_sum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0! hover:bg-transparent!"
        >
          Сумма
          <ArrowUpDown className="size-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {formatCurrency(row.getValue("total_sum"))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: OrderStatusEnum = row.original.status;
      return <OrderBadge orderStatus={status} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <TableDetailsOrderDropdown order_id={row.original.id} />;
    },
  },
];

export function EcommerceRecentOrdersCard({
  orders,
}: {
  orders: OrderSchema[];
}) {
  const t = useTranslations("PanelPage");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 8,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    pageCount: Math.ceil(orders.length / pageSize),
  });

  return (
    <Card className="lg:col-span-7">
      <CardHeader>
        <CardTitle>{t("recent_orders")}</CardTitle>
        {/*<CardAction className="relative">*/}
        {/*  <ExportButton className="absolute end-0 top-0" />*/}
        {/*</CardAction>*/}
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Filter orders..."
          value={
            (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
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
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, orders.length)} of{" "}
            {orders.length} entries
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
