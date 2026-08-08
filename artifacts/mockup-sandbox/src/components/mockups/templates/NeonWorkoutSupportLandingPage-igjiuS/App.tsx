import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Dumbbell,
  MessageCircle,
  Mail,
  Instagram,
  Youtube,
  Twitter,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Send,
} from 'lucide-react';

const TOPICS = [
  { id: 'workout', label: 'Workout plans' },
  { id: 'billing', label: 'Billing & membership' },
  { id: 'tech', label: 'App not behaving' },
  { id: 'coach', label: 'Talk to a coach' },
  { id: 'partner', label: 'Partnerships' },
  { id: 'other', label: 'Something else' },
];

const FAQS = [
  {
    q: 'Can I pause my membership while traveling?',
    a: 'Yes — head to Settings → Membership → Pause. You can freeze for up to 3 months a year and your streak history stays intact.',
  },
  {
    q: 'Do I need any equipment for the programs?',
    a: 'Over 70% of our programs are bodyweight-only. The rest use a single pair of dumbbells or a resistance band, and every move has an equipment-free swap.',
  },
  {
    q: 'How fast do coaches reply to form-check videos?',
    a: 'Pro members get coach feedback within 12 hours, usually faster. Free members receive AI form analysis instantly.',
  },
  {
    q: 'Can my whole household use one account?',
    a: 'The Family plan covers up to 5 profiles with separate progress tracking, programs, and streaks for $14.99/mo total.',
  },
];

const CHANNELS = [
  {
    icon: MessageCircle,
    title: 'Live chat',
    detail: 'In-app, 6am–11pm ET',
    meta: 'Avg. reply 4 min',
    live: true,
  },
  {
    icon: Mail,
    title: 'Email us',
    detail: 'help@repset.fit',
    meta: 'Replies under 6 hrs',
    live: false,
  },
  {
    icon: Dumbbell,
    title: 'Coach hotline',
    detail: 'Pro members only',
    meta: 'Mon–Fri, 8am–6pm ET',
    live: false,
  },
];

export default function App() {
  const [topic, setTopic] = useState('workout');
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0E0B] text-[#F2F3EC] antialiased relative overflow-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,500;125,600;125,700;125,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-disp { font-family: 'Archivo', sans-serif; font-stretch: 125%; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .noise::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .input-line {
          background: transparent;
          border: none;
          border-bottom: 1px solid #2C2E27;
          padding: 14px 0;
          width: 100%;
          color: #F2F3EC;
          font-size: 15px;
          outline: none;
          transition: border-color .25s;
        }
        .input-line::placeholder { color: #5C5F54; }
        .input-line:focus { border-color: #D7FE3B; }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(215,254,59,.5); }
          50% { box-shadow: 0 0 0 6px rgba(215,254,59,0); }
        }
        .live-dot { animation: pulse-dot 2s infinite; }
        .marquee { animation: scroll 22s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::selection { background: #D7FE3B; color: #0D0E0B; }
      `,
        }}
      />
      <div className="noise" />

      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#21231D]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D7FE3B] flex items-center justify-center rounded-[6px]">
            <Zap size={16} className="text-[#0D0E0B]" strokeWidth={2.6} />
          </div>
          <span className="font-disp font-800 text-lg tracking-tight" style={{ fontWeight: 800 }}>
            REPSET
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-body text-sm text-[#9DA194]">
          <a href="#" className="hover:text-[#F2F3EC] transition-colors">Programs</a>
          <a href="#" className="hover:text-[#F2F3EC] transition-colors">Coaches</a>
          <a href="#" className="hover:text-[#F2F3EC] transition-colors">Pricing</a>
          <a href="#" className="text-[#F2F3EC]">Contact</a>
        </nav>
        <button className="font-disp text-xs tracking-wide bg-[#D7FE3B] text-[#0D0E0B] px-5 py-2.5 rounded-full font-bold hover:bg-[#c4ec2a] transition-colors">
          START FREE
        </button>
      </header>

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 pt-14 md:pt-20 pb-24">
          {/* LEFT */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs tracking-[0.25em] text-[#D7FE3B] mb-6"
            >
              CONTACT / SUPPORT
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-disp leading-[0.95] tracking-tight"
              style={{ fontWeight: 800, fontSize: 'clamp(44px, 6vw, 84px)' }}
            >
              STUCK ON
              <br />
              <span className="text-[#D7FE3B]">A REP?</span>
              <br />
              WE'VE GOT
              <br />
              YOUR SPOT.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-body text-[#9DA194] mt-7 max-w-md leading-relaxed text-[15px]"
            >
              Whether your living-room burpees broke the app or you just need a
              program tweak, a real human (and former gym rat) answers every
              message. No ticket-number purgatory.
            </motion.p>

            {/* Channels */}
            <div className="mt-12 space-y-3">
              {CHANNELS.map((c, i) => (
                <motion.a
                  key={c.title}
                  href="#"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="group flex items-center justify-between border border-[#23251F] rounded-2xl px-5 py-4 hover:border-[#D7FE3B]/60 hover:bg-[#14150F] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#1A1C15] flex items-center justify-center group-hover:bg-[#D7FE3B] transition-colors">
                      <c.icon
                        size={18}
                        className="text-[#D7FE3B] group-hover:text-[#0D0E0B] transition-colors"
                      />
                    </div>
                    <div>
                      <div className="font-disp font-bold text-[15px] flex items-center gap-2">
                        {c.title}
                        {c.live && (
                          <span className="live-dot inline-block w-2 h-2 rounded-full bg-[#D7FE3B]" />
                        )}
                      </div>
                      <div className="font-body text-sm text-[#7E8276]">{c.detail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block font-mono text-[11px] text-[#5C5F54]">
                      {c.meta}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-[#5C5F54] group-hover:text-[#D7FE3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-px bg-[#23251F] rounded-2xl overflow-hidden"
            >
              {[
                ['4 min', 'median chat reply'],
                ['97%', 'issues solved first touch'],
                ['1.2M', 'home athletes supported'],
              ].map(([num, label]) => (
                <div key={label} className="bg-[#111309] px-5 py-6">
                  <div className="font-disp font-extrabold text-2xl text-[#D7FE3B]">{num}</div>
                  <div className="font-body text-xs text-[#7E8276] mt-1 leading-snug">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest text-[#5C5F54] mr-2">
                FIND US LIFTING ON
              </span>
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#2C2E27] flex items-center justify-center text-[#9DA194] hover:text-[#0D0E0B] hover:bg-[#D7FE3B] hover:border-[#D7FE3B] transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:sticky lg:top-10 self-start"
          >
            <div className="bg-[#15170F] border border-[#262921] rounded-3xl p-7 md:p-9 relative overflow-hidden">
              {/* corner accent */}
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#D7FE3B]/10 blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-disp font-extrabold text-2xl tracking-tight">
                        Drop us a set
                      </h2>
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-[#33362C] text-[#9DA194] flex items-center gap-1.5">
                        <Clock size={11} /> ~6 HR REPLY
                      </span>
                    </div>
                    <p className="font-body text-sm text-[#7E8276] mb-7">
                      Tell us what's up. We read everything — even the rants.
                    </p>

                    <label className="font-mono text-[10px] tracking-[0.2em] text-[#5C5F54] block mb-3">
                      WHAT'S THIS ABOUT?
                    </label>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {TOPICS.map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setTopic(t.id)}
                          className={`font-body text-[13px] px-3.5 py-1.5 rounded-full border transition-all ${
                            topic === t.id
                              ? 'bg-[#D7FE3B] border-[#D7FE3B] text-[#0D0E0B] font-semibold'
                              : 'border-[#33362C] text-[#9DA194] hover:border-[#5C5F54] hover:text-[#F2F3EC]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 font-body">
                      <input
                        className="input-line"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <input
                        className="input-line"
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <textarea
                      className="input-line font-body mt-4 resize-none"
                      rows={4}
                      placeholder={
                        topic === 'coach'
                          ? 'Which program are you on, and what would you like adjusted?'
                          : topic === 'tech'
                          ? 'What happened, and on which device? Screenshots help.'
                          : 'Give us the details…'
                      }
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />

                    <button
                      type="submit"
                      className="group mt-8 w-full bg-[#D7FE3B] text-[#0D0E0B] font-disp font-extrabold tracking-wide text-sm rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-[#c4ec2a] active:scale-[0.99] transition-all"
                    >
                      SEND MESSAGE
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="font-body text-[12px] text-[#5C5F54] text-center mt-4">
                      By sending, you agree we can email you back. That's it.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 mx-auto rounded-full bg-[#D7FE3B] flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 size={30} className="text-[#0D0E0B]" />
                    </motion.div>
                    <h3 className="font-disp font-extrabold text-2xl mb-2">Logged. Like a PR.</h3>
                    <p className="font-body text-sm text-[#9DA194] max-w-xs mx-auto leading-relaxed">
                      Your message is in the queue, {form.name.split(' ')[0] || 'athlete'}. Expect a
                      reply at <span className="text-[#D7FE3B]">{form.email}</span> within 6 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', email: '', message: '' });
                      }}
                      className="mt-8 font-body text-sm text-[#9DA194] underline underline-offset-4 hover:text-[#F2F3EC] transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h3 className="font-mono text-[11px] tracking-[0.25em] text-[#5C5F54] mb-4">
                BEFORE YOU TYPE — QUICK ANSWERS
              </h3>
              <div className="divide-y divide-[#23251F] border-y border-[#23251F]">
                {FAQS.map((f, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className="font-body text-[14px] font-medium text-[#D9DCD0] group-hover:text-[#D7FE3B] transition-colors pr-4">
                        {f.q}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-[#5C5F54] transition-transform duration-300 ${
                          openFaq === i ? 'rotate-180 text-[#D7FE3B]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="font-body text-[13px] text-[#8B8F82] leading-relaxed pb-5 pr-8">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Marquee footer */}
      <div className="relative z-10 border-t border-[#21231D] bg-[#D7FE3B] overflow-hidden py-3">
        <div className="marquee flex whitespace-nowrap font-disp font-extrabold text-[#0D0E0B] text-sm tracking-wide">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-6 flex items-center gap-6">
                  NO GYM. NO EXCUSES. <Zap size={14} fill="#0D0E0B" />
                  REPSET SUPPORT, 7 DAYS A WEEK <Zap size={14} fill="#0D0E0B" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <footer className="relative z-10 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-[12px] text-[#5C5F54]">
        <span>© 2025 Repset Labs, Inc. — Brooklyn, NY</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D7FE3B] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#D7FE3B] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#D7FE3B] transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
}