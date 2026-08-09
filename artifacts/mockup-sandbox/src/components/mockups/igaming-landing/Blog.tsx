import { useState } from 'react';
import { ArrowLeft, ArrowRight, Fingerprint, Send, X, Zap } from 'lucide-react';
import bgImage from './assets/dsb-bg.png';

/* ============================================================
   Design tokens — та же система, что и на главной
   ============================================================ */
const BLUE = '#3b82f6';
const FONT = "'Unbounded', sans-serif";
const TYPE = {
  micro:  'clamp(9px,  0.8vw, 11px)',
  small:  'clamp(11px, 1vw,   14px)',
};
const TRACK = '0.08em';
const PAD   = 'clamp(20px, 3vw, 48px)';

const CATEGORIES = ['Все', 'Основные понятия', 'Новичку', 'Источники трафика', 'iGaming Тренды', 'Новости'];

const ARTICLE = [
  'В арбитраже трафика все стремятся к одному результату — качественному FTD. Однако пути к этой цели бывают разными. Кто-то выстраивает грамотные воронки и прогревает аудиторию, а кто-то использует ботов, мультиаккаунты и подмену данных. Внешне такой трафик может выглядеть живым, но реальной ценности рекламодателю он не несёт.',
  'Невалидный трафик — это любые привлечённые «игроки», которые не совершают реальных действий: не депонируют повторно, не играют, а часто вообще не существуют. Основные признаки: аномально высокий CR при нулевом ретеншне, совпадающие паттерны поведения у разных аккаунтов, высокий процент дубликатов.',
  'Для веб-мастера работа с таким трафиком — короткая дорога к бану и потере выплат. Для рекламодателя — прямые убытки. Именно поэтому мы проверяем каждый источник до запуска и отслеживаем качество потока на всей дистанции.',
  'Если сомневаетесь в своём источнике — напишите менеджеру до запуска. Разобраться заранее всегда дешевле, чем терять выплату из-за несоответствия требованиям.',
];

const POSTS = [
  { cat: 'Основные понятия', date: '05.08.2026', hue: 220, flip: false, title: 'Невалидный трафик: как распознать и почему он опасен', excerpt: 'В арбитраже все стремятся к одному — качественному FTD. Но пути бывают разные: кто-то строит воронки и прогревает аудиторию, а кто-то использует ботов и мультиаккаунты. Разбираем, как отличить живой трафик от подделки.' },
  { cat: 'Основные понятия', date: '02.08.2026', hue: 200, flip: true, title: 'RevShare: доля от дохода вместо разовой выплаты', excerpt: 'Модель, при которой вы получаете процент от дохода привлечённого игрока — обычно от 20% до 70%. Считаем, когда RevShare выгоднее CPA и на что смотреть в условиях.' },
  { cat: 'Новичку', date: '28.07.2026', hue: 240, flip: false, title: 'Первый запуск в iGaming: пошаговый план без лишних потерь', excerpt: 'Как выбрать оффер, собрать связку и не слить бюджет на старте. Практический чек-лист для тех, кто заходит в вертикаль впервые.' },
  { cat: 'Источники трафика', date: '21.07.2026', hue: 190, flip: true, title: 'PWA-приложения в 2026: что изменилось и как лить дальше', excerpt: 'PWA остаётся одним из самых стабильных источников. Разбираем свежие требования сторов, настройку PUSH-уведомлений и рабочие подходы к креативам.' },
  { cat: 'iGaming Тренды', date: '14.07.2026', hue: 260, flip: false, title: 'Куда движется iGaming: тренды второй половины 2026', excerpt: 'Новые ГЕО, ужесточение регуляций и рост крипто-продуктов. Что это значит для веб-мастеров и на какие рынки смотреть уже сейчас.' },
  { cat: 'Новости', date: '07.07.2026', hue: 210, flip: true, title: 'PrimeTraff подключает новые ГЕО и офферы', excerpt: 'Расширяем список направлений: добавлены новые рынки Tier-1 и LatAm, обновлены условия по ряду топовых офферов. Детали — у вашего менеджера.' },
];

export function Blog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState('Все');
  const [openPost, setOpenPost] = useState<number | null>(null);

  const shown = activeCat === 'Все' ? POSTS : POSTS.filter(p => p.cat === activeCat);

  return (
    <div style={{ width: '100%', fontFamily: FONT }} className="bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;700;900&display=swap');
        ::-webkit-scrollbar { display: none; }
        .tip { position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translateX(-50%) translateY(4px); background: rgba(10,10,12,0.95); border: 1px solid rgba(59,130,246,0.5); color: #fff; font-size: 10px; letter-spacing: 0.12em; padding: 6px 12px; border-radius: 8px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .25s ease, transform .25s ease; }
        .tip-wrap:hover .tip { opacity: 1; transform: translateX(-50%) translateY(0); }
        .post-card { transition: border-color .35s ease, transform .35s ease, background .35s ease; }
        .post-card:hover { border-color: rgba(59,130,246,0.7) !important; background: rgba(59,130,246,0.08) !important; transform: translateY(-4px); }
      `}</style>

      {/* Шапка — как на главной, fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between" style={{ padding: `${PAD} ${PAD} 0` }}>
        <div className="flex items-center gap-2.5">
          <Zap className="w-6 h-6" style={{ color: BLUE }} fill="currentColor" />
          <div className="flex flex-col leading-none text-left">
            <span className="font-bold uppercase" style={{ fontSize: TYPE.small, letterSpacing: TRACK }}>PrimeTraff</span>
            <span className="uppercase text-zinc-400 mt-1" style={{ fontSize: TYPE.micro, letterSpacing: '0.25em', fontWeight: 300 }}>Affiliate Network</span>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 'clamp(16px, 2vw, 32px)' }}>
          <div className="font-bold" style={{ fontSize: TYPE.small, letterSpacing: TRACK }}>
            <span className="text-white cursor-pointer">RU</span>
            <span className="text-zinc-500 ml-2 cursor-pointer hover:text-white transition-colors">EN</span>
          </div>
          <button onClick={() => setMenuOpen(o => !o)} className="cursor-pointer bg-transparent border-none p-0">
            {menuOpen ? (
              <X className="text-white" style={{ width: 'clamp(28px, 2.5vw, 40px)', height: 'clamp(28px, 2.5vw, 40px)' }} strokeWidth={1.5} />
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

      {/* Затемнение при меню */}
      <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-30"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none', transition: 'opacity .5s ease' }} />

      {/* Бургер-меню */}
      <div className="fixed top-0 right-0 bottom-0 z-40 flex flex-col justify-center"
        style={{ width: 'clamp(340px, 42vw, 580px)', background: '#0a0a0c', borderLeft: '1px solid rgba(255,255,255,0.08)', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .5s cubic-bezier(.22,1,.36,1)', padding: `0 ${PAD}` }}>
        <nav className="flex flex-col items-end" style={{ gap: 'clamp(18px, 3vh, 28px)' }}>
          {['О нас', 'Аффилейтам', 'Рекламодателям', 'Связаться с нами', 'Блог', 'FAQ'].map(item => (
            <a key={item} href="#" className="uppercase text-white font-medium hover:opacity-60 transition-opacity"
              style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none', color: item === 'Блог' ? BLUE : undefined }}>
              {item}
            </a>
          ))}
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.25)', margin: 'clamp(10px, 2vh, 20px) 0' }} />
          {['Вход', 'Регистрация'].map(item => (
            <a key={item} href="#" className="uppercase text-white font-medium hover:opacity-60 transition-opacity"
              style={{ fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.1em', textDecoration: 'none' }}>
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* ===== BLOG ===== */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh', padding: `clamp(90px, 13vh, 150px) ${PAD} clamp(20px, 3vh, 32px)` }}>
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: 'hue-rotate(220deg) saturate(1.1)', opacity: 0.3 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/90" />
        </div>

        {openPost !== null && (() => { const p = POSTS[openPost]; return (
          <div className="relative z-10 w-full mx-auto" style={{ maxWidth: 1400 }}>
            <button onClick={() => setOpenPost(null)} className="flex items-center gap-2 uppercase text-zinc-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              style={{ fontFamily: FONT, fontSize: 'clamp(10px, 0.95vw, 13px)', letterSpacing: '0.15em', marginBottom: 'clamp(24px, 4vh, 44px)', padding: 0 }}>
              <ArrowLeft className="w-4 h-4" /> Назад в блог
            </button>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 5', marginBottom: 'clamp(28px, 4.5vh, 48px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={bgImage} alt="" className="w-full h-full object-cover" style={{ filter: `hue-rotate(${p.hue}deg) saturate(1.2)`, transform: 'scale(1.3)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <div className="absolute" style={{ left: 'clamp(18px, 2vw, 32px)', bottom: 'clamp(14px, 2vh, 24px)' }}>
                <span className="uppercase" style={{ color: BLUE, fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '0.18em', fontWeight: 500 }}>{p.cat}</span>
                <span className="text-zinc-400 ml-4" style={{ fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '0.1em' }}>{p.date}</span>
              </div>
            </div>
            <h1 className="uppercase font-black text-white" style={{ fontSize: 'clamp(22px, 2.8vw, 44px)', letterSpacing: '0.02em', lineHeight: 1.25, marginBottom: 'clamp(24px, 4vh, 44px)' }}>
              {p.title}
            </h1>
            {ARTICLE.map((par, i) => (
              <p key={i} className="text-zinc-300" style={{ fontSize: 'clamp(12px, 1.05vw, 15px)', lineHeight: 1.9, fontWeight: 300, marginBottom: 'clamp(16px, 2.4vh, 26px)' }}>{par}</p>
            ))}
            <div className="flex" style={{ marginTop: 'clamp(28px, 4.5vh, 48px)' }}>
              <button onClick={() => setOpenPost(null)} className="flex items-center gap-3 border-b border-white/30 pb-2 hover:border-white transition-colors duration-500 group bg-transparent cursor-pointer">
                <span className="uppercase font-medium text-white" style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.15em' }}>Все статьи</span>
                <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-500" />
              </button>
            </div>
          </div>
        ); })()}

        {openPost === null && (<>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            Полезные материалы
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em', marginBottom: 'clamp(28px, 4.5vh, 52px)' }}>
            Блог
          </div>

          {/* Категории */}
          <div className="flex flex-wrap justify-center" style={{ gap: 'clamp(8px, 1vw, 14px)', marginBottom: 'clamp(32px, 5vh, 56px)' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className="uppercase cursor-pointer rounded-full transition-colors"
                style={{
                  fontFamily: FONT, fontSize: 'clamp(9px, 0.9vw, 12px)', letterSpacing: '0.1em', padding: '10px 22px',
                  background: activeCat === cat ? '#2563eb' : 'rgba(255,255,255,0.05)',
                  border: activeCat === cat ? '1px solid #2563eb' : '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка статей */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto" style={{ gap: 'clamp(16px, 1.8vw, 28px)', maxWidth: 1400 }}>
          {shown.map(p => (
            <a key={p.title} href="#" onClick={e => { e.preventDefault(); setOpenPost(POSTS.indexOf(p)); }} className="post-card flex flex-col text-left rounded-2xl no-underline overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: 0, textDecoration: 'none' }}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 8' }}>
                <img src={bgImage} alt="" className="w-full h-full object-cover"
                  style={{ filter: `hue-rotate(${p.hue}deg) saturate(1.2) contrast(1.05)`, transform: `scale(1.4) rotate(${p.flip ? 180 : 0}deg)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                <div className="absolute flex items-center justify-center rounded-full"
                  style={{ left: 16, bottom: 12, width: 34, height: 34, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(59,130,246,0.6)', backdropFilter: 'blur(6px)' }}>
                  <Zap style={{ width: 15, height: 15, color: BLUE }} fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col flex-1" style={{ padding: 'clamp(20px, 2vw, 30px)' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(14px, 2vh, 22px)' }}>
                <span className="uppercase" style={{ color: BLUE, fontSize: 'clamp(8px, 0.75vw, 10px)', letterSpacing: '0.15em', fontWeight: 500 }}>{p.cat}</span>
                <span className="text-zinc-500" style={{ fontSize: 'clamp(8px, 0.75vw, 10px)', letterSpacing: '0.1em' }}>{p.date}</span>
              </div>
              <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(13px, 1.25vw, 18px)', letterSpacing: '0.04em', lineHeight: 1.45, marginBottom: 'clamp(12px, 1.8vh, 18px)' }}>
                {p.title}
              </div>
              <div className="text-zinc-400 flex-1" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: 1.75, fontWeight: 300 }}>
                {p.excerpt}
              </div>
              <div className="flex items-center gap-2 uppercase text-white" style={{ fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '0.15em', marginTop: 'clamp(16px, 2.4vh, 26px)', fontWeight: 500 }}>
                Читать <ArrowRight className="w-4 h-4" />
              </div>
              </div>
            </a>
          ))}
        </div>
        </>)}

        {/* Футер */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(48px, 7vh, 84px)' }}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              {[{ Icon: Send, tip: 'Наш канал' }, { Icon: Fingerprint, tip: 'Уникализатор' }].map(({ Icon, tip }) => (
                <div key={tip} className="tip-wrap relative">
                  <div className="rounded-full flex items-center justify-center text-white cursor-pointer hover:border-blue-500 transition-colors" style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                    <Icon style={{ width: 20, height: 20 }} strokeWidth={1.8} />
                  </div>
                  <span className="tip uppercase" style={{ fontFamily: FONT }}>{tip}</span>
                </div>
              ))}
            </div>
            <button className="rounded-full border border-white/20 bg-white/5 text-white uppercase cursor-pointer"
              style={{ fontFamily: FONT, fontSize: 'clamp(11px, 1vw, 14px)', letterSpacing: '0.12em', padding: '14px 36px' }}>
              Support
            </button>
          </div>
          <div className="text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
