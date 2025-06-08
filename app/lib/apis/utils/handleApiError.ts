import {
    ConflictError,
    UnsupportedMediaTypeError,
    UnknownApiError,
} from "@/app/lib/errors/apiErrors";

type Entity = "category" | "sub-category" | "product" | "offer" | "user" | "order" | "waybill" | string;

interface HandleApiErrorOptions {
    entity?: Entity;
    customMessages?: Partial<Record<number, string>>; // For overriding default messages per status code
}

export function handleApiError(
    res: Response,
    errorText: string,
    options?: HandleApiErrorOptions
): never {
    const entity = options?.entity ?? "resource";
    const custom = options?.customMessages ?? {};

    if (res.status in custom) {
        throw new UnknownApiError(res.status, custom[res.status] || errorText);
    }

    switch (res.status) {
        case 409:
            throw new ConflictError(`${capitalize(entity)} с таким именем уже существует.`, res.status);

        case 415:
            throw new UnsupportedMediaTypeError(`Недопустимый формат файла для ${entity}.`, res.status);

        default:
            throw new UnknownApiError(res.status, errorText || `Ошибка при работе с ${entity}.`);
    }
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
