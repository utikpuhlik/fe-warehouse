"use client";

import { useState } from "react";
import { printWaybill } from "@/app/lib/apis/client/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";

type Props = {
  waybillId: string;
  full?: boolean;
};

export function DownloadWaybillExcel({ waybillId, full = true }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await printWaybill(waybillId);
      const blob = await res.blob();
      const filename = `waybill_${waybillId}.docx`;

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
    <DownloadButton
      onClick={handleDownload}
      format="xlsx"
      full={full}
      loading={loading}
      disabled={loading}
    />
  );
}
