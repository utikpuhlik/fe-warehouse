import { env } from "@/env";
import { fetchAndParse } from "@/app/lib/apis/utils/fetchJson";
import {
  AuditLogPaginatedSchema,
  zAuditLogPaginatedSchema,
} from "@/app/lib/schemas/auditLogSchema";

const ENTITY = "audit-log";

export async function fetchAuditLog(): Promise<AuditLogPaginatedSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;
  return fetchAndParse(url, zAuditLogPaginatedSchema, true, ENTITY);
}
