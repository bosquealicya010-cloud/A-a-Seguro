export type LanguageCode = 'pt-BR' | 'en' | 'es' | 'fr';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'pt-BR',
    label: 'Português (Brasil)',
    nativeLabel: 'Português',
    flag: '🇧🇷',
    region: 'Brasil'
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
    region: 'United States'
  },
  {
    code: 'es',
    label: 'Español',
    nativeLabel: 'Español',
    flag: '🇪🇸',
    region: 'España / Latam'
  },
  {
    code: 'fr',
    label: 'Français',
    nativeLabel: 'Français',
    flag: '🇫🇷',
    region: 'France'
  }
];

export interface TranslationSchema {
  [key: string]: string | TranslationSchema;
}
