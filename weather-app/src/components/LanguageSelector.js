import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'al', name: 'Albanian' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'bg', name: 'Български (Bulgarian)' },
    { code: 'ca', name: 'Català (Catalan)' },
    { code: 'cz', name: 'Čeština (Czech)' },
    { code: 'da', name: 'Dansk (Danish)' },
    { code: 'de', name: 'Deutsch (German)' },
    { code: 'el', name: 'Ελληνικά (Greek)' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español (Spanish)' },
    { code: 'eu', name: 'Euskara (Basque)' },
    { code: 'fa', name: 'فارسی (Persian)' },
    { code: 'fi', name: 'Suomi (Finnish)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'gl', name: 'Galego (Galician)' },
    { code: 'he', name: 'עברית (Hebrew)' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'hr', name: 'Hrvatski (Croatian)' },
    { code: 'hu', name: 'Magyar (Hungarian)' },
    { code: 'id', name: 'Bahasa Indonesia (Indonesian)' },
    { code: 'it', name: 'Italiano (Italian)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'kr', name: '한국어 (Korean)' },
    { code: 'la', name: 'Latina (Latin)' },
    { code: 'lt', name: 'Lietuvių (Lithuanian)' },
    { code: 'mk', name: 'Македонски (Macedonian)' },
    { code: 'ne', name: 'नेपाली (Nepali)' },
    { code: 'nl', name: 'Nederlands (Dutch)' },
    { code: 'no', name: 'Norsk (Norwegian)' },
    { code: 'pl', name: 'Polski (Polish)' },
    { code: 'pt', name: 'Português (Portuguese)' },
    { code: 'pt_br', name: 'Português Brasil (Brazilian Portuguese)' },
    { code: 'ro', name: 'Română (Romanian)' },
    { code: 'ru', name: 'Русский (Russian)' },
    { code: 'sk', name: 'Slovenčina (Slovak)' },
    { code: 'sl', name: 'Slovenščina (Slovenian)' },
    { code: 'sp', name: 'Español (Spanish)' },
    { code: 'sr', name: 'Српски (Serbian)' },
    { code: 'sv', name: 'Svenska (Swedish)' },
    { code: 'th', name: 'ไทย (Thai)' },
    { code: 'tr', name: 'Türkçe (Turkish)' },
    { code: 'ua', name: 'Українська (Ukrainian)' },
    { code: 'vi', name: 'Tiếng Việt (Vietnamese)' },
    { code: 'zh_cn', name: '中文简体 (Chinese Simplified)' },
    { code: 'zh_tw', name: '中文繁體 (Chinese Traditional)' },
    { code: 'zu', name: 'isiZulu (Zulu)' }
  ];

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-4 py-2 rounded-lg glass-effect text-white bg-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
    >
      {languages.map(lang => (
        <option 
          key={lang.code} 
          value={lang.code} 
          className="bg-gray-800 text-white"
        >
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector; 