export const BASE_URL: string = process.env.API_URL ?? 'http://127.0.0.1:8080';

if (!BASE_URL) {
    throw new Error("API_URL is not defined in environment variables");
}

export const imageUrlPlaceholder: string =
    "https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp";