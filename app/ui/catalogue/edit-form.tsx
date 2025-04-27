'use client';
import {ProductPutSchema, UserSchema} from '@/app/lib/schemas-tcf';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {State, updateProductAction} from "@/app/lib/actions-tcf";
import {Icon} from "@radix-ui/react-select";
// import {useActionState} from "react";

export default function EditProductForm({
  id,
  product,
  users,
}: {
  id: string;
  product: ProductPutSchema;
  users: UserSchema[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateProductWithId = updateProductAction.bind(null, id)
  // const [state, formAction] = useActionState(updateProductWithId, initialState)

  return (
    <form action={updateProductWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={users[0].id}
            >
              <option value="" disabled>
                Select a employee
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product address_id */}
        <div className="mb-4">
          <label htmlFor="address_id" className="mb-2 block text-sm font-medium">
            Enter an address_id
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="address_id"
                  name="address_id"
                  type="text"
                  defaultValue={product.address_id ?? 'AA-TEST'}
                  placeholder="Enter the address_id"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={product.name}
                  placeholder="Enter the Name"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Enter a Brand
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="brand"
                  name="brand"
                  type="text"
                  defaultValue={product.brand}
                  placeholder="Enter the brand"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product manufacturer_numbe */}
        <div className="mb-4">
          <label htmlFor="manufacturer_number" className="mb-2 block text-sm font-medium">
            Enter a manufacturer_number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="manufacturer_number"
                  name="manufacturer_number"
                  type="text"
                  defaultValue={product.manufacturer_number}
                  placeholder="Enter the manufacturer_number"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product cross_number */}
        <div className="mb-4">
          <label htmlFor="cross_number" className="mb-2 block text-sm font-medium">
            Enter a cross_number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="cross_number"
                  name="cross_number"
                  type="text"
                  defaultValue={product.cross_number ?? 'empty'}
                  placeholder="Enter the cross_number"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Enter a description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="description"
                  name="description"
                  type="text"
                  defaultValue={product.description ?? 'empty'}
                  placeholder="Enter the description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product image_url */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Enter a image_url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  defaultValue={product.image_url ?? 'empty'}
                  placeholder="Enter the image_url"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Invoice price_rub */}
        <div className="mb-4">
          <label htmlFor="price_rub" className="mb-2 block text-sm font-medium">
            Choose an price_rub
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price_rub"
                name="price_rub"
                type="number"
                step="1"
                defaultValue={product.price_rub}
                placeholder="Enter RUB amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice super_wholesale_price_rub */}
        <div className="mb-4">
          <label htmlFor="super_wholesale_price_rub" className="mb-2 block text-sm font-medium">
            Choose an super_wholesale_price_rub
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="super_wholesale_price_rub"
                  name="super_wholesale_price_rub"
                  type="number"
                  step="1"
                  defaultValue={product.super_wholesale_price_rub}
                  placeholder="Enter RUB amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Choose an quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  step="1"
                  defaultValue={product.quantity}
                  placeholder="Enter quantity"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/catalogue/table"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Prouct</Button>
      </div>
    </form>
  );
}
