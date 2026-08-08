import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Quote, TrendingUp, Shield, Zap } from 'lucide-react';

const NEON = '#CCFF00';
const NEON_DIM = 'rgba(204,255,0,0.55)';

const testimonials = [
  {
    n: '01',
    quote:
      'We moved $40M of treasury into Vanguard Protocol in the first week. The audits held. The yields held. Our conviction held.',
    name: 'Mara Ellison',
    role: 'Head of Treasury, Lattice Capital',
    metric: '+18.4%',
    metricLabel: 'Net APY, 90 days',
  },
  {
    n: '02',
    quote:
      'Every protocol promises composability. Vanguard is the first one where I integrated in an afternoon and slept that night.',
    name: 'Theo Brandt',
    role: 'Lead Engineer, Helios DAO',
    metric: '4 hrs',
    metricLabel: 'Time to integration',
  },
  {
    n: '03',
    quote:
      "Through two market drawdowns, the vaults didn't blink. That's not luck — that's architecture.",
    name: 'Ines Okafor',
    role: 'Risk Officer, Northbeam Fund',
    metric: '0',
    metricLabel: 'Liquidation events',
  },
];

const stats = [
  { value: '$2.1B', label: 'Total value locked since launch' },
  { value: '94,000', label: 'Wallets onboarded in 60 days' },
  { value: '3', label: 'Independent audits — Trail of Bits, Zellic, Spearbit' },
  { value: '99.99%', label: 'Vault uptime across all chains' },
];

export default function App() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex justify-center py-10 px-4 font-body antialiased">
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .rule { height: 1px; background: rgba(255,255,255,0.12); }
        .rule-neon { height: 1px; background: ${NEON}; }

        .neon-text { color: ${NEON}; }

        .dropcap::first-letter {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          float: left;
          font-size: 4.6rem;
          line-height: 0.78;
          padding-right: 14px;
          padding-top: 6px;
          color: ${NEON};
        }

        .ticker { display: flex; gap: 0; white-space: nowrap; animation: tick 28s linear infinite; }
        @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .cta-btn { transition: all .25s cubic-bezier(.2,.8,.2,1); }
        .cta-btn:hover { background: ${NEON}; color: #0a0a0a; letter-spacing: 0.08em; }
        .cta-btn:hover .cta-icon { transform: translate(3px,-3px); }
        .cta-icon { transition: transform .25s ease; }

        .testi-tab { transition: all .2s ease; }
        .testi-tab:hover { color: #fff; }

        .stat-cell { transition: background .3s ease; }
        .stat-cell:hover { background: rgba(204,255,0,0.04); }

        ::selection { background: ${NEON}; color: #0a0a0a; }
      `,
        }}
      />
      <div className="grain" />

      {/* EMAIL CONTAINER */}
      <div className="w-full max-w-[680px] bg-[#101010] border border-white/10 relative overflow-hidden">
        {/* top neon edge */}
        <div className="h-[3px] w-full" style={{ background: NEON }} />

        {/* ====== MASTHEAD ====== */}
        <div className="px-8 sm:px-12 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rotate-45"
                style={{ background: NEON }}
              />
              <span className="font-mono text-[13px] tracking-[0.25em] text-white uppercase">
                Vanguard
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Dispatch № 07 — The Proof Issue
            </span>
          </div>
          <div className="rule mt-6" />
          <div className="flex justify-between mt-2 font-mono text-[10px] tracking-[0.15em] text-white/35 uppercase">
            <span>Mainnet · Ethereum / Base / Arbitrum</span>
            <span>March 2025</span>
          </div>
        </div>

        {/* ====== HERO HEADLINE ====== */}
        <div className="px-8 sm:px-12 pt-10 pb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] tracking-[0.3em] uppercase neon-text mb-6"
          >
            They said it couldn't hold. It held.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display text-white leading-[1.02]"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', fontWeight: 400 }}
          >
            Sixty days on
            <br />
            mainnet.{' '}
            <em className="not-italic" style={{ color: NEON, fontStyle: 'italic', fontWeight: 300 }}>
              Two billion
            </em>
            <br />
            in conviction.
          </motion.h1>

          <div className="grid grid-cols-12 gap-6 mt-10">
            <div className="col-span-12 sm:col-span-7">
              <p className="dropcap text-white/70 text-[15px] leading-[1.75]">
                Vanguard Protocol launched into the hardest market in three
                years. No incentives bribery. No mercenary liquidity. Just
                vaults engineered to endure — and the people bold enough to
                trust them first. This issue belongs to them. These are their
                words, their numbers, their proof.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-5 sm:border-l border-white/10 sm:pl-6 flex flex-col justify-end gap-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                In this dispatch
              </div>
              {['Three voices from the frontier', 'The numbers that survived', 'Your seat at the vault'].map(
                (item, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px]" style={{ color: NEON }}>
                      0{i + 1}
                    </span>
                    <span className="text-[13px] text-white/75 leading-snug">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ====== TICKER ====== */}
        <div className="border-y border-white/10 py-3 overflow-hidden bg-[#0c0c0c]">
          <div className="ticker font-mono text-[11px] tracking-[0.15em] uppercase">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0">
                {[
                  '$2.1B TVL',
                  '94,000 wallets',
                  '0 liquidation events',
                  '3 audits passed',
                  '18.4% net APY',
                  '99.99% uptime',
                ].map((t, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-white/60 px-6">{t}</span>
                    <span style={{ color: NEON }}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ====== TESTIMONIAL FEATURE ====== */}
        <div className="px-8 sm:px-12 pt-12 pb-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-white text-[26px] font-light italic">
              Voices from the frontier
            </h2>
            <Quote size={20} style={{ color: NEON }} strokeWidth={1.5} />
          </div>

          {/* tabs */}
          <div className="flex gap-6 border-b border-white/10 mb-8">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`testi-tab pb-3 font-mono text-[11px] tracking-[0.2em] uppercase relative ${
                  active === i ? 'text-white' : 'text-white/35'
                }`}
              >
                {t.n} — {t.name.split(' ')[0]}
                {active === i && (
                  <motion.div
                    layoutId="tabline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px]"
                    style={{ background: NEON }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-12 gap-6 pb-10"
          >
            <div className="col-span-12 sm:col-span-8">
              <p className="font-display text-white text-[24px] sm:text-[27px] leading-[1.35] font-light">
                “{testimonials[active].quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-[1px]" style={{ background: NEON }} />
                <div>
                  <div className="text-white text-[14px] font-medium">
                    {testimonials[active].name}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 mt-0.5">
                    {testimonials[active].role}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-4 sm:border-l border-white/10 sm:pl-6 flex sm:flex-col items-end sm:items-start justify-between sm:justify-end gap-2">
              <div
                className="font-display font-light"
                style={{ color: NEON, fontSize: '3rem', lineHeight: 1 }}
              >
                {testimonials[active].metric}
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 text-right sm:text-left">
                {testimonials[active].metricLabel}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ====== STATS GRID ====== */}
        <div className="px-8 sm:px-12 pb-12">
          <div className="rule-neon mb-px" />
          <div className="grid grid-cols-2 border border-white/10">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`stat-cell p-6 ${i % 2 === 0 ? 'border-r border-white/10' : ''} ${
                  i < 2 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="font-display text-white text-[30px] font-light leading-none">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 mt-3 leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ====== EDITOR'S NOTE / CTA ====== */}
        <div className="bg-[#0c0c0c] border-t border-white/10 px-8 sm:px-12 py-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 sm:col-span-5">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                From the founders
              </div>
              <p className="font-display italic text-white/85 text-[19px] leading-[1.5] font-light">
                “Courage isn't the absence of risk. It's risk, measured,
                audited, and faced head-on.”
              </p>
            </div>
            <div className="col-span-12 sm:col-span-7 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-3">
                {[
                  { icon: Shield, text: 'Triple-audited vault architecture, formally verified core' },
                  { icon: TrendingUp, text: 'Real yield from real flow — no emissions treadmill' },
                  { icon: Zap, text: 'One deposit, three chains, zero bridges to babysit' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <f.icon size={15} style={{ color: NEON }} strokeWidth={1.75} />
                    <span className="text-[13px] text-white/65">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="cta-btn flex-1 flex items-center justify-between border px-5 py-4 font-mono text-[11px] tracking-[0.2em] uppercase"
                  style={{ borderColor: NEON, color: NEON }}
                >
                  Open your first vault
                  <ArrowUpRight size={15} className="cta-icon" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-5 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white border border-white/15 hover:border-white/40 transition-colors"
                >
                  Read the audits
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ====== FOOTER ====== */}
        <div className="px-8 sm:px-12 py-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rotate-45" style={{ background: NEON_DIM }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
                Vanguard Protocol
              </span>
            </div>
            <div className="flex gap-5 font-mono text-[10px] tracking-[0.15em] uppercase text-white/40">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Governance</a>
              <a href="#" className="hover:text-white transition-colors">X</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
          <p className="font-mono text-[9px] leading-relaxed text-white/25 tracking-wide">
            You're receiving this dispatch because you joined the Vanguard waitlist or hold a
            governance position. Nothing here is financial advice — it's evidence. Digital assets
            carry risk; only the determined apply. Unsubscribe · Manage preferences · Vanguard Labs,
            Zug, Switzerland.
          </p>
        </div>

        <div className="h-[3px] w-full" style={{ background: NEON }} />
      </div>
    </div>
  );
}