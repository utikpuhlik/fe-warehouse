import { z } from "zod";
import {
  zRoleEnum,
  zShippingMethodEnum,
  zCustomerTypeEnum,
} from "@/app/lib/schemas/commonSchema";

/** Single user */
export const zUserSchema = z.object({
  id: z.string().uuid(),
  clerk_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  is_active: z.boolean(),
  balance_rub: z.number(),
  role: zRoleEnum,
  customer_type: zCustomerTypeEnum,
  mailing: z.boolean(),
  phone: z.string().nullable(),
  city: z.string().nullable(),
  note: z.string().nullable(),
  shipping_method: zShippingMethodEnum.nullable(),
  shipping_company: z.string().nullable(),
  // addresses: z.array(zAddressSchema),
});

export const zUserPaginatedSchema = z.object({
  items: z.array(zUserSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  size: z.number().int().positive(),
  pages: z.number().int().nonnegative(),
});

/** TypeScript helper */
export type UserSchema = z.infer<typeof zUserSchema>;
export type UserPaginatedSchema = z.infer<typeof zUserPaginatedSchema>;
