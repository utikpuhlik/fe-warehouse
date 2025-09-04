import { Metadata } from "next";

export function generateAvatarFallback(string: string) {
  const names = string.split(" ").filter((first_name: string) => first_name);
  const mapped = names.map((first_name: string) =>
    first_name.charAt(0).toUpperCase(),
  );

  return mapped.join("");
}

export function generateMeta({
  title,
  description,
  canonical,
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
      canonical: `/dashboard${canonical}`,
    },
    openGraph: {
      images: [`https://bundui-images.netlify.app/seo.jpg`],
    },
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    // minimumFractionDigits: 0,
    // maximumFractionDigits: 2,
  }).format(value);
}

export const formatDateToLocal = (
  dateStr: string,
  locale = "ru-RU",
  numeric = false,
) => {
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

export function formatDatePriceList(date: Date): string {
  const dd: string = String(date.getDate()).padStart(2, "0");
  const mm: string = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy: number = date.getFullYear();
  return `${dd}_${mm}_${yyyy}`;
}

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
