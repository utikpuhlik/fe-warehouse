import { z } from "zod";
import { zUserSchema } from "@/app/lib/schemas/userSchema";
import { zPaginatedSchema } from "@/app/lib/schemas/commonSchema";

const zAuditLogSchema = z.object({
  id: z.string().uuid(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  endpoint: z.string().url(),
  payload: z.record(z.any()).nullable(),
  user: zUserSchema,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const zAuditLogPaginatedSchema = zPaginatedSchema.extend({
  items: z.array(zAuditLogSchema),
});

/** TypeScript helpers */
export type AuditLogSchema = z.infer<typeof zAuditLogSchema>;
export type AuditLogPaginatedSchema = z.infer<typeof zAuditLogPaginatedSchema>;
