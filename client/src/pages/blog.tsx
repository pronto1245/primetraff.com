import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";
import { ArrowRight, Languages, ArrowLeft, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import primeTraffLogo from "@assets/IMG_9022_1770529061025.png";

const CATEGORIES = [
  { key: "all", label: translations.blog.allCategories },
  { key: "basics", label: translations.blog.categories.basics },
  { key: "beginner", label: translations.blog.categories.beginner },
  { key: "traffic", label: translations.blog.categories.traffic },
  { key: "trends", label: translations.blog.categories.trends },
  { key: "news", label: translations.blog.categories.news },
];

function BlogNavigation() {
  const { lang, toggleLang } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#001a3a]/80 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 -ml-10" data-testid="link-blog-logo">
            <img src={primeTraffLogo} alt="PrimeTraff" className="h-44 w-auto" width={853} height={171} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/70 hover:text-white transition-colors" data-testid="link-blog-home">
              {lang === "ru" ? "Главная" : "Home"}
            </Link>
            <Link href="/blog" className="text-white transition-colors font-medium" data-testid="link-blog-blog">
              {t(translations.blog.nav, lang)}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 border border-white/20 bg-white/5 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors hover:border-white/30 hover:bg-white/10"
              data-testid="button-blog-lang-toggle"
            >
              <Languages className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/90 uppercase">{lang === "ru" ? "EN" : "RU"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function BlogPage() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
      <BlogNavigation />

      <div className="pt-24 lg:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3" data-testid="text-blog-title">
              {t(translations.blog.title, lang)}
            </h1>
            <p className="text-white/60 text-base lg:text-lg" data-testid="text-blog-subtitle">
              {t(translations.blog.subtitle, lang)}
            </p>
          </div>

          <div className="flex items-center justify-center mb-10 overflow-x-auto no-scrollbar">
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]" data-testid="blog-category-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "bg-[#0088CC]/20 text-sky-300 border border-sky-400/30"
                      : "text-white/50 hover:text-white/80 border border-transparent"
                  }`}
                  data-testid={`button-category-${cat.key}`}
                >
                  {t(cat.label, lang)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.03] animate-pulse">
                  <div className="h-48 bg-white/[0.05] rounded-t-xl" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-white/[0.05] rounded w-1/3" />
                    <div className="h-5 bg-white/[0.05] rounded w-3/4" />
                    <div className="h-4 bg-white/[0.05] rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg" data-testid="text-no-posts">{t(translations.blog.noPosts, lang)}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const title = lang === "ru" ? post.titleRu : post.titleEn;
                const excerpt = lang === "ru" ? post.excerptRu : post.excerptEn;
                const catLabel = CATEGORIES.find(c => c.key === post.category);

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                    data-testid={`card-blog-post-${post.slug}`}
                  >
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden transition-all duration-300 group-hover:border-sky-400/20 group-hover:bg-white/[0.05]">
                      {post.coverImage && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          {catLabel && (
                            <span className="text-xs font-medium text-sky-400/80 px-2.5 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
                              {t(catLabel.label, lang)}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span className="flex items-center gap-1 text-xs text-white/30">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                          {title}
                        </h3>
                        <p className="text-sm text-white/50 line-clamp-3 mb-4 leading-relaxed">
                          {excerpt}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-sky-400/70 group-hover:text-sky-400 transition-colors">
                          {t(translations.blog.readMore, lang)}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <footer className="relative z-10 py-8 border-t border-white/[0.06]" style={{ background: "#001030" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/35 text-xs">
            © 2026 PrimeTraff. {t(translations.footer.allRights, lang)}
          </div>
          <Link href="/" className="text-white/35 text-xs hover:text-white/60 transition-colors" data-testid="link-blog-footer-home">
            {lang === "ru" ? "Главная" : "Home"}
          </Link>
        </div>
      </footer>
    </div>
  );
}
