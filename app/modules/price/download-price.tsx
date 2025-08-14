"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { printPriceList } from "@/app/lib/apis/client/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import { Label } from "@/components/ui/label";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";
import { downloadBlob } from "@/app/lib/utils/downloadBlob";

export function DownloadPrice() {
  const [priceType, setPriceType] = useState<"retail" | "wholesale">("retail");
  const [ext, setExt] = useState<"xlsx" | "csv">("xlsx");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await printPriceList(priceType, ext);
      const blob = await res.blob();
      const filename = `price.${ext}`;
      downloadBlob(blob, filename);
    } catch (err) {
      showToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="space-y-1">
        <Label>Тип прайса</Label>
        <Select
          value={priceType}
          onValueChange={(v) => setPriceType(v as "retail" | "wholesale")}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="retail">Розничный</SelectItem>
            <SelectItem value="wholesale">Оптовый</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Формат</Label>
        <Select value={ext} onValueChange={(v) => setExt(v as "xlsx" | "csv")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xlsx">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DownloadButton
        onClick={handleDownload}
        format="xlsx"
        full={false}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
}
