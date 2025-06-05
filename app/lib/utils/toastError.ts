import { ConflictError, UnsupportedMediaTypeError } from "@/app/lib/errors/apiErrors";
import {toast} from "@/hooks/use-toast";
export function showToastError(error: unknown) {
    if (error instanceof ConflictError) {
        toast({
            title: "Conflict",
            description: error.message,
            variant: "destructive",
        });
    } else if (error instanceof UnsupportedMediaTypeError) {
        toast({
            title: "Unsupported Media Type",
            description: error.message,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Ошибка сервера",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
            variant: "destructive",
        });
    }
}
