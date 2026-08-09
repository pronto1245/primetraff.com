import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { NavHeader, FixedFooterBar, SHARED_STYLES, BLUE, FONT, TYPE, TRACK, PAD } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';
import { t, translations } from '@/lib/i18n';
import type { BlogPost } from '@shared/schema';
import bgImage from '@/assets/dsb-bg.webp';

const ALL_CATEGORIES = Object.keys(translations.blog.categories);

function getCatLabel(key: string, lang: 'ru' | 'en'): string {
  const cats = translations.blog.categories as Record<string, { ru: string; en: string }>;
  return cats[key]?.[lang] ?? key;
}

export default function BlogPage() {
  const { lang } = useLang();
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Seed individual post cache so opening a post is instant (no second API call)
  useEffect(() => {
    posts.forEach(post => {
      queryClient.setQueryData(['/api/blog', post.slug], post);
    });
  }, [posts, queryClient]);

  // Derive categories present in actual data
  const presentCats = ALL_CATEGORIES.filter(cat => posts.some(p => p.category === cat));

  const shown = activeCat === null
    ? posts
    : posts.filter(p => p.category === activeCat);

  // Skeleton items
  const skeletonItems = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{ width: '100%', fontFamily: FONT, background: 'transparent' }} className="text-white relative">
      <style>{`
        ${SHARED_STYLES}
        html { scroll-snap-type: none; }
        section, .snap-sec { scroll-snap-align: none; scroll-snap-stop: unset; }
        .post-card { transition: border-color .35s ease, transform .35s ease, background .35s ease; }
        .post-card:hover { border-color: rgba(59,130,246,0.7) !important; background: rgba(59,130,246,0.08) !important; transform: translateY(-4px); }
        .cat-btn { transition: background .25s, border-color .25s, color .25s; }
      `}</style>

      {/* Fixed full-page background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/dsb-bg-blue.webp" alt="" decoding="async" className="w-full h-full object-cover" style={{ opacity: 0.65 }} />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <NavHeader activePage="blog" />

      {/* ===== BLOG ===== */}
      {/* Bottom padding accounts for the fixed footer bar (~76px) so no card text is ever hidden behind it */}
      <section className="relative flex flex-col" style={{ minHeight: '100vh', padding: `clamp(90px, 13vh, 150px) ${PAD} clamp(140px, 16vh, 180px)` }}>
        {/* Background removed — now fixed above */}
        <div className="absolute inset-0 z-0 hidden" />

        {/* Title */}
        <div className="relative z-10 flex flex-col items-center text-center" style={{ marginBottom: 'clamp(28px, 4.5vh, 52px)' }}>
          <div className="uppercase text-zinc-400" style={{ fontSize: 'clamp(11px, 1.1vw, 15px)', letterSpacing: '0.35em', fontWeight: 300, marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            {t(translations.blog.headerLabel, lang)}
          </div>
          <div className="uppercase font-black text-white leading-none" style={{ fontSize: 'clamp(48px, 8.2vw, 118px)', letterSpacing: '0.02em', marginBottom: 'clamp(28px, 4.5vh, 52px)' }}>
            {t(translations.blog.title, lang)}
          </div>

          {/* Category filters */}
          {!isLoading && presentCats.length > 0 && (
            <div className="flex flex-wrap justify-center" style={{ gap: 'clamp(8px, 1vw, 14px)', marginBottom: 'clamp(12px, 2vh, 24px)' }}>
              <button
                onClick={() => setActiveCat(null)}
                className="cat-btn uppercase cursor-pointer rounded-full"
                style={{
                  fontFamily: FONT,
                  fontSize: 'clamp(9px, 0.9vw, 12px)',
                  letterSpacing: '0.1em',
                  padding: '10px 22px',
                  background: activeCat === null ? '#2563eb' : 'rgba(255,255,255,0.05)',
                  border: activeCat === null ? '1px solid #2563eb' : '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {t(translations.blog.allCategories, lang)}
              </button>
              {presentCats.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(activeCat === cat ? null : cat)}
                  className="cat-btn uppercase cursor-pointer rounded-full"
                  style={{
                    fontFamily: FONT,
                    fontSize: 'clamp(9px, 0.9vw, 12px)',
                    letterSpacing: '0.1em',
                    padding: '10px 22px',
                    background: activeCat === cat ? '#2563eb' : 'rgba(255,255,255,0.05)',
                    border: activeCat === cat ? '1px solid #2563eb' : '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  {getCatLabel(cat, lang)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto" style={{ gap: 'clamp(16px, 1.8vw, 28px)', maxWidth: 1400 }}>
          {isLoading
            ? skeletonItems.map(i => (
                <div key={i} className="post-card rounded-2xl overflow-hidden animate-pulse"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ aspectRatio: '16 / 8', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ padding: 'clamp(20px, 2vw, 30px)' }}>
                    <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '40%', marginBottom: 12 }} />
                    <div style={{ height: 16, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '80%', marginBottom: 8 }} />
                    <div style={{ height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '100%', marginBottom: 6 }} />
                    <div style={{ height: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 4, width: '70%' }} />
                  </div>
                </div>
              ))
            : shown.length === 0
            ? (
              <div className="col-span-3 text-center" style={{ padding: 'clamp(60px, 12vh, 120px) 0' }}>
                <p className="uppercase text-zinc-400" style={{ fontFamily: FONT, fontSize: TYPE.small, letterSpacing: '0.2em' }}>
                  {t(translations.blog.noPostsShort, lang)}
                </p>
              </div>
            )
            : shown.map(post => {
              const title   = lang === 'ru' ? post.titleRu   : post.titleEn;
              const excerpt = lang === 'ru' ? post.excerptRu : post.excerptEn;
              const catKey  = post.category ?? '';
              const catLabel = getCatLabel(catKey, lang);
              const dateStr = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                : '';

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block" style={{ textDecoration: 'none' }}>
                  <div className="post-card flex flex-col text-left rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                    {post.coverImage ? (
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 8' }}>
                        <img
                          src={post.coverImage}
                          alt={title}
                          className="w-full h-full object-cover"
                          style={{ transition: 'transform .4s ease' }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                      </div>
                    ) : (
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 8' }}>
                        <img src="/dsb-bg-blue.webp" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover"
                          style={{ transform: 'scale(1.4)' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1" style={{ padding: 'clamp(20px, 2vw, 30px)' }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(14px, 2vh, 22px)' }}>
                        <span className="uppercase" style={{ color: BLUE, fontSize: 'clamp(8px, 0.75vw, 10px)', letterSpacing: '0.15em', fontWeight: 500 }}>{catLabel}</span>
                        <span className="text-zinc-500" style={{ fontSize: 'clamp(8px, 0.75vw, 10px)', letterSpacing: '0.1em' }}>{dateStr}</span>
                      </div>
                      <div className="uppercase font-bold text-white" style={{ fontSize: 'clamp(13px, 1.25vw, 18px)', letterSpacing: '0.04em', lineHeight: 1.45, marginBottom: 'clamp(12px, 1.8vh, 18px)' }}>
                        {title}
                      </div>
                      <div className="text-zinc-400 flex-1" style={{ fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: 1.75, fontWeight: 300 }}>
                        {excerpt}
                      </div>
                      <div className="flex items-center gap-2 uppercase text-white" style={{ fontSize: 'clamp(9px, 0.85vw, 12px)', letterSpacing: '0.15em', marginTop: 'clamp(16px, 2.4vh, 26px)', fontWeight: 500 }}>
                        {t(translations.blog.readMore, lang)} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Footer bar */}
        <div className="relative z-10 w-full" style={{ marginTop: 'clamp(48px, 7vh, 84px)' }}>
          <FixedFooterBar />
          <div className="m-copy text-center text-zinc-500 uppercase" style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.1em', marginTop: 'clamp(16px, 2.5vh, 28px)' }}>
            © 2026. PRIMETRAFF.COM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </section>
    </div>
  );
}
