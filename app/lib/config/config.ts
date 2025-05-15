export const BASE_URL = process.env.API_URL;

if (!BASE_URL) {
    throw new Error("API_URL is not defined in environment variables");
}

export const imageUrlPlaceholder: string =
    "https://chibisafe.eucalytics.uk//REXA2bZVWeZT.webp";