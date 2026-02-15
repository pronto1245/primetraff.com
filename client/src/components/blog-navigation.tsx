import { useState } from "react";
import { Link } from "wouter";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";
import { Languages, Menu, X } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import primeTraffLogo from "@assets/IMG_9022_1770529061025.png";

const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";
const LOGIN_URL = "https://primetrack.pro/login";
const TELEGRAM_CHANNEL_URL = "https://t.me/prime_traf";

export default function BlogNavigation() {
  const { lang, toggleLang } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#001a3a]/80 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 -ml-10" data-testid="link-blog-logo">
            <img src={primeTraffLogo} alt="PrimeTraff" className="h-44 w-auto" width={853} height={171} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/70 hover:text-white transition-colors" data-testid="link-blog-home">
              {lang === "ru" ? "Главная" : "Home"}
            </Link>
            <Link href="/blog" className="text-white transition-colors font-medium" data-testid="link-blog-blog">
              {t(translations.blog.nav, lang)}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 border border-white/20 bg-white/5 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors hover:border-white/30 hover:bg-white/10"
              data-testid="button-blog-lang-toggle"
            >
              <Languages className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/90 uppercase">{lang === "ru" ? "EN" : "RU"}</span>
            </button>
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-[#0088CC]/50 bg-[#0088CC]/10 transition-colors text-sm font-medium px-3 py-1.5 rounded-full" data-testid="link-blog-telegram-channel">
              <SiTelegram className="w-4 h-4 text-[#0088CC]" />
              <span className="text-white">{t(translations.nav.ourChannel, lang)}</span>
            </a>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-blog-login-nav">
              <Button variant="outline" className="border-white/25 text-white/80 font-medium px-5 rounded-full">
                {t(translations.nav.login, lang)}
              </Button>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-blog-register-nav">
              <Button variant="outline" className="border-white/30 text-white font-medium px-5 rounded-full">
                {t(translations.nav.becomePartner, lang)}
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 border border-white/20 bg-white/5 text-sm font-semibold px-2.5 py-1.5 rounded-full"
              data-testid="button-blog-lang-toggle-mobile"
            >
              <span className="text-white/90 uppercase text-xs">{lang === "ru" ? "EN" : "RU"}</span>
            </button>
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-blog-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#001a3a]/95 backdrop-blur-xl border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              <Link href="/" className="text-white/70 py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)} data-testid="link-blog-mobile-home">
                {lang === "ru" ? "Главная" : "Home"}
              </Link>
              <Link href="/blog" className="text-white py-3 min-h-[44px] flex items-center font-medium" onClick={() => setMobileMenuOpen(false)} data-testid="link-blog-mobile-blog">
                {t(translations.blog.nav, lang)}
              </Link>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-blog-login-mobile">
                <Button variant="outline" className="w-full border-white/25 text-white/80 font-medium rounded-full">
                  {t(translations.nav.login, lang)}
                </Button>
              </a>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-blog-register-mobile">
                <Button variant="outline" className="w-full border-white/30 text-white font-medium rounded-full">
                  {t(translations.nav.becomePartner, lang)}
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
