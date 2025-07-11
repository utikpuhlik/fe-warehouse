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
import {ArrowUpDown, Columns, MoreHorizontal, PlusCircle} from "lucide-react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
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
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {generateAvatarFallback} from "@/app/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {UserSchema} from "@/app/lib/schemas/userSchema";
import {MailingToggle} from "@/app/ui/catalogue/mailing/mailing-toggle";
import {CustomerTypeSelect} from "@/app/ui/catalogue/mailing/customer-type-select";
import Link from "next/link";

export type User = {
    id: number;
    first_name: string;
    lastName: string;
    avatar_url: string;
};

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
                    <AvatarImage src={row.original.avatar_url || undefined} alt="shadcn ui kit"/>
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
        accessorKey: "role",
        header: ({column}) => {
            return (
                <Button
                    className="-ml-3"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Роль
                    <ArrowUpDown/>
                </Button>
            );
        },
        cell: ({row}) => row.getValue("role")
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

            const customerMap = {
                USER_RETAIL: "warning",
                USER_WHOLESALE: "info",
                USER_SUPER_WHOLESALE: "success"
            } as const;

            const labelMap = {
                USER_RETAIL: "Розница",
                USER_WHOLESALE: "Опт",
                USER_SUPER_WHOLESALE: "Супер-Опт",
            };

            const customerClass = customerMap[customer_type] ?? "outline";
            const label = labelMap[customer_type] ?? customer_type;

            return (
                <Badge variant={customerClass} className="capitalize">
                    {label}
                </Badge>
            );
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
            console.log(row.id)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View user</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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

    const customer_types = [
        {
            value: "USER_RETAIL",
            label: "Розница"
        },
        {
            value: "USER_WHOLESALE",
            label: "Опт"
        },
        {
            value: "USER_SUPER_WHOLESALE",
            label: "Супер-Опт"
        }
    ];

    // const roles = [
    //   {
    //     value: "USER",
    //     label: "Клиент"
    //   },
    //   {
    //     value: "EMPLOYEE",
    //     label: "Сотрудник"
    //   },
    //   {
    //     value: "ADMIN",
    //     label: "Админ"
    //   }
    // ];

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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <PlusCircle/>
                                Тип
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-0">
                            <Command>
                                <CommandInput placeholder="Тип" className="h-9"/>
                                <CommandList>
                                    <CommandEmpty>No customer_type found.</CommandEmpty>
                                    <CommandGroup>
                                        {customer_types.map((customer_type) => (
                                            <CommandItem
                                                key={customer_type.value}
                                                value={customer_type.value}
                                                onSelect={(currentValue) => {
                                                    setCustomerTypeFilter((prev) => {
                                                        const newValue = currentValue === prev ? "" : currentValue;
                                                        table.getColumn("customer_type")?.setFilterValue(newValue);
                                                        return newValue;
                                                    });
                                                }}
                                            >
                                                <div className="flex items-center space-x-3 py-1">
                                                    <Checkbox
                                                        id={customer_type.value}
                                                        checked={customerTypeFilter === customer_type.value}
                                                    />
                                                    <label
                                                        htmlFor={customer_type.value}
                                                        className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {customer_type.label}
                                                    </label>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/*<Popover>*/}
                    {/*  <PopoverTrigger asChild>*/}
                    {/*    <Button variant="outline">*/}
                    {/*      <PlusCircle className="h-4 w-4" />*/}
                    {/*      Роль*/}
                    {/*    </Button>*/}
                    {/*  </PopoverTrigger>*/}
                    {/*  <PopoverContent className="w-52 p-0">*/}
                    {/*    <Command>*/}
                    {/*      <CommandInput placeholder="Role" className="h-9" />*/}
                    {/*      <CommandList>*/}
                    {/*        <CommandEmpty>No role found.</CommandEmpty>*/}
                    {/*        <CommandGroup>*/}
                    {/*          {roles.map((role) => (*/}
                    {/*              <CommandItem*/}
                    {/*                  key={role.value}*/}
                    {/*                  value={role.value}*/}
                    {/*                  onSelect={(currentValue) => {*/}
                    {/*                    // setValue(currentValue === value ? "" : currentValue);*/}
                    {/*                    // setOpen(false);*/}
                    {/*                  }}>*/}
                    {/*                <div className="flex items-center space-x-3 py-1">*/}
                    {/*                  <Checkbox id={role.value} />*/}
                    {/*                  <label*/}
                    {/*                      htmlFor={role.value}*/}
                    {/*                      className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">*/}
                    {/*                    {role.label}*/}
                    {/*                  </label>*/}
                    {/*                </div>*/}
                    {/*              </CommandItem>*/}
                    {/*          ))}*/}
                    {/*        </CommandGroup>*/}
                    {/*      </CommandList>*/}
                    {/*    </Command>*/}
                    {/*  </PopoverContent>*/}
                    {/*</Popover>*/}
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
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}>
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
