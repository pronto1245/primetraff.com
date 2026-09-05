import { useState, useEffect } from 'react';
import { FONT, BLUE } from '@/components/nav-header';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const STORAGE_KEY = 'pt_cookie_accepted';

export function CookieConsent() {
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
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(440px, 38vw)',
        background: 'rgba(8, 8, 12, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 0,
        padding: '12px 16px',
        fontFamily: FONT,
        animation: 'cookie-in 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <style>{`
        @keyframes cookie-in {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 767px) {
          .cookie-consent-bar {
            width: 132px !important;
            padding: 8px 10px !important;
          }
          .cookie-consent-description {
            display: none;
          }
          .cookie-consent-title {
            font-size: 8px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 4px !important;
            text-align: center;
          }
          .cookie-consent-divider {
            margin-bottom: 3px !important;
          }
          .cookie-consent-button {
            font-size: 8px !important;
            letter-spacing: 0.1em !important;
            padding: 3px 0 !important;
          }
        }
      `}</style>

      {/* Title */}
      <div className="cookie-consent-title" style={{
        fontSize: 'clamp(11px, 1vw, 13px)',
        fontWeight: 700,
        letterSpacing: '0.18em',
        color: '#fff',
        marginBottom: 10,
        textTransform: 'uppercase',
      }}>
        Мы используем cookies
      </div>

      {/* Description */}
      <div className="cookie-consent-description" style={{
        fontSize: 'clamp(10px, 0.85vw, 12px)',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.6,
        letterSpacing: '0.04em',
        marginBottom: 20,
      }}>
        Для удобства пользования сайтом и улучшения качества работы сервиса.
      </div>

      {/* Divider */}
      <div className="cookie-consent-divider" style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 8 }} />

      {/* Button */}
      <button
        className="cookie-consent-button"
        onClick={accept}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: FONT,
          fontSize: 'clamp(10px, 0.9vw, 12px)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: '#fff',
          textTransform: 'uppercase',
          padding: '10px 0',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
      >
        Принято
      </button>
    </div>
  );
}
