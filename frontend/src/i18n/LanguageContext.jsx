
import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
  TRANSLATIONS,
  formatDateTime,
  getLocalizedLabel,
  interpolate,
  normalizeCode,
  resolvePath,
} from "./index";

export { LANGUAGE_OPTIONS };

const LanguageContext = createContext(null);

const isSupportedLanguage = (value) =>
  LANGUAGE_OPTIONS.some((option) => option.value === value);

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isSupportedLanguage(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage access issues and fall back to browser language.
  }

  const browserLanguage = window.navigator.language?.toLowerCase() || "";

  if (browserLanguage.startsWith("hi")) return "hi";
  if (browserLanguage.startsWith("mr")) return "mr";
  if (browserLanguage.startsWith("bi")) return "bi";
  if (browserLanguage.startsWith("ur")) return "ur";

  return DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage failures.
    }

    const meta = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
    document.documentElement.lang =
      LANGUAGE_OPTIONS.find((option) => option.value === language)?.htmlLang ||
      DEFAULT_LANGUAGE;
    document.title = meta.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", meta.meta.description);
    }
  }, [language]);

  const t = (key, params = {}) => {
    const languagePack = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
    const fallback = resolvePath(TRANSLATIONS[DEFAULT_LANGUAGE], key);
    const value = resolvePath(languagePack, key);
    const resolved = value !== undefined ? value : fallback !== undefined ? fallback : key;

    if (Array.isArray(resolved)) {
      return resolved;
    }

    if (typeof resolved !== "string") {
      return resolved;
    }

    return interpolate(resolved, params);
  };

  const translateRole = (role) =>
    getLocalizedLabel(language, TRANSLATIONS, `labels.roles.${String(role ?? "").trim().toLowerCase()}`);
  const translateComplaintCategory = (category) =>
    getLocalizedLabel(language, TRANSLATIONS, `labels.complaintCategory.${normalizeCode(category)}`);
  const translateSuggestionCategory = (category) =>
    getLocalizedLabel(language, TRANSLATIONS, `labels.suggestionCategory.${normalizeCode(category)}`);
  const translateComplaintStatus = (status) =>
    getLocalizedLabel(language, TRANSLATIONS, `labels.complaintStatus.${normalizeCode(status)}`);
  const translateSuggestionStatus = (status) =>
    getLocalizedLabel(language, TRANSLATIONS, `labels.suggestionStatus.${normalizeCode(status)}`);

  const locale =
    LANGUAGE_OPTIONS.find((option) => option.value === language)?.locale ||
    LANGUAGE_OPTIONS[0].locale;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        locale,
        t,
        formatDateTime: (value, options = {}) => formatDateTime(value, locale, options),
        translateRole,
        translateComplaintCategory,
        translateSuggestionCategory,
        translateComplaintStatus,
        translateSuggestionStatus,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
