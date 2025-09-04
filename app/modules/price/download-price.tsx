"use client";

import { useState } from "react";
import { DownloadButton } from "@/app/ui/shared/buttons/download-button";
import { showToastError } from "@/app/lib/errors/toastError";
import { formatDatePriceList } from "@/app/lib/utils/utils";

const timestamp = new Date();
const FILE_URL = `https://storage.yandexcloud.net/tcf-images/tmp/price_list_${formatDatePriceList(timestamp)}.xlsx`;

export function DownloadPrice() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const a = document.createElement("a");
      a.href = FILE_URL;
      document.body.appendChild(a);
      a.click();
      a.remove();
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
