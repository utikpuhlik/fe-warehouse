'use client';
import { ComponentProps } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    CurrencyDollarIcon,
    ListBulletIcon,
    PencilIcon,
    IdentificationIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';

type IconVariant =
    | 'price'
    | 'quantity'
    | 'text'
    | 'name'
    | 'manufacturer'
    | 'cross'
    | 'slug'
    | 'description'
    | 'image';

const iconMap: Record<IconVariant, React.ElementType> = {
    price: CurrencyDollarIcon,
    quantity: ListBulletIcon,
    text: PencilIcon,
    name: PencilIcon,
    manufacturer: IdentificationIcon,
    cross: IdentificationIcon,
    slug: PencilIcon,
    description: PencilIcon,
    image: PhotoIcon,
};

type Props = {
    variant: IconVariant;
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
} & Omit<ComponentProps<typeof Input>, 'name' | 'type' | 'placeholder'>;

export default function IconInput({
                                      variant,
                                      label,
                                      name,
                                      placeholder,
                                      type = 'text',
                                      className,
                                      ...props
                                  }: Props) {
    const Icon = iconMap[variant];

    return (
        <div className="mb-4 space-y-2">
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    {...props}
                    className={cn('pl-10', className)}
                />
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
        </div>
    );
}
