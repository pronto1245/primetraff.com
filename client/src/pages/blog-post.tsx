import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";
import { ArrowLeft, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import BlogNavigation from "@/components/blog-navigation";

const CATEGORIES = [
  { key: "basics", label: translations.blog.categories.basics },
  { key: "beginner", label: translations.blog.categories.beginner },
  { key: "traffic", label: translations.blog.categories.traffic },
  { key: "trends", label: translations.blog.categories.trends },
  { key: "news", label: translations.blog.categories.news },
];

export default function BlogPostPage() {
  const { lang } = useLang();
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", params.slug],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
        <BlogNavigation />
        <div className="pt-28 pb-20 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/[0.05] rounded w-2/3" />
            <div className="h-64 bg-white/[0.05] rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 bg-white/[0.05] rounded w-full" />
              <div className="h-4 bg-white/[0.05] rounded w-5/6" />
              <div className="h-4 bg-white/[0.05] rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
        <BlogNavigation />
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">{lang === "ru" ? "Статья не найдена" : "Article not found"}</p>
          <Link href="/blog" className="text-sky-400 hover:text-sky-300 transition-colors" data-testid="link-back-to-blog-error">
            {t(translations.blog.backToBlog, lang)}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === "ru" ? post.titleRu : post.titleEn;
  const content = lang === "ru" ? post.contentRu : post.contentEn;
  const catLabel = CATEGORIES.find(c => c.key === post.category);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
      <BlogNavigation />

      <div className="pt-24 lg:pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
            data-testid="link-back-to-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(translations.blog.backToBlog, lang)}
          </Link>

          <div className="flex items-center gap-3 mb-5">
            {catLabel && (
              <span className="text-xs font-medium text-sky-400/80 px-2.5 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
                {t(catLabel.label, lang)}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishedAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight" data-testid="text-blogpost-title">
            {title}
          </h1>

          {post.coverImage && (
            <div className="rounded-xl overflow-hidden mb-10 border border-white/[0.08]">
              <img
                src={post.coverImage}
                alt={title}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <article
            className="prose prose-invert prose-sm md:prose-base max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-a:text-sky-400 prose-a:no-underline hover:prose-a:text-sky-300
              prose-strong:text-white/90
              prose-ul:text-white/60 prose-ol:text-white/60
              prose-li:marker:text-sky-400/50
              prose-blockquote:border-sky-400/30 prose-blockquote:text-white/50
              prose-img:rounded-xl prose-img:border prose-img:border-white/10
              prose-hr:border-white/10
              prose-code:text-sky-300 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: content }}
            data-testid="text-blogpost-content"
          />
        </div>
      </div>

      <footer className="relative z-10 py-8 border-t border-white/[0.06]" style={{ background: "#001030" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/35 text-xs">
            © 2026 PrimeTraff. {t(translations.footer.allRights, lang)}
          </div>
          <Link href="/blog" className="text-white/35 text-xs hover:text-white/60 transition-colors" data-testid="link-blogpost-footer-blog">
            {t(translations.blog.nav, lang)}
          </Link>
        </div>
      </footer>
    </div>
  );
}
