// import { en } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";

export const dictionaries = {
    // en,
    ru
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof ru;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
