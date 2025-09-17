"use client";

import { useState } from "react";

import { printWaybill } from "@/app/lib/apis/client/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import { downloadBlob } from "@/app/lib/utils/downloadBlob";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";

type Props = {
  waybillId: string;
  format: "docx" | "xlsx";
  full?: boolean;
};

export function DownloadWaybill({ waybillId, format, full = true }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await printWaybill(waybillId, format);
      const blob = await res.blob();
      const filename = `waybill_${waybillId}.${format}`;
      downloadBlob(blob, filename);
    } catch (err) {
      showToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return <DownloadButton onClick={handleDownload} format={format} full={full} loading={loading} disabled={loading} />;
}
