/**
 * @type {import("prettier").Config}
 */
export default {
  // core config
  printWidth: 120,
  quoteProps: "consistent",
  trailingComma: "all",
  arrowParens: "avoid",
  // plugins
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^@/(.*)$", "", "^[.]"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["clsx"],
};
