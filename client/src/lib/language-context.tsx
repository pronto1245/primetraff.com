import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Lang } from "./i18n";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start in "ru" so the first render matches the server-rendered HTML;
  // the saved choice is applied right after mount.
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en") setLang("en");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "ru" ? "en" : "ru";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
