"use client";

import React from "react";
import {CommandIcon, SearchIcon, LucideIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {page_routes} from "@/lib/routes-config";
import {useEffect, useState} from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

type CommandItemProps = {
    title: string;
    href: string;
    icon: LucideIcon;
};

export default function Search() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const CommandItemComponent: React.FC<CommandItemProps> = ({title, href, icon: Icon}) => {
        return (
            <CommandItem
                onSelect={() => {
                    setOpen(false);
                    router.push(href);
                }}
            >
                <Icon className="me-2 h-4 w-4"/>
                <span>{title}</span>
            </CommandItem>
        );
    };


    return (
        <div className="ms-auto lg:me-auto lg:flex-1">
            <div className="relative hidden max-w-sm flex-1 lg:block">
                <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"/>
                <Input
                    className="h-9 w-full cursor-pointer rounded-md border pr-4 pl-10 text-sm shadow-xs"
                    placeholder="Search..."
                    type="search"
                    onFocus={() => setOpen(true)}
                />
                <div
                    className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 rounded-sm bg-zinc-200 p-1 font-mono text-xs font-medium sm:flex dark:bg-neutral-700">
                    <CommandIcon className="size-3"/>
                    <span>k</span>
                </div>
            </div>
            <div className="block lg:hidden">
                <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
                    <SearchIcon/>
                </Button>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <CommandInput placeholder="Type a command or search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {page_routes.map((route, key) => (
                        <React.Fragment key={route.title}>
                            {/*<CommandGroup heading={route.title}>*/}
                                <CommandItemComponent key={key} title={route.title} href={route.href}
                                                      icon={route.icon}/>
                            {/*</CommandGroup>*/}
                            <CommandSeparator/>
                        </React.Fragment>
                    ))}
                </CommandList>
            </CommandDialog>
        </div>
    );
}
