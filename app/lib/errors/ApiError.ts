export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public name = "ApiError"
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
