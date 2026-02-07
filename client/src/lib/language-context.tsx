import { createContext, useContext, useState, useCallback } from "react";
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
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "ru") return saved;
    }
    return "ru";
  });

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
