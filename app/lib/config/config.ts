export const BASE_URL: string = process.env.API_URL ?? 'http://127.0.0.1:8080';
// export const BASE_URL: string = "https://api-tcf.eucalytics.uk"

if (!BASE_URL) {
    throw new Error("API_URL is not defined in environment variables");
}