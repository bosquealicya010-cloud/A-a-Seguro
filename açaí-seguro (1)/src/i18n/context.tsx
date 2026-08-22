import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { LanguageCode, LanguageOption, SUPPORTED_LANGUAGES } from './types';
import { ptBR } from './locales/pt-BR';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';

const STORAGE_KEY = 'acai_seguro_lang_preference';

const translations: Record<LanguageCode, any> = {
  'pt-BR': ptBR,
  'en': en,
  'es': es,
  'fr': fr
};

interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
  tList: (keyPath: string) => string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function detectBrowserLanguage(): LanguageCode {
  if (typeof window === 'undefined' || !navigator) {
    return 'pt-BR';
  }

  const browserLangs = navigator.languages || [navigator.language || ''];
  
  for (const rawLang of browserLangs) {
    if (!rawLang) continue;
    const lower = rawLang.toLowerCase();
    
    if (lower === 'pt-br' || lower.startsWith('pt')) {
      return 'pt-BR';
    }
    if (lower.startsWith('en')) {
      return 'en';
    }
    if (lower.startsWith('es')) {
      return 'es';
    }
    if (lower.startsWith('fr')) {
      return 'fr';
    }
  }

  return 'pt-BR';
}

function resolveNestedKey(obj: any, path: string): any {
  if (!obj) return null;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'pt-BR' || saved === 'en' || saved === 'es' || saved === 'fr')) {
        return saved as LanguageCode;
      }
    } catch {
      // Ignore localStorage read errors
    }
    return detectBrowserLanguage();
  });

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore localStorage write errors
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentLanguageOption = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const localeObj = translations[language] || ptBR;
    let val = resolveNestedKey(localeObj, keyPath);

    // Fallback to pt-BR if missing in selected language
    if (val === null || val === undefined) {
      val = resolveNestedKey(ptBR, keyPath);
    }

    if (val === null || val === undefined) {
      return keyPath;
    }

    if (typeof val !== 'string') {
      return String(val);
    }

    if (params) {
      let interpolated = val;
      for (const [k, v] of Object.entries(params)) {
        interpolated = interpolated.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
      return interpolated;
    }

    return val;
  };

  const tList = (keyPath: string): string[] => {
    const localeObj = translations[language] || ptBR;
    let val = resolveNestedKey(localeObj, keyPath);

    if (!Array.isArray(val)) {
      val = resolveNestedKey(ptBR, keyPath);
    }

    return Array.isArray(val) ? val : [];
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
        t,
        tList
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
