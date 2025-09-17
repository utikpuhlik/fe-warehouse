import { ApiError } from "@/app/lib/errors/ApiError";
import { toast } from "@/hooks/use-toast";

export function showToastError(error: unknown) {
  if (error instanceof ApiError) {
    toast({
      title: getTitleByStatus(error.status),
      description: error.message,
      variant: "destructive",
    });
  } else if (error instanceof Error) {
    toast({
      title: "Ошибка",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Неизвестная ошибка",
      description: "Что-то пошло не так.",
      variant: "destructive",
    });
  }
}

function getTitleByStatus(status: number): string {
  switch (status) {
    case 400:
      return "Некорректный запрос";
    case 401:
      return "Неавторизован";
    case 403:
      return "Доступ запрещён";
    case 404:
      return "Не найдено";
    case 409:
      return "Конфликт";
    case 415:
      return "Неверный формат";
    case 422:
      return "Ошибка валидации";
    case 500:
      return "Ошибка сервера";
    default:
      return `Ошибка ${status}`;
  }
}
