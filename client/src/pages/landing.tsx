import { useState, useEffect, useRef, useMemo, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { 
  ChevronDown, 
  ArrowRight, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  DollarSign,
  Globe,
  CheckCircle,
  Star,
  Menu,
  X,
  Lock,
  Briefcase,
  LineChart,
  Rocket,
  KeyRound,
  Mail,
  Languages
} from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";

import primeTraffLogo from "@assets/IMG_9022_1770529061025.png";

import logoSpinAura from "@assets/Без_названия_(21)_1770453425632.jpeg";
import logoElonbet from "@assets/Без_названия_(31)_1770453425635.png";
import logoMagneticslots from "@assets/Без_названия_(30)_1770453425635.png";
import logoSpinMillion from "@assets/img69525e9bc7f63_1770453425635.png";
import logoPrestige from "@assets/img695261fc58a0d_1770453425636.png";
import logoWinAirlines from "@assets/Без_названия_(29)_1770453425635.png";
import logoYYYCasino from "@assets/Без_названия_(20)_1770453425635.jpeg";
import logoFatPirate from "@assets/Без_названия_(19)_1770453425635.jpeg";

import logo1WIN from "@assets/Без_названия_(1)_1770453702150.png";
import logoMrBet from "@assets/Без_названия_(2)_1770453702153.png";
import logoSpincity from "@assets/Без_названия_(3)_1770453702153.jpeg";
import logoWinhero from "@assets/Без_названия_(3)_1770453702153.png";
import logoXONBet from "@assets/Без_названия_(4)_1770453702154.jpeg";
import logoCorgibet from "@assets/Без_названия_(4)_1770453702154.png";
import logoLeon from "@assets/Без_названия_(5)_1770453702154.jpeg";
import logoBruceBet from "@assets/Без_названия_(5)_1770453702154.png";
import logoVavada from "@assets/Без_названия_(6)_1770453702154.jpeg";
import logoTwin from "@assets/Без_названия_(6)_1770453702155.png";
import logo7Slots from "@assets/Без_названия_(7)_1770453702155.jpeg";
import logoSlott from "@assets/Без_названия_(7)_1770453702155.png";
import logoBooi from "@assets/Без_названия_(8)_1770453702155.jpeg";
import logoAmonbet from "@assets/Без_названия_(8)_1770453702155.png";
import logoPlayfortuna from "@assets/Без_названия_(9)_1770453702155.jpeg";
import logoLuckyWave from "@assets/Без_названия_(10)_1770453702155.jpeg";
import logoSlotLair from "@assets/Без_названия_(10)_1770453702155.png";
import logoBeef from "@assets/Без_названия_(11)_1770453702156.jpeg";
import logoFlagman from "@assets/Без_названия_(11)_1770453702156.png";
import logoMartin from "@assets/Без_названия_(12)_1770453702156.jpeg";

import logoStarda from "@assets/Без_названия_(12)_1770453751817.png";
import logoBets10 from "@assets/Без_названия_(13)_1770453751827.jpeg";
import logoIrwin from "@assets/Без_названия_(13)_1770453751827.png";
import logoIzzi from "@assets/Без_названия_(14)_1770453751828.jpeg";
import logoGizbo from "@assets/Без_названия_(14)_1770453751828.png";
import logoSlotuna from "@assets/Без_названия_(15)_1770453751828.jpeg";
import logoAwintura from "@assets/Без_названия_(15)_1770453751829.png";
import logoLegzo from "@assets/Без_названия_(16)_1770453751829.jpeg";
import logoHitNSpin from "@assets/Без_названия_(16)_1770453751829.png";
import logo1GO from "@assets/Без_названия_(17)_1770453751830.jpeg";
import logoVulkanBet from "@assets/Без_названия_(17)_1770453751830.png";
import logo1xCasino from "@assets/Без_названия_(18)_1770453751830.jpeg";
import logoSpinanía from "@assets/Без_названия_(18)_1770453751830.png";
import logoVerdecasino from "@assets/Без_названия_(19)_1770453751830.png";
import logoSlotoro from "@assets/Без_названия_(20)_1770453751830.png";

import logoVulkanSpiele from "@assets/Без_названия_(21)_1770453809642.png";
import logoCorgibet2 from "@assets/Без_названия_(22)_1770453809646.png";
import logoLex from "@assets/Без_названия_(23)_1770453809647.png";
import logoMonro from "@assets/Без_названия_(24)_1770453809647.png";
import logoMelbet from "@assets/Без_названия_(25)_1770453809648.png";
import logoFlagman2 from "@assets/Без_названия_(26)_1770453809647.png";
import logoGizbo2 from "@assets/Без_названия_(27)_1770453809647.png";
import logoJugabet from "@assets/Без_названия_(28)_1770453809648.png";

import logoVegas from "@assets/img69380f65d567f_1770453920456.png";
import logoBr4bet from "@assets/zQAzTcUzmpmD09fPheuQwWO7Jqm0FxinQatFQkwy_1770453920459.jpg";
import logoWinhero2 from "@assets/Без_названия_(32)_1770454010355.png";

const CrystalScene = lazy(() => import("@/components/CrystalScene"));

const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";
const LOGIN_URL = "https://primetrack.pro/login";
const TELEGRAM_URL = "https://t.me/primetrack_support_bot";
const TELEGRAM_CHANNEL_URL = "https://t.me/prime_traf";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useIsTouchDevice() {
  const [isTouch] = useState(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return true;
    if ("ontouchstart" in window) return true;
    if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) return true;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true;
    const ua = navigator.userAgent || "";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) return true;
    if (/Macintosh/i.test(ua) && "ontouchend" in document) return true;
    return false;
  });
  return isTouch;
}

function BlueBgDecorations() {
  const isTouch = useIsTouchDevice();
  if (isTouch) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(0,100,200,0.12) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,16,48,0.4) 100%)" }} />
      </div>
    );
  }
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "radial-gradient(circle, rgba(0,140,220,0.18) 0%, rgba(0,100,200,0.06) 50%, transparent 70%)" }} />
      <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.15) 0%, rgba(0,120,210,0.05) 50%, transparent 70%)" }} />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(0,160,240,0.12) 0%, transparent 60%)" }} />
      <div className="absolute bottom-[5%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(60,180,255,0.1) 0%, transparent 60%)" }} />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 60%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,16,48,0.4) 100%)" }} />
    </div>
  );
}

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("orientationchange", handler);
    return () => window.removeEventListener("orientationchange", handler);
  }, [breakpoint]);
  return mobile;
}

function SparkleParticles() {
  const isTouch = useIsTouchDevice();
  if (isTouch) return null;

  const particles = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 6,
    duration: 2.5 + Math.random() * 3.5,
    opacity: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(180,230,255,${p.opacity}) 0%, rgba(0,180,255,${p.opacity * 0.4}) 50%, transparent 100%)`,
            boxShadow: `0 0 ${p.size * 5}px rgba(100,200,255,${p.opacity * 0.6}), 0 0 ${p.size * 10}px rgba(0,150,255,${p.opacity * 0.2})`,
            animation: `sparkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingDots() {
  const isTouch = useIsTouchDevice();
  if (isTouch) return null;

  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: `${3 + Math.random() * 94}%`,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 12,
    duration: 12 + Math.random() * 16,
    opacity: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            background: `radial-gradient(circle, rgba(140,220,255,${d.opacity}) 0%, rgba(0,160,255,${d.opacity * 0.4}) 70%, transparent 100%)`,
            boxShadow: `0 0 ${d.size * 6}px rgba(0,180,255,${d.opacity * 0.6}), 0 0 ${d.size * 12}px rgba(0,120,255,${d.opacity * 0.2})`,
            animation: `float-up ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function GridOverlay() {
  const isTouch = useIsTouchDevice();
  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{
      backgroundImage: `
        linear-gradient(rgba(80,180,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(80,180,255,0.06) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      animation: "grid-pulse 6s ease-in-out infinite",
      maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
    }} />
  );
}

function GlowingDivider() {
  return (
    <div className="w-full py-4 flex items-center justify-center">
      <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
    </div>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-16 md:h-24"
        style={{ fill: "rgba(0,80,160,0.15)" }}
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
      </svg>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div 
      className={`
        relative bg-white/[0.06] backdrop-blur-sm md:backdrop-blur-xl border border-white/10 rounded-2xl
        ${hover ? "md:hover:border-sky-400/30 md:hover:bg-white/[0.09] md:hover:shadow-[0_0_30px_-5px_rgba(0,136,204,0.15)]" : ""}
        transition-all duration-300
        ${className}
      `}
    >
      <div className="hidden md:block absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#001a3a]/80 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2 -ml-10" data-testid="link-logo">
            <img src={primeTraffLogo} alt="PrimeTraff" className="h-44 w-auto" width={853} height={171} />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/70 hover:text-white transition-colors" data-testid="link-features">{t(translations.nav.features, lang)}</a>
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors" data-testid="link-how-it-works">{t(translations.nav.howItWorks, lang)}</a>
            <a href="#partners" className="text-white/70 hover:text-white transition-colors" data-testid="link-partners">{t(translations.nav.partners, lang)}</a>
            <a href="#faq" className="text-white/70 hover:text-white transition-colors" data-testid="link-faq">{t(translations.nav.faq, lang)}</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 border border-white/20 bg-white/5 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors hover:border-white/30 hover:bg-white/10"
              data-testid="button-lang-toggle"
            >
              <Languages className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/90 uppercase">{lang === "ru" ? "EN" : "RU"}</span>
            </button>
            <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-[#0088CC]/50 bg-[#0088CC]/10 transition-colors text-sm font-medium px-3 py-1.5 rounded-full" data-testid="link-telegram-channel-nav">
              <SiTelegram className="w-4 h-4 text-[#0088CC]" />
              <span className="text-white">{t(translations.nav.ourChannel, lang)}</span>
            </a>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-login-nav">
              <Button variant="outline" className="border-white/25 text-white/80 font-medium px-5 rounded-full">
                {t(translations.nav.login, lang)}
              </Button>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-become-partner-nav">
              <Button variant="outline" className="border-white/30 text-white font-medium px-5 rounded-full">
                {t(translations.nav.becomePartner, lang)}
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 border border-white/20 bg-white/5 text-sm font-semibold px-2.5 py-1.5 rounded-full"
              data-testid="button-lang-toggle-mobile"
            >
              <span className="text-white/90 uppercase text-xs">{lang === "ru" ? "EN" : "RU"}</span>
            </button>
            <button 
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#001a3a]/95 backdrop-blur-xl border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-white/70 py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-features">{t(translations.nav.features, lang)}</a>
              <a href="#how-it-works" className="text-white/70 py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-how-it-works">{t(translations.nav.howItWorks, lang)}</a>
              <a href="#partners" className="text-white/70 py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-partners">{t(translations.nav.partners, lang)}</a>
              <a href="#faq" className="text-white/70 py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-faq">{t(translations.nav.faq, lang)}</a>
              <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-login-mobile">
                <Button variant="outline" className="w-full border-white/25 text-white/80 font-medium rounded-full">
                  {t(translations.nav.login, lang)}
                </Button>
              </a>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="w-full" data-testid="button-become-partner-mobile">
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

function GlowingOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: "-5%" }}>
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]">
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.25) 0%, rgba(0,136,204,0.12) 30%, rgba(0,80,180,0.05) 55%, transparent 70%)" }} />
        <div className="absolute inset-[15%] rounded-full" style={{ background: "radial-gradient(circle, rgba(100,200,255,0.2) 0%, rgba(0,150,220,0.08) 40%, transparent 70%)" }} />
        <div className="absolute inset-[30%] rounded-full" style={{ background: "radial-gradient(circle, rgba(150,220,255,0.25) 0%, rgba(80,180,255,0.1) 40%, transparent 65%)" }} />
        <div className="absolute inset-[42%] rounded-full" style={{ background: "radial-gradient(circle, rgba(200,240,255,0.35) 0%, rgba(100,200,255,0.12) 50%, transparent 70%)" }} />
        <div className="absolute inset-0 rounded-full animate-[spin_30s_linear_infinite]" style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(0,180,255,0.06) 25%, transparent 50%, rgba(0,136,204,0.06) 75%, transparent 100%)" }} />
        <div className="hidden md:block absolute inset-[-5%] rounded-full border border-white/[0.03]" />
        <div className="hidden md:block absolute inset-[10%] rounded-full border border-white/[0.04]" />
        <div className="hidden md:block absolute inset-[25%] rounded-full border border-white/[0.05]" />
      </div>
    </div>
  );
}

function DecorBadge({ text, rotation, className, delay = 0, color = "sky" }: { text: string; rotation: number; className?: string; delay?: number; color?: string }) {
  const colors: Record<string, string> = {
    sky: "bg-sky-500/20 border-sky-400/40 text-sky-200",
    cyan: "bg-cyan-500/20 border-cyan-400/40 text-cyan-200",
    amber: "bg-amber-500/20 border-amber-400/40 text-amber-200",
    emerald: "bg-emerald-500/20 border-emerald-400/40 text-emerald-200",
    violet: "bg-violet-500/20 border-violet-400/40 text-violet-200",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className={`px-4 py-1.5 lg:px-5 lg:py-2 rounded-full border text-sm lg:text-base font-bold tracking-wider uppercase backdrop-blur-sm whitespace-nowrap ${colors[color]}`}>
        {text}
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const { lang } = useLang();

  const mobileBadges = ["CPA / RS / Hybrid", "Gambling x Betting", t(translations.hero.badges.geo, lang), t(translations.hero.badges.partners, lang), t(translations.hero.badges.payouts, lang)];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001030 0%, #002060 30%, #0055AA 60%, #0088CC 100%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,200,255,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,100,200,0.2),_transparent_60%)]" />
      <GlowingOrb />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2 lg:mb-3"
            >
              <span className="text-white/50 text-base md:text-lg lg:text-xl font-medium tracking-[0.3em] uppercase">Affiliate Network</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[5.5rem] md:text-[8.5rem] lg:text-[11rem] xl:text-[13rem] font-black text-white leading-[0.85] tracking-tighter mb-4"
              style={{ fontFamily: "'Inter', sans-serif", fontStretch: "condensed" }}
            >
              <span className="text-white/30">i</span>GAMING
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base lg:text-lg text-white/70 max-w-md mt-6 mb-8 leading-relaxed"
            >
              {t(translations.hero.subtitle, lang)}
            </motion.p>

            <div className="relative mt-2 mb-8 h-[180px] md:h-[200px] lg:h-[160px] hidden md:block">
              <DecorBadge text="CPA / RS / Hybrid" rotation={-6} className="top-0 left-0" delay={0.3} color="sky" />
              <DecorBadge text="Gambling x Betting" rotation={4} className="top-2 left-[220px] lg:left-[260px]" delay={0.4} color="amber" />
              <DecorBadge text={t(translations.hero.badges.geo, lang)} rotation={-3} className="top-[70px] left-[60px]" delay={0.5} color="emerald" />
              <DecorBadge text={t(translations.hero.badges.partners, lang)} rotation={5} className="top-[65px] left-[220px] lg:left-[240px]" delay={0.55} color="violet" />
              <DecorBadge text={t(translations.hero.badges.payouts, lang)} rotation={-2} className="top-[120px] left-[20px]" delay={0.6} color="cyan" />
            </div>

            <div className="flex md:hidden flex-wrap gap-2 mb-8 mt-4">
              {mobileBadges.map((badge, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}>
                  <div className="px-3 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/15 text-sky-200 text-sm font-bold tracking-wider uppercase backdrop-blur-sm">{badge}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 lg:gap-5 w-full lg:w-auto lg:min-w-[260px]"
          >
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-login" className="block">
              <div className="group relative border-2 border-white/20 rounded-2xl px-10 py-8 lg:px-12 lg:py-10 text-center transition-all duration-300 cursor-pointer" style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-white font-bold text-lg lg:text-xl tracking-wide uppercase">{t(translations.hero.loginBtn, lang)}</span>
                <ArrowRight className="w-5 h-5 text-white/60 inline-block ml-3" />
              </div>
            </a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-register" className="block">
              <div className="group relative border-2 border-sky-400/30 rounded-2xl px-10 py-8 lg:px-12 lg:py-10 text-center transition-all duration-300 cursor-pointer" style={{ background: "rgba(0,136,204,0.12)" }}>
                <span className="text-white font-bold text-lg lg:text-xl tracking-wide uppercase">{t(translations.hero.registerBtn, lang)}</span>
              </div>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-hero-telegram" className="block">
              <div className="group relative border-2 border-[#0088CC]/30 rounded-2xl px-10 py-5 lg:px-12 lg:py-6 text-center transition-all duration-300 cursor-pointer flex items-center justify-center gap-3" style={{ background: "rgba(0,136,204,0.08)" }}>
                <SiTelegram className="w-5 h-5 text-[#0088CC]" />
                <span className="text-white/80 font-semibold text-base lg:text-lg">Telegram</span>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-white/30 text-sm md:text-base mt-16 lg:mt-20 max-w-lg tracking-wide"
        >
          {t({ ru: "CPA \u00b7 RevShare \u00b7 Hybrid \u2014 Gambling & Betting", en: "CPA \u00b7 RevShare \u00b7 Hybrid \u2014 Gambling & Betting" }, lang)}
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}

function HolographicIcon({ icon: Icon, color, glowColor }: { icon: any; color: string; glowColor: string }) {
  return (
    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-5 lg:mb-6">
      <div className="absolute inset-0 rounded-full opacity-30 blur-xl animate-[pulse_4s_ease-in-out_infinite]" style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }} />
      <div className="absolute inset-1 rounded-full border border-white/10" style={{ background: `radial-gradient(circle at 30% 30%, ${color}30, transparent 60%)` }} />
      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 0deg, transparent, ${color}15, transparent, ${color}10, transparent)`, animation: "spin 8s linear infinite" }} />
      <Icon className="w-7 h-7 lg:w-8 lg:h-8 relative z-10" style={{ color, filter: `drop-shadow(0 0 8px ${glowColor})` }} />
    </div>
  );
}

function FeaturesSection() {
  const { lang } = useLang();

  const badgeSublabels = [
    { ru: "100%", en: "100%" },
    { ru: "ОФФЕРОВ", en: "OFFERS" },
    { ru: "СВЯЗКИ", en: "FUNNELS" },
    { ru: "PAY", en: "PAY" },
    { ru: "ACCESS", en: "ACCESS" },
    { ru: "LIVE", en: "LIVE" },
  ];

  const featuresMeta = [
    { icon: Shield, color: "#38bdf8", glowColor: "rgba(56,189,248,0.4)", badge: { shape: "circle" as const, label: "TRUST", sublabel: t(badgeSublabels[0], lang) } },
    { icon: Briefcase, color: "#a78bfa", glowColor: "rgba(167,139,250,0.4)", badge: { shape: "hexagon" as const, label: "500+", sublabel: t(badgeSublabels[1], lang) } },
    { icon: Rocket, color: "#22d3ee", glowColor: "rgba(34,211,238,0.4)", badge: { shape: "diamond" as const, label: "BOOST", sublabel: t(badgeSublabels[2], lang) } },
    { icon: Zap, color: "#fbbf24", glowColor: "rgba(251,191,36,0.4)", badge: { shape: "shield" as const, label: "FAST", sublabel: t(badgeSublabels[3], lang) } },
    { icon: KeyRound, color: "#f472b6", glowColor: "rgba(244,114,182,0.4)", badge: { shape: "octagon" as const, label: "VIP", sublabel: t(badgeSublabels[4], lang) } },
    { icon: LineChart, color: "#34d399", glowColor: "rgba(52,211,153,0.4)", badge: { shape: "square" as const, label: "DATA", sublabel: t(badgeSublabels[5], lang) } },
  ];

  const features = translations.features.items.map((item, i) => ({
    title: t(item.title, lang),
    description: t(item.description, lang),
    ...featuresMeta[i],
  }));

  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % features.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    startAuto();
  };
  const goPrev = () => goTo((activeIdx - 1 + features.length) % features.length);
  const goNext = () => goTo((activeIdx + 1) % features.length);

  const current = features[activeIdx];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #002060 0%, #001845 50%, #002060 100%)" }} />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px]" style={{ background: "radial-gradient(circle, rgba(0,140,220,0.12) 0%, transparent 70%)" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t(translations.features.title, lang)}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t(translations.features.subtitle, lang)}
          </p>
        </AnimatedSection>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={goPrev}
            className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all"
            data-testid="button-features-prev"
          >
            <ChevronDown className="w-5 h-5 text-white/70 rotate-90" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all"
            data-testid="button-features-next"
          >
            <ChevronDown className="w-5 h-5 text-white/70 -rotate-90" />
          </button>

          <div className="border border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden mx-8 lg:mx-0" data-testid={`card-feature-${activeIdx}`}>
            <div className="flex flex-col md:flex-row min-h-[380px] lg:min-h-[440px]">
              <div className="flex-shrink-0 p-8 lg:p-12 flex flex-col justify-center md:w-[40%] md:border-r md:border-dashed md:border-white/10">
                <motion.div
                  key={`icon-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border border-white/10 flex items-center justify-center" style={{ background: `radial-gradient(circle, ${current.color}15, transparent 70%)` }}>
                    <current.icon className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: current.color, filter: `drop-shadow(0 0 8px ${current.glowColor})` }} />
                  </div>
                </motion.div>
                <motion.div
                  key={`num-${activeIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <span className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${current.color}, ${current.color}88)` }}>
                    {String(activeIdx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                <motion.h3
                  key={`title-${activeIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-2xl lg:text-3xl xl:text-4xl font-black text-white uppercase leading-tight mt-4"
                >
                  {current.title}
                </motion.h3>
              </div>

              <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center relative">
                <motion.p
                  key={`desc-${activeIdx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-lg lg:text-xl xl:text-2xl text-white/70 leading-relaxed relative z-10"
                >
                  {current.description}
                </motion.p>

                <div className="hidden md:block absolute bottom-4 right-4 lg:bottom-6 lg:right-6 pointer-events-none">
                  <motion.div
                    key={`decor-${activeIdx}`}
                    initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: current.badge.shape === "diamond" ? 45 : current.badge.shape === "shield" ? -5 : -12, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="relative"
                  >
                    {current.badge.shape === "circle" && (
                      <div className="w-[140px] h-[140px] lg:w-[170px] lg:h-[170px] rounded-full flex flex-col items-center justify-center relative" style={{ background: `conic-gradient(from 0deg, ${current.color}40, transparent, ${current.color}30, transparent, ${current.color}40)` }}>
                        <div className="absolute inset-[3px] rounded-full" style={{ background: "linear-gradient(135deg, rgba(0,24,69,0.95), rgba(0,32,96,0.95))" }} />
                        <div className="absolute inset-3 rounded-full border border-dashed animate-[spin_15s_linear_infinite]" style={{ borderColor: `${current.color}30` }} />
                        <div className="absolute inset-6 rounded-full border animate-[spin_25s_linear_infinite_reverse]" style={{ borderColor: `${current.color}15` }} />
                        <span className="text-lg lg:text-xl font-black relative z-10" style={{ color: current.color }}>{current.badge.label}</span>
                        <span className="text-[10px] lg:text-xs font-bold tracking-wider relative z-10" style={{ color: `${current.color}99` }}>{current.badge.sublabel}</span>
                      </div>
                    )}
                    {current.badge.shape === "hexagon" && (
                      <svg className="w-[140px] h-[155px] lg:w-[170px] lg:h-[185px]" viewBox="0 0 170 185">
                        <defs>
                          <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={current.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={current.color} stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                        <polygon points="85,5 160,47 160,138 85,180 10,138 10,47" fill="url(#hex-grad)" stroke={current.color} strokeWidth="1.5" strokeOpacity="0.3" />
                        <polygon points="85,20 145,55 145,130 85,165 25,130 25,55" fill="none" stroke={current.color} strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 3" />
                        <text x="85" y="85" textAnchor="middle" fill={current.color} fontSize="28" fontWeight="900">{current.badge.label}</text>
                        <text x="85" y="110" textAnchor="middle" fill={current.color} fillOpacity="0.6" fontSize="12" fontWeight="700" letterSpacing="2">{current.badge.sublabel}</text>
                      </svg>
                    )}
                    {current.badge.shape === "diamond" && (
                      <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] flex flex-col items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${current.color}25, ${current.color}08)`, border: `1.5px solid ${current.color}30`, borderRadius: "16px" }}>
                        <div className="absolute inset-3 border border-dashed" style={{ borderColor: `${current.color}20`, borderRadius: "12px" }} />
                        <span className="text-base lg:text-lg font-black relative z-10" style={{ color: current.color, transform: "rotate(-45deg)" }}>{current.badge.label}</span>
                        <span className="text-[9px] lg:text-[10px] font-bold tracking-wider relative z-10" style={{ color: `${current.color}80`, transform: "rotate(-45deg)" }}>{current.badge.sublabel}</span>
                      </div>
                    )}
                    {current.badge.shape === "shield" && (
                      <svg className="w-[130px] h-[155px] lg:w-[160px] lg:h-[185px]" viewBox="0 0 160 185">
                        <defs>
                          <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={current.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={current.color} stopOpacity="0.08" />
                          </linearGradient>
                        </defs>
                        <path d="M80,10 L150,40 L145,120 L80,175 L15,120 L10,40 Z" fill="url(#shield-grad)" stroke={current.color} strokeWidth="1.5" strokeOpacity="0.3" />
                        <path d="M80,28 L135,52 L131,112 L80,158 L29,112 L25,52 Z" fill="none" stroke={current.color} strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="5 3" />
                        <text x="80" y="88" textAnchor="middle" fill={current.color} fontSize="26" fontWeight="900">{current.badge.label}</text>
                        <text x="80" y="112" textAnchor="middle" fill={current.color} fillOpacity="0.6" fontSize="14" fontWeight="700" letterSpacing="2">{current.badge.sublabel}</text>
                      </svg>
                    )}
                    {current.badge.shape === "octagon" && (
                      <svg className="w-[145px] h-[145px] lg:w-[175px] lg:h-[175px]" viewBox="0 0 175 175">
                        <defs>
                          <linearGradient id="oct-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={current.color} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={current.color} stopOpacity="0.08" />
                          </linearGradient>
                        </defs>
                        <polygon points="55,5 120,5 170,55 170,120 120,170 55,170 5,120 5,55" fill="url(#oct-grad)" stroke={current.color} strokeWidth="1.5" strokeOpacity="0.3" />
                        <polygon points="60,18 115,18 157,60 157,115 115,157 60,157 18,115 18,60" fill="none" stroke={current.color} strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 3" />
                        <text x="87" y="82" textAnchor="middle" fill={current.color} fontSize="32" fontWeight="900">{current.badge.label}</text>
                        <text x="87" y="108" textAnchor="middle" fill={current.color} fillOpacity="0.6" fontSize="12" fontWeight="700" letterSpacing="2">{current.badge.sublabel}</text>
                      </svg>
                    )}
                    {current.badge.shape === "square" && (
                      <div className="w-[135px] h-[135px] lg:w-[165px] lg:h-[165px] rounded-2xl flex flex-col items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${current.color}20, ${current.color}08)`, border: `1.5px solid ${current.color}25` }}>
                        <div className="absolute inset-3 rounded-xl border border-dashed" style={{ borderColor: `${current.color}18` }} />
                        <div className="absolute inset-6 rounded-lg border" style={{ borderColor: `${current.color}10` }} />
                        <span className="text-lg lg:text-xl font-black relative z-10" style={{ color: current.color }}>{current.badge.label}</span>
                        <span className="text-[10px] lg:text-xs font-bold tracking-wider relative z-10" style={{ color: `${current.color}80` }}>{current.badge.sublabel}</span>
                      </div>
                    )}
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full blur-md" style={{ background: `${current.color}50` }} />
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full blur-md" style={{ background: `${current.color}40` }} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-sky-400 w-6" : "bg-white/20"}`}
                data-testid={`button-features-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { lang } = useLang();

  const stepsMeta = [
    { step: "01", icon: Users, color: "#a78bfa", glowColor: "rgba(167,139,250,0.4)", badgeGradient: "from-violet-500 to-violet-600" },
    { step: "02", icon: Globe, color: "#38bdf8", glowColor: "rgba(56,189,248,0.4)", badgeGradient: "from-sky-500 to-sky-600" },
    { step: "03", icon: BarChart3, color: "#22d3ee", glowColor: "rgba(34,211,238,0.4)", badgeGradient: "from-cyan-500 to-cyan-600" },
    { step: "04", icon: DollarSign, color: "#fbbf24", glowColor: "rgba(251,191,36,0.4)", badgeGradient: "from-amber-500 to-amber-600" },
  ];

  const steps = translations.howItWorks.steps.map((item, i) => ({
    title: t(item.title, lang),
    description: t(item.description, lang),
    ...stepsMeta[i],
  }));

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #001535 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.1) 0%, transparent 70%)" }} />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(0,140,220,0.08) 0%, transparent 70%)" }} />
      <div className="hidden md:block absolute top-[30%] right-[5%] w-64 h-64 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(60,180,255,0.06) 0%, transparent 70%)" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t(translations.howItWorks.title, lang)}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t(translations.howItWorks.subtitle, lang)}
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[5%] right-[5%] -translate-y-1/2 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,136,204,0.3) 15%, rgba(56,189,248,0.25) 50%, rgba(167,139,250,0.2) 85%, transparent)" }} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const borderStyles = [
                { borderRadius: "24px 8px 24px 8px" },
                { borderRadius: "8px 24px 8px 24px" },
                { borderRadius: "24px 24px 8px 8px" },
                { borderRadius: "8px 8px 24px 24px" },
              ];
              const decorPositions = [
                "top-3 left-3",
                "top-3 right-3",
                "bottom-3 left-3",
                "bottom-3 right-3",
              ];
              return (
                <AnimatedSection key={i} delay={i * 0.15} className="relative">
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 z-20 items-center justify-center" style={{ display: i === steps.length - 1 ? "none" : undefined }}>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <ArrowRight className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                  </div>

                  <div className="relative p-6 lg:p-8 text-center transition-all duration-300 h-full group overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${step.color}20`, ...borderStyles[i] }} data-testid={`card-step-${i}`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}10, transparent 70%)` }} />

                    <div className={`absolute ${decorPositions[i]} w-12 h-12 rounded-full opacity-[0.06]`} style={{ background: step.color }} />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}30, transparent)` }} />

                    <div className="relative mb-4 inline-flex items-center gap-3">
                      <span className="text-5xl lg:text-6xl font-black" style={{ color: step.color, opacity: 0.15 }}>
                        {step.step}
                      </span>
                    </div>

                    <div className="relative inline-flex mb-5">
                      <div className="w-16 h-16 lg:w-18 lg:h-18 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-dashed animate-[spin_20s_linear_infinite]" style={{ borderColor: `${step.color}25` }} />
                        <div className="absolute inset-2 rounded-full border" style={{ borderColor: `${step.color}15` }} />
                        <step.icon className="w-7 h-7 lg:w-8 lg:h-8 relative z-10" style={{ color: step.color, filter: `drop-shadow(0 0 8px ${step.glowColor})` }} />
                      </div>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-base lg:text-lg text-white/55 leading-relaxed">{step.description}</p>

                    <div className="mt-5 flex items-center justify-center gap-1.5">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: j <= i ? step.color : "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        <AnimatedSection delay={0.6} className="text-center mt-12">
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-how-it-works-cta">
            <Button variant="outline" className="border-white/25 text-white font-medium px-8 h-auto py-3 rounded-full backdrop-blur-sm">
              {t(translations.howItWorks.cta, lang)}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { lang } = useLang();

  const testimonials = translations.testimonials.items.map((item) => ({
    name: t(item.name, lang),
    role: t(item.role, lang),
    avatar: t(item.avatar, lang),
    text: t(item.text, lang),
    rating: 5,
  }));

  const colors = [
    { border: "rgba(167,139,250,0.2)", glow: "rgba(167,139,250,0.06)" },
    { border: "rgba(56,189,248,0.2)", glow: "rgba(56,189,248,0.06)" },
    { border: "rgba(34,211,238,0.2)", glow: "rgba(34,211,238,0.06)" },
    { border: "rgba(251,191,36,0.2)", glow: "rgba(251,191,36,0.06)" },
    { border: "rgba(129,140,248,0.2)", glow: "rgba(129,140,248,0.06)" },
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #002060 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-0 left-1/2 w-96 h-96 rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(0,160,240,0.1) 0%, transparent 70%)" }} />
      <div className="hidden md:block absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t(translations.testimonials.title, lang)}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t(translations.testimonials.subtitle, lang)}
          </p>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 z-10" style={{ background: "linear-gradient(90deg, #001845, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 z-10" style={{ background: "linear-gradient(270deg, #001845, transparent)" }} />

        <div className="flex gap-6 animate-testimonial-scroll">
          {doubled.map((testimonial, i) => {
            const c = colors[i % colors.length];
            const accentColor = c.border.replace("0.2", "1");
            return (
              <div key={i} className="flex-shrink-0 w-[340px] lg:w-[400px]">
                <div className="relative rounded-2xl p-8 lg:p-10 h-full transition-all duration-300" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.border}` }} data-testid={`card-testimonial-${i}`}>
                  <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${c.glow}, transparent 60%)` }} />

                  <div className="absolute top-6 right-6 text-5xl lg:text-6xl font-serif leading-none opacity-[0.08]" style={{ color: accentColor }}>
                    &ldquo;
                  </div>

                  <div className="relative">
                    <div className="flex gap-1.5 mb-5">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <svg key={j} className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                          <defs>
                            <linearGradient id={`star-grad-${i}-${j}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fde68a" />
                              <stop offset="50%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                          </defs>
                          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.26 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" fill={`url(#star-grad-${i}-${j})`} stroke="#f59e0b" strokeWidth="0.5" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-lg lg:text-xl text-white/75 leading-relaxed mb-8 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full opacity-60" style={{ background: `conic-gradient(from 0deg, ${accentColor}, transparent, ${accentColor})` }} />
                        <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: `linear-gradient(135deg, ${c.border.replace("0.2", "0.5")}, ${c.border.replace("0.2", "0.2")})`, border: "2px solid rgba(0,16,48,1)" }}>
                          {testimonial.avatar}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{testimonial.name}</div>
                        <div className="text-sm font-medium" style={{ color: accentColor.replace("1)", "0.7)") }}>{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const { lang } = useLang();
  const logoMap: Record<string, string> = {
    "SpinAura": logoSpinAura,
    "Elonbet": logoElonbet,
    "Magneticslots": logoMagneticslots,
    "Spin Million": logoSpinMillion,
    "Prestige": logoPrestige,
    "WinAirlines": logoWinAirlines,
    "YYY Casino": logoYYYCasino,
    "FatPirate": logoFatPirate,
    "1 WIN": logo1WIN,
    "MrBet": logoMrBet,
    "Spincity": logoSpincity,
    "XON Bet": logoXONBet,
    "Corgibet": logoCorgibet,
    "Leon": logoLeon,
    "BruceBet": logoBruceBet,
    "Vavada": logoVavada,
    "Twin": logoTwin,
    "7Slots": logo7Slots,
    "Slott": logoSlott,
    "Booi": logoBooi,
    "Amonbet": logoAmonbet,
    "Playfortuna": logoPlayfortuna,
    "LuckyWave": logoLuckyWave,
    "SlotLair": logoSlotLair,
    "Beef": logoBeef,
    "Flagman": logoFlagman,
    "Martin": logoMartin,
    "Starda": logoStarda,
    "Bets10": logoBets10,
    "Irwin": logoIrwin,
    "Izzi": logoIzzi,
    "Gizbo": logoGizbo,
    "Slotuna": logoSlotuna,
    "Awintura": logoAwintura,
    "Legzo": logoLegzo,
    "HitNSpin": logoHitNSpin,
    "1GO": logo1GO,
    "Vulkan.bet": logoVulkanBet,
    "1xCasino": logo1xCasino,
    "Verdecasino": logoVerdecasino,
    "Slotoro": logoSlotoro,
    "VulkanSpiele": logoVulkanSpiele,
    "Lex": logoLex,
    "Monro": logoMonro,
    "Melbet": logoMelbet,
    "Jugabet": logoJugabet,
    "Vegas": logoVegas,
    "Br4bet": logoBr4bet,
    "Winhero": logoWinhero2,
  };

  const topRow = [
    "SpinAura", "Elonbet", "Magneticslots", "Spin Million", "Prestige",
    "WinAirlines", "YYY Casino", "FatPirate", "Jugabet", "Br4bet",
    "1xCasino", "1GO", "Legzo", "Melbet", "Monro", "Lex", "Slotuna",
    "Corgibet", "VulkanSpiele", "Slotoro", "Verdecasino", "Izzi",
    "Vulkan.bet", "HitNSpin",
  ];

  const bottomRow = [
    "Awintura", "Gizbo", "Irwin", "Starda", "Flagman", "Bets10",
    "Martin", "Beef", "SlotLair", "LuckyWave", "Amonbet", "Playfortuna",
    "Vegas", "Booi", "7Slots", "Vavada", "Slott", "Twin", "Leon",
    "XON Bet", "BruceBet", "MrBet", "Spincity", "1 WIN",
  ];

  const PartnerPill = ({ name, idx, prefix }: { name: string; idx: number; prefix: string }) => {
    const logo = logoMap[name];
    return (
      <div className="flex-shrink-0 flex items-center gap-2.5 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border border-white/10 bg-white/[0.04]" data-testid={`text-partner-${prefix}-${idx}`}>
        {logo && (
          <img src={logo} alt={name} className="w-6 h-6 rounded-md object-cover flex-shrink-0" loading="lazy" decoding="async" width={24} height={24} />
        )}
        <span className="text-white/80 text-sm lg:text-base font-semibold whitespace-nowrap">{name}</span>
      </div>
    );
  };

  return (
    <section id="partners" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #002060 0%, #001845 50%, #002060 100%)" }} />
      <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-sky-500/6 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-full">
        <AnimatedSection className="text-center mb-12 lg:mb-16 px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t(translations.partnersSection.title, lang)}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t(translations.partnersSection.subtitle, lang)}
          </p>
        </AnimatedSection>

        <div className="space-y-5 lg:space-y-6">
          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <div className="flex gap-3 lg:gap-4" style={{ animation: "scroll-rtl 40s linear infinite", width: "max-content" }}>
              {[...topRow, ...topRow].map((name, i) => (
                <PartnerPill key={i} name={name} idx={i} prefix="top" />
              ))}
            </div>
          </div>

          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <div className="flex gap-3 lg:gap-4" style={{ animation: "scroll-ltr 45s linear infinite", width: "max-content" }}>
              {[...bottomRow, ...bottomRow].map((name, i) => (
                <PartnerPill key={i} name={name} idx={i} prefix="bottom" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = translations.faq.items.map((item) => ({
    question: t(item.question, lang),
    answer: t(item.answer, lang),
  }));

  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001845 0%, #001535 50%, #001845 100%)" }} />
      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-blue-600/6 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {t(translations.faq.title, lang)}
          </h2>
          <p className="text-white/70 text-lg">
            {t(translations.faq.subtitle, lang)}
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const accentColors = ["#38bdf8", "#a78bfa", "#22d3ee", "#fbbf24"];
            const accent = accentColors[i % accentColors.length];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`rounded-xl border transition-all duration-300 ${openIndex === i ? "bg-white/[0.05]" : "bg-white/[0.03]"}`} style={{ borderColor: openIndex === i ? `${accent}30` : "rgba(255,255,255,0.08)" }}>
                  <button
                    className="w-full flex items-center gap-4 p-5 lg:p-6 text-left"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    data-testid={`button-faq-${i}`}
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: openIndex === i ? `${accent}20` : "rgba(255,255,255,0.05)", color: openIndex === i ? accent : "rgba(255,255,255,0.4)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base lg:text-lg font-medium text-white/90">{faq.question}</span>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${openIndex === i ? "rotate-180" : ""}`} style={{ borderColor: openIndex === i ? `${accent}30` : "rgba(255,255,255,0.1)", background: openIndex === i ? `${accent}15` : "transparent" }}>
                      <ChevronDown className="w-3.5 h-3.5" style={{ color: openIndex === i ? accent : "rgba(255,255,255,0.5)" }} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0 pl-[4.5rem]">
                      <div className="w-12 h-px mb-4" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
                      <p className="text-sm lg:text-base text-white/60 whitespace-pre-line leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { lang } = useLang();
  return (
    <section className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001030 0%, #002060 40%, #003080 70%, #0055AA 100%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,136,204,0.25),_transparent_55%)]" />
      <div className="hidden md:block absolute top-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]" />
      <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/8 rounded-full blur-[80px]" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,136,204,0.12), transparent 70%)" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute rounded-full border border-white/[0.04]" style={{
            width: `${400 + i * 200}px`,
            height: `${400 + i * 200}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">{t(translations.cta.registrationOpen, lang)}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t(translations.cta.title1, lang)}<br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">{t(translations.cta.title2, lang)}</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t(translations.cta.subtitle, lang)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-register">
              <Button variant="outline" className="border-white/30 text-white font-semibold px-12 h-auto py-4 rounded-full backdrop-blur-sm transition-all text-base hover:border-white/50 hover:bg-white/5">
                {t(translations.cta.becomePartner, lang)}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="button-cta-telegram">
              <Button variant="outline" className="border-white/15 text-white/80 px-12 h-auto py-4 rounded-full backdrop-blur-sm text-base">
                <SiTelegram className="w-5 h-5 mr-2 text-[#0088CC]" />
                {t(translations.cta.telegramSupport, lang)}
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            {[
              { icon: <CheckCircle className="w-5 h-5" />, text: t(translations.cta.noHolds, lang), color: "#fbbf24" },
              { icon: <CheckCircle className="w-5 h-5" />, text: t(translations.cta.fastApproval, lang), color: "#a78bfa" },
              { icon: <CheckCircle className="w-5 h-5" />, text: t(translations.cta.support247, lang), color: "#38bdf8" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <span style={{ color: item.color }}>{item.icon}</span>
                <span className="text-white/80 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLang();
  return (
    <footer className="relative z-10 pt-16 pb-24 md:pb-8" style={{ background: "#001030" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,136,204,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4 relative h-5">
              <img src={primeTraffLogo} alt="PrimeTraff" className="h-32 w-auto absolute" loading="lazy" decoding="async" width={640} height={128} style={{ top: "-3.5rem", left: "-1.5rem" }} />
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {t(translations.footer.description, lang)}
            </p>
            <div className="flex items-center gap-3">
              <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-[#0088CC] hover:border-[#0088CC]/30 transition-colors" data-testid="link-footer-tg-icon">
                <SiTelegram className="w-4 h-4" />
              </a>
              <a href="mailto:support@primetraff.com" className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-sky-400 hover:border-sky-400/30 transition-colors" data-testid="link-footer-email-icon">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{t(translations.footer.forPartners, lang)}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t(translations.footer.registration, lang), href: REGISTER_URL, external: true },
                { label: t(translations.footer.features, lang), href: "#features", external: false },
                { label: t(translations.footer.howItWorks, lang), href: "#how-it-works", external: false },
                { label: t(translations.footer.reviews, lang), href: "#testimonials", external: false },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-sm text-white/45 hover:text-white/80 transition-colors" data-testid={`link-footer-${item.label}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{t(translations.footer.navigation, lang)}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t(translations.footer.partnersLink, lang), href: "#partners", external: false },
                { label: "FAQ", href: "#faq", external: false },
                { label: t(translations.footer.loginLink, lang), href: LOGIN_URL, external: true },
                { label: t(translations.footer.becomePartner, lang), href: REGISTER_URL, external: true },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-sm text-white/45 hover:text-white/80 transition-colors cursor-pointer" data-testid={`link-footer-${item.label}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{t(translations.footer.support, lang)}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-[#0088CC] transition-colors" data-testid="link-footer-telegram">
                  <SiTelegram className="w-3.5 h-3.5" />
                  {t(translations.footer.telegramChat, lang)}
                </a>
              </li>
              <li>
                <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 hover:text-[#0088CC] transition-colors" data-testid="link-footer-telegram-channel">
                  <SiTelegram className="w-3.5 h-3.5" />
                  {t(translations.footer.ourChannel, lang)}
                </a>
              </li>
              <li>
                <a href="mailto:support@primetraff.com" className="text-sm text-white/45 hover:text-sky-400 transition-colors" data-testid="link-footer-email">
                  support@primetraff.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/35 text-xs">
            © 2026 PrimeTraff. {t(translations.footer.allRights, lang)}
          </div>
          <div className="flex items-center gap-4 text-xs text-white/35">
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer" data-testid="link-footer-privacy">{t(translations.footer.privacy, lang)}</a>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer" data-testid="link-footer-terms">{t(translations.footer.terms, lang)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  const { lang } = useLang();
  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t border-white/10 p-4 z-40 md:hidden" style={{ background: "rgba(0,16,48,0.9)" }}>
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block" data-testid="button-sticky-cta">
        <Button variant="outline" className="w-full border-white/30 text-white font-medium rounded-full">
          {t(translations.stickyCta.becomePartner, lang)}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </a>
    </div>
  );
}

function SpecialOfferPopup() {
  const { lang } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const showTimer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('offerDismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 20000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const endTime = localStorage.getItem('offerEndTime');
    let targetTime: number;
    
    if (endTime) {
      targetTime = parseInt(endTime);
    } else {
      targetTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('offerEndTime', targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('offerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,8,24,0.75)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-[420px] w-full overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgba(0,24,69,0.95) 0%, rgba(0,32,96,0.95) 50%, rgba(0,20,60,0.95) 100%)",
          borderRadius: "16px",
          border: "1px solid rgba(0,136,204,0.2)",
          boxShadow: "0 0 80px rgba(0,120,200,0.15), 0 25px 60px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(0,140,220,0.12) 0%, transparent 60%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.4), transparent)" }} />

        <div className="relative p-7 md:p-8">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
            data-testid="button-close-popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(0,140,220,0.12)", border: "1px solid rgba(0,140,220,0.2)" }}>
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-medium text-sky-300 tracking-wide uppercase">
                {t(translations.popup.specialOffer, lang)}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
              {t(translations.popup.hurryUp, lang)}
            </h3>
          </div>

          <div className="flex gap-2.5 mb-6">
            {[
              { value: timeLeft.days, label: t(translations.popup.days, lang) },
              { value: String(timeLeft.hours).padStart(2, '0'), label: t(translations.popup.hours, lang) },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: t(translations.popup.minutes, lang) },
              { value: String(timeLeft.seconds).padStart(2, '0'), label: t(translations.popup.seconds, lang) },
            ].map((item, i) => (
              <div key={i} className="flex-1 text-center py-3 rounded-lg" style={{ background: "rgba(0,120,200,0.08)", border: "1px solid rgba(0,120,200,0.15)" }}>
                <div className="text-xl md:text-2xl font-semibold text-white tabular-nums">{item.value}</div>
                <div className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-4 mb-6" style={{ background: "rgba(0,140,220,0.06)", border: "1px solid rgba(0,140,220,0.15)" }}>
            <p className="text-sm md:text-base text-white/80 text-center leading-relaxed">
              {t(translations.popup.bonusText, lang)}{" "}
              <span className="font-semibold text-white">200$</span>{" "}
              {t(translations.popup.bonusDesc, lang)}
            </p>
          </div>

          <a 
            href={REGISTER_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group"
            data-testid="button-popup-cta"
          >
            <div
              className="w-full text-center py-3.5 rounded-lg font-medium text-sm text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #0088CC 0%, #006AA8 100%)",
                border: "1px solid rgba(0,160,240,0.3)",
                boxShadow: "0 0 20px rgba(0,120,200,0.2)",
              }}
            >
              {t(translations.popup.becomePartner, lang)}
              <ArrowRight className="w-4 h-4 ml-1.5 inline-block" />
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollToTop() {
  const { lang } = useLang();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.2 }}
      onClick={scrollToTop}
      className="fixed bottom-28 md:bottom-8 right-6 z-50 w-12 h-12 text-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-sky-400/30 transition-colors"
      style={{ background: "rgba(0,136,204,0.7)" }}
      data-testid="button-scroll-to-top"
      aria-label={t(translations.scrollToTop, lang)}
    >
      <ChevronDown className="w-6 h-6 rotate-180" />
    </motion.button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen relative" style={{ background: "#001030" }}>
      <GridOverlay />
      <BlueBgDecorations />
      <SparkleParticles />
      <FloatingDots />
      <Suspense fallback={null}>
        <CrystalScene />
      </Suspense>
      <Navigation />
      <HeroSection />
      <GlowingDivider />
      <WaveDivider />
      <FeaturesSection />
      <GlowingDivider />
      <WaveDivider flip />
      <HowItWorksSection />
      <GlowingDivider />
      <WaveDivider />
      <PartnersSection />
      <GlowingDivider />
      <TestimonialsSection />
      <GlowingDivider />
      <WaveDivider flip />
      <FAQSection />
      <GlowingDivider />
      <WaveDivider flip />
      <CTASection />
      <Footer />
      <StickyCTA />
      <SpecialOfferPopup />
      <ScrollToTop />
    </div>
  );
}
