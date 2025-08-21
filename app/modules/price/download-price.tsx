"use client";

import { useState } from "react";
import { printPriceList } from "@/app/lib/apis/client/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";
import { downloadBlob } from "@/app/lib/utils/downloadBlob";

export function DownloadPrice() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await printPriceList();
      const blob = await res.blob();
      const filename = `price.xlsx`;
      downloadBlob(blob, filename);
    } catch (err) {
      showToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <DownloadButton
        onClick={handleDownload}
        format="xlsx"
        full={true}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
}
