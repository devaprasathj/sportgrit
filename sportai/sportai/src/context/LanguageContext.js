import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "../utils/translations";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

const getValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => {
    if (!acc || typeof acc !== "object") return undefined;
    return acc[part];
  }, obj);
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const value = useMemo(() => {
    const t = (key) => {
      const langBlock = translations[language] || translations.en;
      const result = getValue(langBlock, key);
      return result ?? key;
    };

    return { language, setLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
