'use client';
import { UserCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils'; // если нужно будет подмешивать классы
import { ComponentProps } from 'react';

type Props = {
    variant: 'user' | 'category'; // еще можно добавить
    label: string;
    name: string;
    options: { value: string; label: string }[];
} & Omit<ComponentProps<typeof Select>, 'children' | 'defaultValue'>;

export default function IconSelect({ variant, label, name, options, ...props }: Props) {
    const Icon = variant === 'user' ? UserCircleIcon : ListBulletIcon;

    return (
        <div className="mb-4 space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="relative">
                <Select name={name} {...props}>
                    <SelectTrigger id={name} className="pl-10">
                        <SelectValue placeholder={label} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
        </div>
    );
}
