import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation, LanguageCode, SUPPORTED_LANGUAGES } from '../i18n';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'inline' | 'compact' | 'mobile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'dropdown',
  className = '' 
}) => {
  const { language, setLanguage, currentLanguageOption, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // INLINE VARIANT (e.g. for settings / modal panels)
  if (variant === 'inline') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('common.language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-purple-900/60 border-amber-400/80 text-white ring-1 ring-amber-400/40 shadow-sm'
                    : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl leading-none">{lang.flag}</span>
                  <div>
                    <div className="text-xs font-bold leading-tight">{lang.nativeLabel}</div>
                    <div className="text-[10px] text-stone-400">{lang.region}</div>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // COMPACT IN-SIMULATOR VARIANT
  if (variant === 'compact') {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-stone-900/90 hover:bg-stone-800 text-white px-2 py-1 rounded-lg text-[9px] font-bold border border-stone-700/80 shadow-sm transition"
          title={t('common.selectLanguage')}
        >
          <span className="text-xs">{currentLanguageOption.flag}</span>
          <span className="font-mono">{currentLanguageOption.code.split('-')[0].toUpperCase()}</span>
          <ChevronDown className={`w-2.5 h-2.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-stone-950 border border-stone-800 rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-fade-in">
            <div className="px-2 py-1 border-b border-stone-800/80 text-[8px] font-bold text-stone-400 flex items-center gap-1 uppercase tracking-wider">
              <Globe className="w-2.5 h-2.5 text-amber-400" />
              {t('common.language')}
            </div>
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-2 py-1.5 text-left text-[9px] flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-purple-950/80 text-amber-300 font-bold'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">{lang.flag}</span>
                    <span>{lang.nativeLabel}</span>
                  </div>
                  {isSelected && <Check className="w-2.5 h-2.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // DEFAULT DROPDOWN (Header / Navbar)
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/50 text-stone-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40"
        aria-label={t('common.selectLanguage')}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguageOption.nativeLabel}</span>
        <span className="sm:hidden font-mono uppercase text-[11px]">{currentLanguageOption.code.split('-')[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-52 bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl z-50 py-1.5 overflow-hidden backdrop-blur-md animate-fade-in"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 border-b border-stone-800/80 text-[10px] font-bold text-stone-400 flex items-center justify-between uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-amber-400" />
              {t('common.language')}
            </span>
            <span className="text-[9px] text-amber-400/80 font-mono">i18n</span>
          </div>

          <div className="p-1 space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  role="menuitem"
                  className={`w-full px-2.5 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-purple-950/80 text-amber-300 font-bold border border-amber-400/30 shadow-sm'
                      : 'text-stone-300 hover:bg-stone-900 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div>
                      <div className="font-bold leading-tight">{lang.nativeLabel}</div>
                      <div className="text-[10px] text-stone-400">{lang.region}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-full font-mono">
                      <Check className="w-3 h-3 text-amber-400" />
                      {t('common.activeLanguage')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
