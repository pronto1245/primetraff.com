import { useState, useEffect } from 'react';
import { ArrowRight, Headphones, Send, UserRound } from 'lucide-react';
import { NavHeader, FixedFooterBar, SHARED_STYLES, BLUE, FONT, TYPE, TRACK, PAD } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';
import { t, translations } from '@/lib/i18n';
import bgImage from '@/assets/dsb-bg.webp';

const SUPPORT_URL  = 'https://t.me/primetrack_support_bot';
const CHANNEL_URL  = 'https://t.me/prime_traf';

const ScrollHint = () => (
  <div className="scroll-hint absolute left-1/2 z-20 pointer-events-none" style={{ bottom: 22, transform: 'translateX(-50%)' }}>
    <svg width="86" height="22" viewBox="0 0 86 22" fill="none">
      <path d="M2 2 L43 19 L84 2" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function AdvertisersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { lang } = useLang();

  const faqItems = translations.advertisersPage.faqItems;
  const reviews = translations.advertisersPage.reviews;

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-sec');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const marquees = entry.target.querySelectorAll('.adv-marquee, .contact-marquee-anim');
        marquees.forEach(m => m.classList.toggle('marquee-paused', !entry.isIntersecting));
      });
    }, { threshold: 0.05 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const CONTACTS = [
    { icon: Headphones, title: 'Support', desc: t(translations.advertisersPage.supportDesc, lang), href: SUPPORT_URL },
    { icon: UserRound, title: t(translations.advertisersPage.managerTitle, lang), desc: t(translations.advertisersPage.managerDesc, lang), href: SUPPORT_URL },
    { icon: Send, title: 'TG-Channel', desc: t(translations.advertisersPage.tgChannelDesc, lang), href: CHANNEL_URL },
  ];

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        ${SHARED_STYLES}
        html { scroll-snap-type: y proximity; }
        .snap-sec { scroll-snap-align: start; }
        .no-snap { scroll-snap-align: none; scroll-snap-stop: normal; }
        .faq-scroll { overscroll-behavior-y: contain; }
        @keyframes contact-marquee { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .contact-marquee-anim { display: inline-block; animation: contact-marquee 40s linear infinite; }
        @keyframes adv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .adv-marquee { display: flex; width: max-content; animation: adv-marquee 55s linear infinite; }
        .adv-marquee:hover { animation-play-state: paused; }
        .marquee-paused { animation-play-state: paused !important; }
        .contact-card:hover { border-color: rgba(255,255,255,0.28) !important; background: rgba(255,255,255,0.06) !important; transform: translateY(-4px); }
        .contact-card:hover > div:last-child { opacity: 1 !important; }
        @media (max-width: 768px) { .contact-card { grid-column: span 3; } }
        @media (max-width: 640px) {
          .adv-review-card { width: min(85vw, 300px) !important; }
        }
      `}</style>

      <NavHeader activePage="advertisers" />

      {/* ===== ADVERTISERS HERO ===== */}
      <section className="snap-sec m-sec relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', padding: `clamp(60px, 8vh, 100px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{  }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 38%, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.16) 45%, transparent 72%)' }} />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center w-full">
          <div className="relative" style={{ marginBottom: 'clamp(36px, 6vh, 64px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              Primetraff.com
            </div>
            <div className="m-title uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em' }}>
              Advertisers
            </div>
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(12px, 1.2vw, 17px)', letterSpacing: '0.06em', lineHeight: 1.9, fontWeight: 400, maxWidth: 1160 }}>
            {translations.advertisersPage.heroParas[lang].map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {/* CTA — Contact us */}
          <div className="w-full flex justify-center" style={{ marginTop: 'clamp(40px, 7vh, 72px)' }}>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-blue-500 pb-2 hover:border-blue-300 transition-colors duration-500 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(12px, 1.15vw, 16px)', letterSpacing: '0.15em' }}>
                {t(translations.advertisersPage.contactUs, lang)}
              </span>
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="snap-sec vh-section relative bg-black flex flex-col justify-between" style={{ height: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} 140px`, overflow: 'hidden' }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.35 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            {t(translations.advertisersPage.whyLabel, lang)}
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(22px, 3.5vh, 40px)' }}>
            {t(translations.advertisersPage.whyTitle, lang)}
          </div>
          <div className="uppercase text-white" style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', letterSpacing: '0.06em', lineHeight: 1.75, fontWeight: 400, maxWidth: 1160 }}>
            {translations.advertisersPage.whyParas[lang].map((para, i) => (
              <p key={i} style={i > 0 ? { marginTop: 'clamp(12px, 2vh, 20px)' } : undefined}>{para}</p>
            ))}
          </div>
          <div className="uppercase font-black text-white" style={{ fontSize: 'clamp(16px, 1.8vw, 26px)', letterSpacing: '0.06em', marginTop: 'clamp(64px, 10vh, 96px)', marginBottom: 'clamp(10px, 1.5vh, 16px)' }}>
            {t(translations.advertisersPage.reviewsTitle, lang)}
          </div>
        </div>

        {/* Reviews auto-scroll */}
        <div className="relative z-10 overflow-hidden" style={{ margin: `0 calc(-1 * ${PAD})` }}>
          <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(40px, 8vw, 140px)', background: 'linear-gradient(to right, #000, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: 'clamp(40px, 8vw, 140px)', background: 'linear-gradient(to left, #000, transparent)' }} />
          <div className="adv-marquee" style={{ gap: 'clamp(14px, 1.6vw, 24px)', padding: '4px 0' }}>
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="adv-review-card flex-shrink-0 rounded-2xl text-left"
                style={{ width: 'clamp(340px, 34vw, 520px)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(20px, 2vw, 30px)' }}>
                <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(13px, 1.2vw, 17px)', letterSpacing: TRACK, marginBottom: 'clamp(10px, 1.4vh, 16px)' }}>{t(r.name, lang)}</div>
                <div className="text-zinc-300" style={{ fontSize: 'clamp(11px, 0.95vw, 13px)', lineHeight: 1.7, fontWeight: 300 }}>{t(r.text, lang)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DISCUSS COOPERATION ===== */}
      <section className="snap-sec relative bg-black flex flex-col justify-between overflow-hidden" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
        <ScrollHint />
        <div className="absolute inset-0 z-0">
          <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90" />
        </div>
        <div className="absolute left-0 right-0 z-0 pointer-events-none overflow-hidden" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="contact-marquee-anim uppercase font-black whitespace-nowrap" style={{ fontSize: 'clamp(90px, 14vw, 220px)', letterSpacing: '0.02em', color: 'transparent', WebkitTextStroke: '1px rgba(59,130,246,0.22)', lineHeight: 1 }}>
            {t(translations.advertisersPage.contactMarquee, lang).repeat(6)}
          </div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center" style={{ marginBottom: 'clamp(20px, 2.5vh, 36px)' }}>
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              {t(translations.advertisersPage.contactLabel, lang)}
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em' }}>
              {t(translations.advertisersPage.contactTitle, lang)}
            </div>
          </div>

          {/* Contact cards */}
          <div className="w-full grid" style={{ maxWidth: 1100, gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(8px, 1vw, 16px)' }}>
            {CONTACTS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group relative overflow-hidden flex flex-col no-underline"
                style={{
                  padding: 'clamp(18px, 2.2vh, 28px) clamp(16px, 1.8vw, 28px)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 16,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  textDecoration: 'none',
                  transition: 'border-color .35s ease, background .35s ease, transform .35s ease',
                }}
              >
                <div className="flex-shrink-0 rounded-full flex items-center justify-center mb-3"
                  style={{ width: 'clamp(44px, 4vw, 60px)', height: 'clamp(44px, 4vw, 60px)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff' }}>
                  <c.icon style={{ width: '45%', height: '45%' }} strokeWidth={1.8} />
                </div>
                <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(14px, 1.5vw, 21px)', letterSpacing: '0.08em', marginBottom: 'clamp(8px, 1.2vh, 14px)' }}>
                  {c.title}
                </div>
                <div className="uppercase text-zinc-400 flex-1" style={{ fontSize: 'clamp(9px, 0.88vw, 12px)', letterSpacing: '0.06em', fontWeight: 300, lineHeight: 1.6 }}>
                  {c.desc}
                </div>
                <div className="flex items-center gap-2 mt-3" style={{ color: '#3b82f6' }}>
                  <span className="uppercase" style={{ fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.15em', fontWeight: 500 }}>
                    {t(translations.advertisersPage.go, lang)}
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 70%)', opacity: 0, transition: 'opacity .35s ease' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="no-snap relative bg-black flex flex-col justify-between" style={{ minHeight: '100vh', padding: `clamp(50px, 8vh, 90px) ${PAD} clamp(16px, 2.5vh, 28px)` }}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
              {t(translations.advertisersPage.faqLabel, lang)}
            </div>
            <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(30px, 4.4vw, 62px)', letterSpacing: '0.02em', marginBottom: 'clamp(32px, 5vh, 60px)' }}>
              {t(translations.advertisersPage.faqTitle, lang)}
            </div>
          </div>
          <div className="faq-scroll w-full" style={{ maxWidth: 1000, maxHeight: 'clamp(300px, 46vh, 430px)', overscrollBehaviorY: 'contain' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: i === faqItems.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left bg-transparent border-none cursor-pointer group"
                  style={{ gap: 'clamp(16px, 2vw, 28px)', padding: 'clamp(16px, 2.4vh, 26px) clamp(8px, 1vw, 16px)' }}
                >
                  <span className="font-black flex-shrink-0" style={{ color: openFaq === i ? BLUE : 'rgba(59,130,246,0.5)', fontSize: 'clamp(14px, 1.5vw, 20px)', width: 'clamp(34px, 3.4vw, 52px)', transition: 'color .3s' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="uppercase text-white font-medium flex-1" style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1.15vw, 16px)', letterSpacing: '0.06em', lineHeight: 1.5 }}>{t(item.q, lang)}</span>
                  <span className="flex-shrink-0 text-white" style={{ fontSize: 'clamp(18px, 1.8vw, 26px)', fontWeight: 300, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform .3s ease' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 400 : 0, overflow: 'hidden', transition: 'max-height .45s cubic-bezier(.22,1,.36,1)' }}>
                  <div className="text-zinc-300" style={{ fontSize: 'clamp(10px, 1vw, 14px)', lineHeight: 1.8, fontWeight: 300, letterSpacing: '0.03em', padding: `0 clamp(8px, 1vw, 16px) clamp(18px, 2.6vh, 28px) calc(clamp(34px, 3.4vw, 52px) + clamp(16px, 2vw, 28px))` }}>
                    {t(item.a, lang)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(20px, 3vh, 36px)' }}>
          <FixedFooterBar />
          <div className="m-copy text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
