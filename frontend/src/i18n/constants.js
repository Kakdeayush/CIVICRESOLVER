export const LANGUAGE_STORAGE_KEY = "civicresolver-language";
export const DEFAULT_LANGUAGE = "en";

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English", htmlLang: "en", locale: "en-US" },
  { value: "hi", label: "हिंदी", htmlLang: "hi", locale: "hi-IN" },
  { value: "mr", label: "मराठी", htmlLang: "mr", locale: "mr-IN" },
  // { value: "bi", label: "बिहारी", htmlLang: "bi", locale: "bi-IN" },
  // { value: "ur", label: "اردو", htmlLang: "ur", locale: "ur-PK" },
];

export const COMPLAINT_CATEGORY_CODES = [
  "ROAD",
  "GARBAGE",
  "WATER",
  "ELECTRICITY",
  "STREET_LIGHT",
  "OTHER",
];

export const SUGGESTION_CATEGORY_CODES = [
  "TRANSPORT",
  "CLEANLINESS",
  "WATER_MANAGEMENT",
  "STREET_LIGHTING",
  "PARKS_AND_GREENERY",
  "PUBLIC_SAFETY",
  "OTHER",
];

export const COMPLAINT_STATUS_CODES = ["PENDING", "ONGOING", "RESOLVED"];
export const SUGGESTION_STATUS_CODES = [
  "NEW",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "IMPLEMENTED",
];

export const normalizeCode = (value) =>
  String(value ?? "")
    .trim()
    .replaceAll("-", "_")
    .replaceAll(" ", "_")
    .replaceAll("/", "_")
    .toUpperCase();

export const humanizeCode = (value) =>
  String(value ?? "")
    .trim()
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Unknown";

export const resolvePath = (source, key) => {
  if (!source || !key) return undefined;

  return key.split(".").reduce((current, part) => {
    if (current && Object.prototype.hasOwnProperty.call(current, part)) {
      return current[part];
    }

    return undefined;
  }, source);
};

export const interpolate = (template, params = {}) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ""));

export const formatDateTime = (value, locale, options = {}) => {
  if (!value) return "Unknown";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getLocalizedLabel = (language, translations, key, fallback) => {
  const languagePack = translations[language] || translations[DEFAULT_LANGUAGE];
  const resolved = resolvePath(languagePack, key);
  const defaultValue =
    fallback || resolvePath(translations[DEFAULT_LANGUAGE], key) || humanizeCode(key.split(".").pop());

  if (typeof resolved === "string") {
    return resolved;
  }

  return defaultValue;
};
