import { useState, useEffect } from 'react';
import { FONT, BLUE } from '@/components/nav-header';

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
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(24px, 4vh, 40px)',
        right: 'clamp(16px, 3vw, 40px)',
        zIndex: 9999,
        width: 'clamp(280px, 28vw, 360px)',
        background: 'rgba(8, 8, 12, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 4,
        padding: 'clamp(20px, 2.5vh, 28px) clamp(20px, 2vw, 28px)',
        fontFamily: FONT,
        animation: 'cookie-in 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <style>{`
        @keyframes cookie-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Title */}
      <div style={{
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
      <div style={{
        fontSize: 'clamp(10px, 0.85vw, 12px)',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.6,
        letterSpacing: '0.04em',
        marginBottom: 20,
      }}>
        Для удобства пользования сайтом и улучшения качества работы сервиса.
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />

      {/* Button */}
      <button
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
