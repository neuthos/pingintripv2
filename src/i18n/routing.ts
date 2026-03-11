import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id", "cn"],
  defaultLocale: "en",
});
