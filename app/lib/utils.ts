import type { Revenue } from "./definitions";
import {Metadata} from "next";


export function generateAvatarFallback(string: string) {
	const names = string.split(" ").filter((first_name: string) => first_name);
	const mapped = names.map((first_name: string) => first_name.charAt(0).toUpperCase());

	return mapped.join("");
}

export function generateMeta({
								 title,
								 description,
								 canonical
							 }: {
	title: string;
	description: string;
	canonical: string;
}): Metadata {
	return {
		title: `${title} | TCF`,
		description: description,
		metadataBase: new URL(`https://shadcnuikit.com`),
		alternates: {
			canonical: `/dashboard${canonical}`
		},
		openGraph: {
			images: [`https://bundui-images.netlify.app/seo.jpg`]
		}
	};
}

export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const formatDateToLocal = (dateStr: string, locale = "ru-RU", numeric = false) => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		minute: "2-digit",
		hour: "2-digit",
		day: "numeric",
		month: numeric ? "numeric" : "short",
		year: "numeric",
	};
	const formatter = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
	// Calculate what labels we need to display on the y-axis
	// based on highest record and in 1000s
	const yAxisLabels = [];
	const highestRecord = Math.max(...revenue.map((month) => month.revenue));
	const topLabel = Math.ceil(highestRecord / 1000) * 1000;

	for (let i = topLabel; i >= 0; i -= 1000) {
		yAxisLabels.push(`$${i / 1000}K`);
	}

	return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
