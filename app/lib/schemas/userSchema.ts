import {z} from "zod";

/** Single user */
export const zUser = z.object({
    id: z.string().uuid(),
    first_name: z.string(),
    last_name: z.string().nullable(),
    avatar_url: z.string().url().nullable(),
    email: z.string().email(),
    is_active: z.boolean(),
    is_superuser: z.boolean(),
    is_verified: z.boolean(),
    role: z.string(),
    position: z.string().nullable(),
});

/** Array wrapper for list endpoints */
export const zUsers = z.array(zUser);

/** TypeScript helper */
export type UserSchema = z.infer<typeof zUser>;
