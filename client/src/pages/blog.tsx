import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";
import { ArrowRight, Calendar, LayoutGrid, BookOpen, GraduationCap, Globe, TrendingUp, Newspaper } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import BlogNavigation from "@/components/blog-navigation";

const CATEGORIES = [
  { key: "all", label: translations.blog.allCategories, icon: LayoutGrid, color: "sky", active: "bg-sky-500/20 border-sky-400/30 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.15)]", iconActive: "text-sky-300", iconIdle: "text-sky-400/30" },
  { key: "basics", label: translations.blog.categories.basics, icon: BookOpen, color: "violet", active: "bg-violet-500/20 border-violet-400/30 text-violet-200 shadow-[0_0_20px_rgba(167,139,250,0.15)]", iconActive: "text-violet-300", iconIdle: "text-violet-400/30" },
  { key: "beginner", label: translations.blog.categories.beginner, icon: GraduationCap, color: "emerald", active: "bg-emerald-500/20 border-emerald-400/30 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.15)]", iconActive: "text-emerald-300", iconIdle: "text-emerald-400/30" },
  { key: "traffic", label: translations.blog.categories.traffic, icon: Globe, color: "amber", active: "bg-amber-500/20 border-amber-400/30 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.15)]", iconActive: "text-amber-300", iconIdle: "text-amber-400/30" },
  { key: "trends", label: translations.blog.categories.trends, icon: TrendingUp, color: "cyan", active: "bg-cyan-500/20 border-cyan-400/30 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.15)]", iconActive: "text-cyan-300", iconIdle: "text-cyan-400/30" },
  { key: "news", label: translations.blog.categories.news, icon: Newspaper, color: "rose", active: "bg-rose-500/20 border-rose-400/30 text-rose-200 shadow-[0_0_20px_rgba(251,113,133,0.15)]", iconActive: "text-rose-300", iconIdle: "text-rose-400/30" },
];

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
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001030 0%, #002060 30%, #0055AA 60%, #0088CC 100%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,200,255,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,100,200,0.2),_transparent_60%)]" />
      <div className="hidden md:block absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,140,220,0.12) 0%, transparent 70%)" }} />
      <div className="hidden md:block absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10">
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

            <div className="mb-10 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 p-1.5 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm" data-testid="blog-category-tabs">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                        isActive
                          ? cat.active
                          : "text-white/50 hover:text-white/80 hover:bg-white/[0.06] border-transparent"
                      }`}
                      data-testid={`button-category-${cat.key}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? cat.iconActive : cat.iconIdle}`} />
                      {t(cat.label, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm animate-pulse">
                    <div className="h-48 bg-white/[0.06] rounded-t-xl" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-white/[0.06] rounded w-1/3" />
                      <div className="h-5 bg-white/[0.06] rounded w-3/4" />
                      <div className="h-4 bg-white/[0.06] rounded w-full" />
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
                      <div className="rounded-xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
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
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            {catLabel && (
                              <span className="text-xs font-medium text-sky-300 px-2.5 py-1 rounded-full bg-sky-400/15 border border-sky-400/25">
                                {t(catLabel.label, lang)}
                              </span>
                            )}
                            {post.publishedAt && (
                              <span className="flex items-center gap-1 text-xs text-white/35">
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
                          <div className="flex items-center gap-1.5 text-sm font-medium text-sky-300/70 group-hover:text-sky-300 transition-colors">
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

        <footer className="py-8 border-t border-white/[0.08]">
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
    </div>
  );
}
