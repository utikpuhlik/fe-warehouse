"use client"

import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, Loader } from "lucide-react"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TooltipInfo } from "@/app/ui/shared/tooltip-info"

import type { UserSchema, UserPaginatedSchema } from "@/app/lib/schemas/userSchema"

export function SelectUserField() {
    const { setValue } = useFormContext()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const debouncedSearch = useDebouncedCallback((val: string) => {
        setSearchTerm(val)
    }, 300)

    const fetchUsers = async (query: string): Promise<UserPaginatedSchema> => {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`, {
            cache: "no-store",
        })
        if (!res.ok) throw new Error("Ошибка поиска пользователей")
        return await res.json()
    }

    const { data, isLoading } = useQuery({
        queryKey: ["users", searchTerm],
        queryFn: () => fetchUsers(searchTerm),
        enabled: !!searchTerm,
    })

    const handleSelect = (user: UserSchema) => {
        setValue("customer_id", user.id, { shouldValidate: true, shouldDirty: true })
        setInput(`${user.first_name} ${user.last_name} | ${user.email}`)
        setOpen(false)
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                <Label htmlFor="user-search">Пользователь</Label>
                <TooltipInfo content="Начните вводить имя, фамилию или email" />
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {input || (
                            <span className="text-muted-foreground">Выбери пользователя</span>
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl shadow-xl">
                    <Command shouldFilter={false}>
                        <CommandInput
                            id="user-search"
                            value={input}
                            onValueChange={(val) => {
                                setInput(val)
                                debouncedSearch(val.trim())
                            }}
                            onFocus={() => setOpen(true)}
                            placeholder="Поиск по имени, email..."
                        />
                        <ScrollArea className="max-h-64">
                            <CommandList>
                                {isLoading ? (
                                    <div className="flex justify-center py-6">
                                        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                                    </div>
                                ) : !data?.items.length ? (
                                    <CommandEmpty>Ничего не найдено.</CommandEmpty>
                                ) : (
                                    <CommandGroup heading="Результаты">
                                        {data.items.map((user) => (
                                            <CommandItem
                                                key={user.id}
                                                value={user.id}
                                                onSelect={() => handleSelect(user)}
                                                className="px-3 py-2 cursor-pointer hover:bg-muted"
                                            >
                                                <div className="flex flex-col text-sm">
                          <span className="font-medium">
                            {user.first_name} {user.last_name}
                          </span>
                                                    <span className="text-xs text-muted-foreground">
                            {user.email} — {user.customer_type}
                          </span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
