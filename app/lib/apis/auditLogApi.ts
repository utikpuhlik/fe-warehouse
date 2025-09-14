import { env } from "@/env";
import { fetchWithAuthAndParse } from "@/app/lib/apis/utils/fetchJson";
import {
  AuditLogPaginatedSchema,
  zAuditLogPaginatedSchema,
} from "@/app/lib/schemas/auditLogSchema";

const ENTITY = "audit-log";

export async function fetchAuditLog(): Promise<AuditLogPaginatedSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;
  return fetchWithAuthAndParse(url, zAuditLogPaginatedSchema, true, ENTITY);
}
