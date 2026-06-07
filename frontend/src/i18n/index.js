import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, LANGUAGE_STORAGE_KEY } from "./constants";
import EN from "./en";
import HI from "./hi";
import MR from "./mr";
import BI from "./bi";
import UR from "./ur";

export { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS } from "./constants";
export { LANGUAGE_STORAGE_KEY } from "./constants";
export {
  COMPLAINT_CATEGORY_CODES,
  COMPLAINT_STATUS_CODES,
  SUGGESTION_CATEGORY_CODES,
  SUGGESTION_STATUS_CODES,
  formatDateTime,
  getLocalizedLabel,
  humanizeCode,
  interpolate,
  normalizeCode,
  resolvePath,
} from "./constants";

export const TRANSLATIONS = {
  en: EN,
  hi: HI,
  mr: MR,
  bi: BI,
  ur: UR,
};

export const getDefaultLanguage = () => DEFAULT_LANGUAGE;
