import { z } from "zod";

const zAddressBaseSchema = z.object({
  user_id: z.string().uuid(),
  first_name: z.string().min(1, "Имя не может быть пустым"),
  last_name: z.string().min(1, "Имя не может быть пустым"),
  phone: z.string().min(1, "Телефон не может быть пустым"),
  city: z.string().min(1, "Город не может быть пустым"),
  street: z.string().min(1, "Улица не может быть пустой"),
  postal_code: z.string().min(1, "Почтовый код не может быть пустым"),
  shipping_method: z.enum(["SELF_PICKUP", "CARGO", "OTHER"]).nullable(),
  shipping_company: z.string().nullable(),
  is_default: z.boolean(),
});

export const zAddressSchema = zAddressBaseSchema.extend({
  id: z.string().uuid(),
});

export const zAddressPostSchema = zAddressBaseSchema.extend({});

export const zAddressPutSchema = zAddressBaseSchema.extend({});

export const zAddresssSchema = z.array(zAddressSchema);

/** TypeScript helpers */
export type AddressSchema = z.infer<typeof zAddressSchema>;
export type AddressPostSchema = z.infer<typeof zAddressPostSchema>;
export type AddressPutSchema = z.infer<typeof zAddressPutSchema>;
