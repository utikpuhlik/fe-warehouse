"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {fetchPriceList} from "@/app/lib/apis/documentApi";
import {showToastError} from "@/app/lib/utils/toastError";

export default function PricePage() {
	const [priceType, setPriceType] = useState<"retail" | "wholesale">("retail");
	const [ext, setExt] = useState<"xlsx" | "csv">("xlsx");
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		setIsDownloading(true);

		try {
			const res: Response = await fetchPriceList(priceType, ext);
			const blob = await res.blob();

			const disposition = res.headers.get("Content-Disposition");
			const match = disposition?.match(/filename="?([^"]+)"?/);
			const filename = match?.[1] ?? `price.${ext}`;

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
			setIsDownloading(false);
		}
	};

	return (
		<main className="p-6 max-w-xl mx-auto space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Скачать прайс-лист</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-1">
						<Label>Тип прайса</Label>
						<Select value={priceType} onValueChange={(v) => setPriceType(v as "retail" | "wholesale")}>
							<SelectTrigger>
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
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
								<SelectItem value="csv">CSV (.csv)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button onClick={handleDownload} disabled={isDownloading}>
						{isDownloading ? "Загрузка..." : "Скачать"}
					</Button>
				</CardContent>
			</Card>
		</main>
	);
}
