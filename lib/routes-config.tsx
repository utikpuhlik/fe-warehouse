import {
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { LucideIcon } from "lucide-react";

export type PageRoutesType = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const page_routes: PageRoutesType[] = [
  { title: "Панель", href: "/main", icon: HomeIcon },
  { title: "Пользователи", href: "/users", icon: UserGroupIcon },
  { title: "Каталог", href: "/catalogue", icon: ClipboardDocumentListIcon },
  { title: "Поиск", href: "/search", icon: MagnifyingGlassIcon },
  // { title: "Catalogue Table", href: "/table", icon: TableCellsIcon },
  { title: "Заказы", href: "/orders", icon: ShoppingCartIcon },
  { title: "Накладные", href: "/waybills", icon: DocumentArrowDownIcon },
  { title: "История", href: "/history", icon: ClockIcon },
  { title: "Помощь", href: "/help", icon: QuestionMarkCircleIcon },
];
