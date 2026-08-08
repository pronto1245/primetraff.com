import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, RefreshCw, Heart } from 'lucide-react';

const INK = '#0d0c0a';
const BONE = '#f2efe7';
const ASH = '#75726a';

const HERO_LINES = ['RAW.', 'UNEVEN.', 'UNSTOPPABLE.'];

const CAPTIONS = [
  'repost if your skin has survived more than your ex',
  'tag someone who glows louder than their flaws',
  'send this to the friend who never filters anything',
  'share if "perfect skin" was never the point',
  'repost if you healed in public, not in private',
];

export default function App() {
  const [typed, setTyped] = useState(['', '', '']);
  const [doneTyping, setDoneTyping] = useState(false);
  const [captionIdx, setCaptionIdx] = useState(0);
  const [backers, setBackers] = useState(4318);
  const [pledged, setPledged] = useState(false);
  const timeoutRef = useRef(null);

  // typewriter across the three lines
  useEffect(() => {
    let line = 0;
    let char = 0;
    const tick = () => {
      setTyped((prev) => {
        const next = [...prev];
        next[line] = HERO_LINES[line].slice(0, char + 1);
        return next;
      });
      char++;
      if (char >= HERO_LINES[line].length) {
        line++;
        char = 0;
        if (line >= HERO_LINES.length) {
          setDoneTyping(true);
          return;
        }
        timeoutRef.current = setTimeout(tick, 420);
      } else {
        timeoutRef.current = setTimeout(tick, 95);
      }
    };
    timeoutRef.current = setTimeout(tick, 700);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // slow backer drift
  useEffect(() => {
    const id = setInterval(() => {
      setBackers((b) => b + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeLine = typed.findIndex((t, i) => t.length < HERO_LINES[i].length);
  const caretLine = doneTyping ? 2 : activeLine === -1 ? 0 : activeLine;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: INK, color: BONE, fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Space+Grotesk:wght@300;400;500&family=Zen+Kaku+Gothic+New:wght@300&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes drawEnso { to { stroke-dashoffset: 0; } }
        @keyframes grainShift {
          0% { transform: translate(0,0); } 25% { transform: translate(-2%,1%); }
          50% { transform: translate(1%,-2%); } 75% { transform: translate(-1%,2%); } 100% { transform: translate(0,0); }
        }
        .grain::after {
          content: ''; position: absolute; inset: -10%; pointer-events: none; z-index: 50;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.07; animation: grainShift 0.9s steps(4) infinite;
        }
        .caret { display:inline-block; width: 0.07em; height: 0.78em; background: ${BONE}; margin-left: 0.04em; animation: blink 1s step-end infinite; vertical-align: baseline; }
        .enso-path { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: drawEnso 2.6s cubic-bezier(.6,.05,.2,1) 0.4s forwards; }
        .vert { writing-mode: vertical-rl; }
        .hero-line { font-family: 'Shippori Mincho', serif; font-weight: 800; font-size: 15vw; line-height: 0.8; letter-spacing: -0.035em; }
        .hover-fill { transition: background-color .35s, color .35s; }
        .hover-fill:hover { background-color: ${BONE}; color: ${INK}; }
        ::selection { background: ${BONE}; color: ${INK}; }
      `,
        }}
      />

      <div className="grain absolute inset-0" />

      {/* ENSŌ — imperfect circle, deliberately off-center */}
      <svg
        viewBox="0 0 500 500"
        className="absolute pointer-events-none"
        style={{ width: '62vw', maxWidth: 760, top: '-8vw', right: '-14vw', opacity: 0.55 }}
      >
        <path
          className="enso-path"
          d="M 310 80 C 180 50, 70 130, 75 250 C 80 380, 200 450, 310 430 C 410 412, 455 320, 440 230 C 428 158, 380 110, 335 95"
          fill="none"
          stroke={ASH}
          strokeWidth="14"
          strokeLinecap="round"
          style={{ filter: 'url(#rough)' }}
        />
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="9" />
        </filter>
      </svg>

      {/* TOP META BAR — asymmetric */}
      <header className="relative z-10 flex items-start justify-between px-6 pt-7 md:px-12">
        <div className="flex items-baseline gap-4">
          <span style={{ fontFamily: "'Shippori Mincho', serif" }} className="text-xl tracking-tight font-bold">
            KINTSU°
          </span>
          <span className="hidden md:inline text-[11px] uppercase tracking-[0.3em]" style={{ color: ASH }}>
            organic skincare for unfinished people
          </span>
        </div>
        <div className="text-right text-[11px] uppercase tracking-[0.25em] leading-relaxed" style={{ color: ASH }}>
          campaign nº 001
          <br />
          <span style={{ color: BONE }}>kickstarter — live</span>
        </div>
      </header>

      {/* VERTICAL JP — right edge */}
      <div
        className="vert absolute right-5 top-1/2 -translate-y-1/2 z-10 text-sm tracking-[0.6em] hidden md:block"
        style={{ color: ASH, fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
      >
        侘び寂び — 不完全の美
      </div>

      {/* HERO TYPE BLOCK */}
      <main className="relative z-10 px-6 md:px-12" style={{ marginTop: '9vh' }}>
        <p className="mb-5 text-[11px] md:text-xs uppercase tracking-[0.35em]" style={{ color: ASH }}>
          ↓ the meme your dermatologist doesn't want you to share
        </p>

        <h1 aria-label="Raw. Uneven. Unstoppable.">
          {HERO_LINES.map((line, i) => (
            <div
              key={line}
              className="hero-line"
              style={{
                marginLeft: i === 1 ? '8vw' : i === 2 ? '2vw' : 0,
                color: i === 1 ? ASH : BONE,
                minHeight: '0.8em',
              }}
            >
              {typed[i]}
              {caretLine === i && <span className="caret" />}
            </div>
          ))}
        </h1>

        {/* sub-statement, hung off-grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={doneTyping ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 md:mt-10 max-w-md md:ml-[8vw]"
        >
          <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: BONE }}>
            We make balms from cracked clay, cold-pressed weeds, and zero apologies.
            Your texture is not a problem to fix —{' '}
            <span style={{ borderBottom: `1px solid ${ASH}` }}>it's the proof you showed up.</span>
          </p>
        </motion.div>
      </main>

      {/* CAPTION REMIX STRIP — the meme mechanic */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={doneTyping ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="relative z-10 px-6 md:px-12 mt-14 md:mt-20"
      >
        <div
          className="flex flex-col md:flex-row md:items-stretch"
          style={{ borderTop: `1px solid ${ASH}40`, borderBottom: `1px solid ${ASH}40` }}
        >
          {/* caption */}
          <div className="flex-1 py-7 pr-6">
            <div className="text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: ASH }}>
              caption № {String(captionIdx + 1).padStart(2, '0')} / 05 — steal it
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={captionIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-3xl leading-snug"
                style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
              >
                “{CAPTIONS[captionIdx]}”
              </motion.p>
            </AnimatePresence>
          </div>

          {/* remix button */}
          <button
            onClick={() => setCaptionIdx((i) => (i + 1) % CAPTIONS.length)}
            className="hover-fill group flex items-center justify-center gap-3 px-8 py-7 md:py-0 text-xs uppercase tracking-[0.3em]"
            style={{ borderLeft: `1px solid ${ASH}40`, borderTop: `1px solid ${ASH}40`, color: BONE }}
          >
            <RefreshCw size={15} className="transition-transform duration-500 group-hover:rotate-180" />
            remix caption
          </button>
        </div>
      </motion.section>

      {/* FOOTER — funding bar + pledge */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={doneTyping ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="relative z-10 px-6 md:px-12 pt-10 pb-9 flex flex-col md:flex-row md:items-end gap-8 md:gap-0 md:justify-between"
      >
        <div className="flex gap-12 md:gap-16">
          <Stat label="funded" value="212%" />
          <Stat label="backers" value={backers.toLocaleString()} />
          <Stat label="days left" value="09" />
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setPledged((p) => !p)}
            className="group flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-300"
            style={{
              backgroundColor: pledged ? 'transparent' : BONE,
              color: pledged ? BONE : INK,
              border: `1px solid ${BONE}`,
            }}
          >
            {pledged ? (
              <>
                <Heart size={14} fill={BONE} /> you're a backer
              </>
            ) : (
              <>
                back the imperfect <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] hidden lg:block" style={{ color: ASH }}>
            ¥ wabi-sabi tier — from $24
          </span>
        </div>
      </motion.footer>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div
        className="text-3xl md:text-4xl"
        style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 700, lineHeight: 0.9 }}
      >
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.35em]" style={{ color: ASH }}>
        {label}
      </div>
    </div>
  );
}