// lib/errors/httpErrors.ts

export class ConflictError extends Error {
    constructor(message = "Conflict with existing data") {
        super(message);
        this.name = "ConflictError";
    }
}

export class UnsupportedMediaTypeError extends Error {
    constructor(message = "Invalid media type") {
        super(message);
        this.name = "UnsupportedMediaTypeError";
    }
}

export class UnknownApiError extends Error {
    constructor(status: number, message = "Unknown API error") {
        super(`API Error ${status}: ${message}`);
        this.name = "UnknownApiError";
    }
}
