import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import Link from "next/link";
import * as React from "react";

type TableDetailsDropdownProps = {
    href_edit: string;
}

type TableDetailsOrderDropdownProps = {
    href_edit: string;
    href_details: string;
    href_print: string;
    href_convert: string;
}

export function TableDetailsDropdown({href_edit}: TableDetailsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <span className="sr-only">Открыть меню</span>
                    <MoreHorizontal/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href={href_edit}>Редактировать</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export function TableDetailsOrderDropdown({href_edit, href_details, href_convert, href_print}: TableDetailsOrderDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <span className="sr-only">Открыть меню</span>
                    <MoreHorizontal/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href={href_details}>Детали</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={href_edit}>Редактировать</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={href_print}>Печать</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={href_convert}>Конвертировать</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}