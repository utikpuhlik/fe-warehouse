import {z} from "zod";

export const zCountSchema = z.object({
    count: z.number().gte(0)
});

export type CountSchema = z.infer<typeof zCountSchema>;