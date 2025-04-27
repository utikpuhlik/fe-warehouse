'use client';


import IconInput from "@/app/components/form/IconInput";
import IconSelect from "@/app/components/form/IconSelect";
import {createProductAction} from "@/app/lib/actions-tcf";
import Link from "next/link";
import {Button} from "@/app/ui/button";
import {productFields} from "@/app/lib/form/productFields";
import { UserSchema, Category } from "@/app/lib/schemas-tcf";

export default function Form({ employees, categories }: { employees: UserSchema[], categories: Category[]}) {
  return (
      <form action={createProductAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Selects */}
          <IconSelect
              name="employeeId"
              label="Choose employee"
              options={employees.map(e => ({ value: e.id, label: e.first_name }))}
              variant="user"
          />

          <IconSelect
              name="categoryId"
              label="Choose category"
              options={categories.map(c => ({ value: c.id, label: c.name }))}
              variant="category"
          />

          {/* Dynamic text / number inputs */}
          {productFields.map(({ variant, ...rest }) => (
              <IconInput key={rest.name} variant={variant} {...rest} />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
              href="/catalogue/table"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
  );
}