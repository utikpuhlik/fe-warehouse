"use client";

import { useState } from "react";
import { printWaybill } from "@/app/lib/apis/documentApi";
import { showToastError } from "@/app/lib/errors/toastError";
import {DownloadButton} from "@/app/ui/catalogue/buttons/download-button";

type Props = {
    waybillId: string;
    full?: boolean;
};

export function DownloadWaybillButton({ waybillId, full = true }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const res = await printWaybill(waybillId);
            const blob = await res.blob();
            const disposition = res.headers.get("Content-Disposition");
            const filename = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? `waybill_${waybillId}.docx`;

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
        <DownloadButton onClick={handleDownload} full={full} loading={loading} />
    );
}
