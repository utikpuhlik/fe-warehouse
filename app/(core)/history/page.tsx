import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("history"),
  };
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchAuditLog } from "@/app/lib/apis/auditLogApi";
import { formatDateToLocal } from "@/app/lib/utils/utils";
import { AuditLogSchema } from "@/app/lib/schemas/auditLogSchema";

export default async function BasicChangelog() {
  const data = await fetchAuditLog();
  const changes: AuditLogSchema[] = data.items;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Audit Log
            <span className="relative flex h-3 w-3">
              <span className="bg-secondary-foreground/80 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-secondary-foreground relative inline-flex h-3 w-3 rounded-full"></span>
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {changes.map((c, i) => (
            <div key={c.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{c.method}</h3>
                {i === 0 && <Badge>Latest</Badge>}
              </div>

              <p className="text-muted-foreground text-sm">
                {`Date: ${formatDateToLocal(c.created_at)}`}
              </p>

              <p className="text-muted-foreground text-sm">
                {`Author: ${c.user.first_name} ${c.user.last_name}`}
              </p>

              <p className="text-muted-foreground text-sm">{`Resource: ${c.endpoint}`}</p>

              {i < changes.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
