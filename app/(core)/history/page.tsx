import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { fetchAuditLog } from "@/app/lib/apis/auditLogApi";
import { AuditLogSchema } from "@/app/lib/schemas/auditLogSchema";
import { formatDateToLocal } from "@/app/lib/utils/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  return {
    title: t("history"),
  };
}

export default async function BasicChangelog() {
  const data = await fetchAuditLog();
  const changes: AuditLogSchema[] = data.items;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            Audit Log
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-foreground/80 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-foreground"></span>
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

              <p className="text-sm text-muted-foreground">{`Date: ${formatDateToLocal(c.created_at)}`}</p>

              <p className="text-sm text-muted-foreground">{`Author: ${c.user.first_name} ${c.user.last_name}`}</p>

              <p className="text-sm text-muted-foreground">{`Resource: ${c.endpoint}`}</p>

              {i < changes.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
