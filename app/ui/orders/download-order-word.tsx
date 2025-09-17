"use client";

import { useState } from "react";

import { printOrder } from "@/app/lib/apis/client/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import { downloadBlob } from "@/app/lib/utils/downloadBlob";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";

type Props = {
  orderId: string;
  full?: boolean;
};

export function DownloadOrderWord({ orderId, full = true }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await printOrder(orderId);
      const blob = await res.blob();
      const filename = `order_${orderId}.docx`;
      downloadBlob(blob, filename);
    } catch (err) {
      showToastError(err);
    } finally {
      setLoading(false);
    }
  };

  return <DownloadButton onClick={handleDownload} format="docx" full={full} loading={loading} disabled={loading} />;
}
