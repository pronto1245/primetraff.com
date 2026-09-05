import { useState, useEffect } from 'react';
import { FONT, BLUE } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const STORAGE_KEY = 'pt_cookie_accepted';

export function CookieConsent() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
    // Активируем Google Analytics после согласия
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-consent-bar"
      style={{
        position: 'fixed',
        bottom: 'clamp(18px, 3vh, 28px)',
        left: 'calc(clamp(20px, 3vw, 48px) + 144px)',
        right: 'calc(clamp(20px, 3vw, 48px) + 180px)',
        zIndex: 9999,
        width: 'auto',
        height: 48,
        boxSizing: 'border-box',
        background: 'rgba(8, 8, 12, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 9999,
        padding: '9px 14px',
        fontFamily: FONT,
        animation: 'cookie-in 0.4s cubic-bezier(0.16,1,0.3,1) both',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(10px, 2vw, 28px)',
      }}
    >
      <style>{`
        @keyframes cookie-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .cookie-consent-bar {
            left: calc(clamp(20px, 3vw, 48px) + 140px) !important;
            right: calc(clamp(20px, 3vw, 48px) + 176px) !important;
            width: auto !important;
            padding: 7px 9px !important;
            gap: 6px !important;
          }
          .cookie-consent-description {
            display: none !important;
          }
          .cookie-consent-title {
            display: block !important;
            font-size: 7px !important;
            letter-spacing: 0.02em !important;
          }
          .cookie-consent-divider {
            margin-bottom: 3px !important;
          }
          .cookie-consent-button {
            font-size: 8px !important;
            letter-spacing: 0.06em !important;
            padding: 3px 0 !important;
          }
        }
      `}</style>

      {/* Title */}
      <div className="cookie-consent-title" style={{
        fontSize: 'clamp(8px, 0.75vw, 10px)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: '#fff',
        marginBottom: 0,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {lang === 'ru' ? 'Мы используем cookies' : 'We use cookies'}
      </div>

      {/* Description */}
      <div className="cookie-consent-description" style={{
        fontSize: 'clamp(7px, 0.65vw, 9px)',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.6,
        letterSpacing: '0.02em',
        marginBottom: 0,
        display: 'block',
        whiteSpace: 'nowrap',
      }}>
        {lang === 'ru'
          ? 'Для удобства пользования сайтом и улучшения качества работы сервиса.'
          : 'To improve your experience and the quality of our service.'}
      </div>

      {/* Divider */}
      <div className="cookie-consent-divider" style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

      {/* Button */}
      <button
        className="cookie-consent-button"
        onClick={accept}
        style={{
          width: 'auto',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: FONT,
          fontSize: 'clamp(10px, 0.9vw, 12px)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: '#fff',
          textTransform: 'uppercase',
          padding: '4px 0',
          transition: 'color 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
      >
        {lang === 'ru' ? 'Принять' : 'Accept'}
      </button>
    </div>
  );
}
