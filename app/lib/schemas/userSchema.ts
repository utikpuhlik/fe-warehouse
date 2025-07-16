import {z} from "zod";

/** Single user */
export const zUserReadSchema = z.object({
    id: z.string().uuid(),
    clerk_id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    avatar_url: z.string().url().nullable(),
    email: z.string().email(),
    is_active: z.boolean(),
    is_superuser: z.boolean(),
    is_verified: z.boolean(),
    role: z.enum(["ADMIN", "EMPLOYEE", "USER"]),
    customer_type: z.enum(["USER_RETAIL", "USER_WHOLESALE", "USER_SUPER_WHOLESALE"]),
    mailing: z.boolean(),
    phone: z.string().nullable(),
    city: z.string().nullable(),
    notes: z.string().nullable(),
    shipping_method: z.enum(["SELF_PICKUP", "CARGO", "OTHER"]).nullable(),
    shipping_company: z.string().nullable(),
});

/** Array wrapper for list endpoints */
export const zUsers = z.array(zUserReadSchema);

/** TypeScript helper */
export type UserSchema = z.infer<typeof zUserReadSchema>;
