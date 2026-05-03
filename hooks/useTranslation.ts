import { useI18n } from "@/context/i18nContext";

/**
 * Convenience hook that surfaces the i18n utilities consumed in most
 * components. Returns the same shape as useI18n but makes the import path
 * shorter and the intent clearer at the call-site.
 *
 * @example
 *   const { t, language, setLanguage } = useTranslation();
 *   <h1>{t("hero.title")}</h1>
 */
export function useTranslation() {
  return useI18n();
}
