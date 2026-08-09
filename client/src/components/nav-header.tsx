import { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useLang } from '@/lib/language-context';
import ptLogo from '@/assets/pt-logo.webp';

/* ============================================================
   Shared design tokens
   ============================================================ */
export const BLUE = '#3b82f6';
export const FONT = "'Unbounded', sans-serif";
export const TYPE = {
  micro: 'clamp(9px,  0.8vw, 11px)',
  small: 'clamp(11px, 1vw,   14px)',
  body:  'clamp(12px, 1.15vw,16px)',
  accent:'clamp(13px, 1.6vw, 22px)',
};
export const TRACK = '0.08em';
export const PAD   = 'clamp(20px, 3vw, 48px)';

const REGISTER_URL = 'https://primetrack.pro/register?ref=ADV-3BT52V85';
const LOGIN_URL    = 'https://primetrack.pro/login';
const SUPPORT_URL  = 'https://t.me/primetrack_support_bot';

type ActivePage = 'home' | 'affiliates' | 'advertisers' | 'blog' | null;

interface NavHeaderProps {
  activePage?: ActivePage;
}

export function NavHeader({ activePage }: NavHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLang();
  const [, navigate] = useLocation();

  const close = () => setMenuOpen(false);

  const NAV_ITEMS: { label: string; href: string; page?: ActivePage; external?: boolean }[] = [
    { label: lang === 'ru' ? 'О нас' : 'About', href: '/', page: 'home' },
    { label: lang === 'ru' ? 'Аффилейтам' : 'Affiliates', href: '/affiliates', page: 'affiliates' },
    { label: lang === 'ru' ? 'Рекламодателям' : 'Advertisers', href: '/advertisers', page: 'advertisers' },
    { label: lang === 'ru' ? 'Связаться' : 'Contact', href: '/affiliates#contact' },
    { label: lang === 'ru' ? 'Блог' : 'Blog', href: '/blog', page: 'blog' },
  ];

  return (
    <>
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: `clamp(12px,1.5vh,18px) ${PAD}`,
          fontFamily: FONT,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          willChange: 'transform',
        }}
      >
        <Link href="/" onClick={close}>
          <img
            src={ptLogo}
            alt="PrimeTraff.com"
            style={{ height: 'clamp(34px, 3.2vw, 46px)', width: 'auto', cursor: 'pointer' }}
          />
        </Link>
        <div className="flex items-center" style={{ gap: 'clamp(16px, 2vw, 32px)' }}>
          <div className="font-bold" style={{ fontSize: TYPE.small, letterSpacing: TRACK }}>
            <button
              onClick={() => lang !== 'ru' && toggleLang()}
              className="cursor-pointer bg-transparent border-none p-0 transition-colors"
              style={{ color: lang === 'ru' ? '#fff' : '#71717a' }}
            >
              RU
            </button>
            <button
              onClick={() => lang !== 'en' && toggleLang()}
              className="cursor-pointer bg-transparent border-none p-0 ml-2 transition-colors"
              style={{ color: lang === 'en' ? '#fff' : '#71717a' }}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            {menuOpen ? (
              <X
                className="text-white"
                style={{ width: 'clamp(28px, 2.5vw, 40px)', height: 'clamp(28px, 2.5vw, 40px)' }}
                strokeWidth={1.5}
              />
            ) : (
              <span className="flex flex-col gap-[6px]">
                <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
                <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
                <span className="block h-[2px] bg-white" style={{ width: 'clamp(28px, 2.5vw, 40px)' }} />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={close}
        className="fixed inset-0 z-30"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity .5s ease, visibility .5s ease',
        }}
      />

      {/* Side menu panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-40 flex flex-col justify-center"
        style={{
          width: 'min(580px, 100vw)',
          background: '#0a0a0c',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
          padding: `0 ${PAD}`,
          fontFamily: FONT,
        }}
      >
        <nav className="flex flex-col items-end" style={{ gap: 'clamp(18px, 3vh, 28px)' }}>
          {NAV_ITEMS.map(item => {
            const linkStyle = {
              fontSize: 'clamp(14px, 1.5vw, 20px)',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              color: (!item.external && item.page === activePage) ? BLUE : '#fff',
            };
            if (item.external) return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                onClick={close} className="uppercase font-medium hover:opacity-60 transition-opacity" style={linkStyle}>
                {item.label}
              </a>
            );
            return (
              <Link key={item.label} href={item.href} onClick={close}
                className="uppercase font-medium hover:opacity-60 transition-opacity" style={linkStyle}>
                {item.label}
              </Link>
            );
          })}
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.25)', margin: 'clamp(10px, 2vh, 20px) 0' }} />
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase font-medium hover:opacity-60 transition-opacity"
            style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none', color: '#fff' }}
          >
            {lang === 'ru' ? 'Вход' : 'Login'}
          </a>
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase font-medium hover:opacity-60 transition-opacity"
            style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none', color: '#fff' }}
          >
            {lang === 'ru' ? 'Регистрация' : 'Register'}
          </a>
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', margin: 'clamp(6px, 1vh, 12px) 0' }} />
          <a
            href="https://sizar.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 0,
                cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
                <img src="/sizar-logo.jpeg" alt="Sizar" style={{ width: '100%', height: 34, objectFit: 'contain', objectPosition: 'left center' }} />
                <div style={{ fontFamily: FONT, fontSize: 'clamp(9px, 0.8vw, 11px)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                  {lang === 'ru' ? 'Наш PWA‑сервис для арбитража' : 'Our PWA service for affiliates'}
                </div>
              </div>
            </div>
          </a>
        </nav>
      </div>
    </>
  );
}

/* ============================================================
   Shared fixed footer bar (Support + TG icons + copyright)
   ============================================================ */
import { Send, Fingerprint } from 'lucide-react';

export function FixedFooterBar() {
  const CHANNEL_URL    = 'https://t.me/prime_traf';
  const UNIQUALIZER_URL = 'https://t.me/primetraff_mediabot';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between pointer-events-none"
      style={{ padding: `0 ${PAD} max(clamp(18px, 2.5vh, 28px), env(safe-area-inset-bottom, 0px))`, fontFamily: FONT, willChange: 'transform' }}
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        {[
          { Icon: Send, tip: 'Наш канал', href: CHANNEL_URL },
          { Icon: Fingerprint, tip: 'Уникализатор', href: UNIQUALIZER_URL },
        ].map(({ Icon, tip, href }) => (
          <a
            key={tip}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="tip-wrap relative"
          >
            <div
              className="rounded-full flex items-center justify-center text-white cursor-pointer hover:border-blue-500 transition-colors"
              style={{
                width: 48, height: 48,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <Icon style={{ width: 20, height: 20 }} strokeWidth={1.8} />
            </div>
            <span className="tip uppercase" style={{ fontFamily: FONT }}>{tip}</span>
          </a>
        ))}
      </div>
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto rounded-full border border-white/20 bg-white/5 text-white uppercase cursor-pointer hover:bg-white/10 transition-colors"
        style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: '14px 36px', textDecoration: 'none' }}
      >
        Support
      </a>
    </div>
  );
}

export const SHARED_STYLES = `
  ::-webkit-scrollbar { display: none; }
  @keyframes hint-bounce { 0%, 100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(9px); opacity: 1; } }
  .scroll-hint svg { animation: hint-bounce 1.8s ease-in-out infinite; }
  html { scroll-snap-type: none; }
  section { scroll-snap-align: none; }
  @media (max-width: 640px) {
    .m-only { display: flex !important; }
    .m-hide { display: none !important; }
    .vh-section { height: auto !important; min-height: 100vh !important; }
    .row-desc { display: none !important; }
    .hero-words { font-size: 9px !important; letter-spacing: 0.14em !important; }
    .hero-corner { font-size: 9px !important; }
    .hero-corners { display: none !important; }
    .m-pad0 { padding-left: 0 !important; padding-right: 0 !important; }
    .m-title { font-size: 34px !important; }
    .m-sec { padding-bottom: 120px !important; }
  }
  .m-only { display: none; }
  .tip { position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translateX(-50%) translateY(4px); background: rgba(10,10,12,0.95); border: 1px solid rgba(59,130,246,0.5); color: #fff; font-size: 10px; letter-spacing: 0.12em; padding: 6px 12px; border-radius: 8px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .25s ease, transform .25s ease; }
  .tip-wrap:hover .tip { opacity: 1; transform: translateX(-50%) translateY(0); }
  .faq-scroll { overflow-y: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: rgba(59,130,246,0.6) rgba(255,255,255,0.06); }
  .faq-scroll::-webkit-scrollbar { display: block; width: 4px; }
  .faq-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.06); }
  .faq-scroll::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.6); border-radius: 2px; }
  .contact-row { position: relative; overflow: hidden; transition: background .35s ease; backdrop-filter: blur(2px); }
  .contact-row:hover { background: #2563eb; }
  .contact-row:hover span, .contact-row:hover .row-desc { color: #fff !important; }
`;
