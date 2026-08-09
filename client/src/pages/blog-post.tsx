import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useLang } from "@/lib/language-context";
import { translations, t } from "@/lib/i18n";
import { ArrowLeft, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { NavHeader, FixedFooterBar, SHARED_STYLES, FONT, PAD } from "@/components/nav-header";

const LOGIN_URL    = "https://primetrack.pro/login";
const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";

function renderBannerHtml(lang: string): string {
  const loginText    = lang === "ru" ? "ВХОД"        : "LOGIN";
  const registerText = lang === "ru" ? "РЕГИСТРАЦИЯ" : "REGISTER";
  return `<div class="primetraff-banner" data-testid="banner-primetraff">
    <div class="primetraff-banner__glow"></div>
    <div class="primetraff-banner__inner">
      <div class="primetraff-banner__logo"><img src="/pt-logo-new.webp" alt="PrimeTraff" loading="lazy" /></div>
      <div class="primetraff-banner__actions">
        <a class="primetraff-banner__btn primetraff-banner__btn--login" href="${LOGIN_URL}" target="_blank" rel="noopener noreferrer">${loginText} &rarr;</a>
        <a class="primetraff-banner__btn primetraff-banner__btn--register" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">${registerText}</a>
      </div>
    </div>
  </div>`;
}

function groupConsecutiveImages(html: string): string {
  return html.replace(
    /(<p>\s*<img\s[^>]*>\s*<\/p>\s*){2,}/gi,
    (match) => {
      const imgs = match.match(/<img\s[^>]*>/gi);
      if (!imgs || imgs.length < 2) return match;
      const wrapped = imgs.map(img => `<div class="blog-gallery__item">${img}</div>`).join("");
      return `<div class="blog-gallery blog-gallery--${Math.min(imgs.length, 4)}">${wrapped}</div>`;
    }
  );
}

function sanitizeContentHtml(html: string): string {
  let result = html;
  // Strip dangerous tags entirely
  result = result.replace(/<script[\s\S]*?<\/script>/gi, "");
  result = result.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  result = result.replace(/<object[\s\S]*?<\/object>/gi, "");
  result = result.replace(/<embed[^>]*>/gi, "");
  // Strip event handlers and javascript: URLs (quoted, unquoted, mixed case)
  result = result.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");
  result = result.replace(/(href|src|action)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, (attr) => {
    if (/javascript\s*:/i.test(attr)) return attr.replace(/=.*/i, '="#"');
    return attr;
  });
  // Cosmetic cleanup
  result = result.replace(/&amp;nbsp;/gi, " ");
  result = result.replace(/&nbsp;/gi, " ");
  result = result.replace(/\u00A0/g, " ");
  result = result.replace(/\s+style\s*=\s*"[^"]*"/gi, "");
  result = result.replace(/\s+style\s*=\s*'[^']*'/gi, "");
  result = result.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  result = result.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  const bannerPh = "___BANNER_PH___";
  const tableParts: string[] = [];
  result = result.replace(/\[TABLE\]([\s\S]*?)\[\/TABLE\]/g, (_, data) => {
    tableParts.push(data);
    return `___TABLE_PH_${tableParts.length - 1}___`;
  });
  result = result.replace(/\[BANNER\]/g, bannerPh);
  result = result.replace(/<p>\s*<\/p>/g, "");
  result = result.replace(new RegExp(bannerPh, "g"), "[BANNER]");
  tableParts.forEach((data, i) => {
    result = result.replace(`___TABLE_PH_${i}___`, `[TABLE]${data}[/TABLE]`);
  });
  result = result.replace(/ {2,}/g, " ");
  return result;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderTableHtml(tableData: string): string {
  const rows = tableData.split(";;").map(r => r.trim()).filter(Boolean);
  if (rows.length < 2) return "";
  const headers  = rows[0].split("|").map(h => escapeHtml(h.trim()));
  const bodyRows = rows.slice(1);
  const thCells  = headers.map(h => `<th>${h}</th>`).join("");
  const trRows   = bodyRows.map(row => {
    const cells = row.split("|").map(c => escapeHtml(c.trim()));
    return `<tr>${cells.map((c, i) => `<td${i === 0 ? ' class="blog-table__label"' : ""}>${c}</td>`).join("")}</tr>`;
  }).join("");
  return `<div class="blog-table-wrap"><table class="blog-table"><thead><tr>${thCells}</tr></thead><tbody>${trRows}</tbody></table></div>`;
}

function processContent(html: string, lang: string): string {
  let result = sanitizeContentHtml(html);
  result = result.replace(/<p>\s*\[BANNER\]\s*<\/p>/g, renderBannerHtml(lang))
                 .replace(/\[BANNER\]/g, renderBannerHtml(lang));
  result = result.replace(/<p>\s*\[TABLE\]([\s\S]*?)\[\/TABLE\]\s*<\/p>/g, (_, data) => renderTableHtml(data));
  result = result.replace(/\[TABLE\]([\s\S]*?)\[\/TABLE\]/g, (_, data) => renderTableHtml(data));
  result = groupConsecutiveImages(result);
  return result;
}

const CATEGORIES = [
  { key: "basics",   label: translations.blog.categories.basics },
  { key: "beginner", label: translations.blog.categories.beginner },
  { key: "traffic",  label: translations.blog.categories.traffic },
  { key: "trends",   label: translations.blog.categories.trends },
  { key: "news",     label: translations.blog.categories.news },
];

export default function BlogPostPage() {
  const { lang } = useLang();
  const params   = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", params.slug],
  });

  if (isLoading) {
    return (
      <div style={{ fontFamily: FONT }} className="min-h-screen text-white relative">
        <style>{SHARED_STYLES}</style>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/dsb-bg-blue.webp" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-20" style={{  }} />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <NavHeader activePage="blog" />
        <div style={{ padding: `96px ${PAD} 120px`, maxWidth: 'clamp(700px, 90vw, 1400px)', margin: '0 auto' }}>
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/[0.06] rounded w-2/3" />
            <div className="h-64 bg-white/[0.06] rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 bg-white/[0.06] rounded w-full" />
              <div className="h-4 bg-white/[0.06] rounded w-5/6" />
              <div className="h-4 bg-white/[0.06] rounded w-4/6" />
            </div>
          </div>
        </div>
        <FixedFooterBar />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ fontFamily: FONT }} className="min-h-screen bg-black text-white flex flex-col relative">
        <style>{SHARED_STYLES}</style>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img src="/dsb-bg-blue.webp" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-20" style={{  }} />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <NavHeader activePage="blog" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/50 text-lg mb-4">{lang === "ru" ? "Статья не найдена" : "Article not found"}</p>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors" data-testid="link-back-to-blog-error">
              {t(translations.blog.backToBlog, lang)}
            </Link>
          </div>
        </div>
        <FixedFooterBar />
      </div>
    );
  }

  const title      = lang === "ru" ? post.titleRu       : post.titleEn;
  const rawContent = lang === "ru" ? post.contentRu     : post.contentEn;
  const content    = processContent(rawContent, lang);
  const catLabel   = CATEGORIES.find(c => c.key === post.category);

  return (
    <div style={{ fontFamily: FONT }} className="min-h-screen text-white relative">
      <style>{SHARED_STYLES}</style>

      {/* Background — same dark texture as other pages */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/dsb-bg-blue.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10">
        <NavHeader activePage="blog" />

        <div style={{ padding: `96px ${PAD} 120px` }}>
          <div style={{ maxWidth: 'clamp(700px, 90vw, 1400px)', margin: "0 auto" }}>

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4" />
              {t(translations.blog.backToBlog, lang)}
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {catLabel && (
                <span className="text-xs font-medium text-blue-300 px-2.5 py-1 rounded-full bg-blue-400/15 border border-blue-400/25 uppercase tracking-widest">
                  {t(catLabel.label, lang)}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1 text-xs text-white/35">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishedAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="font-bold text-white mb-8 leading-tight"
              style={{ fontSize: "clamp(22px, 3vw, 38px)" }}
              data-testid="text-blogpost-title"
            >
              {title}
            </h1>

            {/* Cover image */}
            {post.coverImage && (
              <div className="rounded-xl overflow-hidden mb-10 border border-white/10">
                <img
                  src={post.coverImage}
                  alt={title}
                  className="w-full object-cover"
                  style={{ aspectRatio: "21/9" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            {/* Article body */}
            <article
              className="prose prose-invert prose-sm md:prose-base max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                prose-strong:text-white/90
                prose-ul:text-white/60 prose-ol:text-white/60
                prose-li:marker:text-blue-400/50
                prose-blockquote:border-blue-400/30 prose-blockquote:text-white/50
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                prose-hr:border-white/10
                prose-code:text-blue-300 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/10"
              dangerouslySetInnerHTML={{ __html: content }}
              data-testid="text-blogpost-content"
            />

          </div>
        </div>

        {/* Footer strip */}
        <footer className="border-t border-white/[0.08] py-8">
          <div
            className="flex items-center justify-center text-white/35 text-xs"
            style={{ maxWidth: 'clamp(700px, 90vw, 1400px)', margin: "0 auto", padding: `0 ${PAD}` }}
          >
            <span>© 2026 PrimeTraff. {t(translations.footer.allRights, lang)}</span>
          </div>
        </footer>
      </div>

      <FixedFooterBar />
    </div>
  );
}
