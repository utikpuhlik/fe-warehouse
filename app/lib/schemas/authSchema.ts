import {z} from "zod";
export const zAuthSchema = z.object({
    access_token: z.string(),
    token_type: z.string()
})

/** TypeScript helper */
export type AuthSchema = z.infer<typeof zAuthSchema>;