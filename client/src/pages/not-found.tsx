import { useLocation } from 'wouter';
import { FONT, BLUE, PAD } from '@/components/nav-header';

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      fontFamily: FONT,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `0 ${PAD}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 404 number */}
      <div style={{
        fontSize: 'clamp(120px, 20vw, 240px)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: 'rgba(255,255,255,0.04)',
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        404
      </div>

      {/* content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(10px, 1vw, 13px)',
          letterSpacing: '0.35em',
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 300,
          marginBottom: 'clamp(16px, 2.5vh, 28px)',
          textTransform: 'uppercase',
        }}>
          Primetraff.com
        </div>

        <div style={{
          fontSize: 'clamp(36px, 6vw, 80px)',
          fontWeight: 900,
          letterSpacing: '0.04em',
          color: '#fff',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 'clamp(16px, 2.5vh, 28px)',
        }}>
          Страница<br />
          <span style={{ color: BLUE }}>не найдена</span>
        </div>

        <div style={{
          fontSize: 'clamp(11px, 1vw, 14px)',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 'clamp(32px, 5vh, 56px)',
          textTransform: 'uppercase',
        }}>
          Такой страницы не существует
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(59,130,246,0.5)',
            color: '#fff',
            fontFamily: FONT,
            fontSize: 'clamp(10px, 0.9vw, 13px)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '14px 36px',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = BLUE;
            e.currentTarget.style.color = BLUE;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
            e.currentTarget.style.color = '#fff';
          }}
        >
          На главную
        </button>
      </div>
    </div>
  );
}
