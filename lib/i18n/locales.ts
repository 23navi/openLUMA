export type LocaleEntry = {
  code: string;
  /** Native name shown in dropdown, e.g. 'English' */
  label: string;
  /** Short label shown on the toggle button, e.g. 'EN' */
  shortLabel: string;
};

/**
 * Supported locales registry.
 *
 * To add a new language:
 *   1. Create `lib/i18n/locales/<code>.json` (copy an existing file as template)
 *   2. Add an entry here
 */
export const supportedLocales = [
  { code: 'en-US', label: 'English', shortLabel: 'EN' },
  { code: 'hi-IN', label: 'हिन्दी', shortLabel: 'HI' },
  { code: 'gu-IN', label: 'ગુજરાતી', shortLabel: 'GU' },
  { code: 'mr-IN', label: 'मराठी', shortLabel: 'MR' },
] as const satisfies readonly LocaleEntry[];
