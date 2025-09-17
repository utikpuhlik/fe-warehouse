import { ApiError } from "./ApiError";
import { errorMessagesByEntity } from "./errorMessages";

export function handleApiError(res: Response, errorText: string, entity: string | undefined = "default"): never {
  const messages = errorMessagesByEntity[entity] ?? errorMessagesByEntity.default;
  const message = messages[res.status] || `Error ${res.status}: ${errorText}`;

  throw new ApiError(res.status, message, entity);
}
