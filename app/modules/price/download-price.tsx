"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export function DownloadPrice() {
  const [priceType, setPriceType] = useState<"retail" | "wholesale">("retail");
  const [ext, setExt] = useState<"xlsx" | "csv">("xlsx");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await printPriceList(priceType, ext);
      const blob = await res.blob();
      const filename =
        res.headers
          .get("Content-Disposition")
          ?.match(/filename="?([^"]+)"?/)?.[1] ?? `price.${ext}`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
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

      <Button
        className="mt-2 sm:mt-0"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Скачать прайс"}
      </Button>
    </div>
  );
}
