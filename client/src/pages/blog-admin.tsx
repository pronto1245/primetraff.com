import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
  Save,
  X,
  LogIn,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  LayoutTemplate,
} from "lucide-react";
import type { BlogPost, InsertBlogPost } from "@shared/schema";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const LOGIN_URL = "https://primetrack.pro/login";
const REGISTER_URL = "https://primetrack.pro/register?ref=ADV-3BT52V85";

function buildBannerHtml(lang: "ru" | "en"): string {
  const loginText = lang === "ru" ? "ВХОД →" : "LOGIN →";
  const registerText = lang === "ru" ? "РЕГИСТРАЦИЯ" : "REGISTER";
  return `<div class="primetraff-banner" data-testid="banner-primetraff"><div class="primetraff-banner__logo"><img src="/primetraff-logo.png" alt="PrimeTraff" /></div><div class="primetraff-banner__actions"><a class="primetraff-banner__btn" href="${LOGIN_URL}" target="_blank" rel="noopener noreferrer">${loginText}</a><a class="primetraff-banner__btn" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">${registerText}</a></div></div>`;
}

const CATEGORIES = [
  { key: "basics", label: "Основные понятия" },
  { key: "beginner", label: "Новичку" },
  { key: "traffic", label: "Источники трафика" },
  { key: "trends", label: "iGaming Тренды" },
  { key: "news", label: "Новости" },
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function BlogAdminPage() {
  const [password, setPassword] = useState(() => localStorage.getItem("adminPassword") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/blog-admin", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        localStorage.setItem("adminPassword", password);
        setIsLoggedIn(true);
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
        <div className="w-full max-w-sm p-8 rounded-xl border border-white/10 bg-white/[0.04]">
          <h2 className="text-xl font-bold text-white mb-2 text-center" data-testid="text-admin-login-title">Админ-панель блога</h2>
          <p className="text-white/40 text-sm text-center mb-6">Введите пароль для доступа</p>
          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Неверный пароль
            </div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
            placeholder="Пароль"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 mb-4 outline-none focus:border-sky-400/40"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            data-testid="input-admin-password"
          />
          <Button onClick={handleLogin} className="w-full" data-testid="button-admin-login">
            <LogIn className="w-4 h-4 mr-2" />
            Войти
          </Button>
        </div>
      </div>
    );
  }

  if (isCreating || editing) {
    return (
      <PostEditor
        password={password}
        post={editing}
        onClose={() => { setEditing(null); setIsCreating(false); }}
      />
    );
  }

  return (
    <PostList
      password={password}
      onEdit={setEditing}
      onCreate={() => setIsCreating(true)}
    />
  );
}

function PostList({ password, onEdit, onCreate }: { password: string; onEdit: (p: BlogPost) => void; onCreate: () => void }) {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-admin"],
    queryFn: async () => {
      const res = await fetch("/api/blog-admin", {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Ошибка удаления");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          isPublished: !isPublished,
          publishedAt: !isPublished ? new Date().toISOString() : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Ошибка публикации");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    },
  });

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/blog" data-testid="link-admin-back-to-blog">
              <Button variant="ghost" size="icon" className="text-white/50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white" data-testid="text-admin-title">Управление блогом</h1>
              <p className="text-white/40 text-sm mt-0.5">Создавайте и публикуйте статьи</p>
            </div>
          </div>
          <Button onClick={onCreate} data-testid="button-admin-create-post">
            <Plus className="w-4 h-4 mr-2" />
            Новая статья
          </Button>
        </div>

        {togglePublish.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {(togglePublish.error as Error).message}
          </div>
        )}

        {isLoading ? (
          <div className="text-white/40 text-center py-20">Загрузка...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg mb-2" data-testid="text-admin-no-posts">Статей пока нет</p>
            <p className="text-white/25 text-sm">Нажмите «Новая статья» чтобы создать первую</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] flex-wrap"
                data-testid={`row-admin-post-${post.id}`}
              >
                {post.coverImage && (
                  <img src={post.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white/90 font-medium truncate">{post.titleRu}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-sky-400/60 px-2 py-0.5 rounded bg-sky-400/10">
                      {CATEGORIES.find(c => c.key === post.category)?.label || post.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${post.isPublished ? "text-emerald-400/80 bg-emerald-400/10" : "text-amber-400/60 bg-amber-400/10"}`}>
                      {post.isPublished ? (
                        <><CheckCircle2 className="w-3 h-3" /> Опубликовано</>
                      ) : (
                        <><AlertCircle className="w-3 h-3" /> Черновик</>
                      )}
                    </span>
                    {post.publishedAt && (
                      <span className="text-xs text-white/25">
                        {new Date(post.publishedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {post.isPublished && (
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" data-testid={`link-view-post-${post.id}`}>
                      <Button variant="ghost" size="icon" className="text-white/40">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublish.mutate({ id: post.id, isPublished: post.isPublished })}
                    className={post.isPublished ? "text-emerald-400/60" : "text-amber-400/60"}
                    title={post.isPublished ? "Снять с публикации" : "Опубликовать"}
                    data-testid={`button-toggle-publish-${post.id}`}
                  >
                    {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(post)}
                    className="text-white/40"
                    title="Редактировать"
                    data-testid={`button-edit-post-${post.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Удалить эту статью?")) deleteMutation.mutate(post.id);
                    }}
                    className="text-white/40"
                    title="Удалить"
                    data-testid={`button-delete-post-${post.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PostEditor({ password, post, onClose }: { password: string; post: BlogPost | null; onClose: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    slug: post?.slug || "",
    category: post?.category || "basics",
    coverImage: post?.coverImage || "",
    titleRu: post?.titleRu || "",
    titleEn: post?.titleEn || "",
    excerptRu: post?.excerptRu || "",
    excerptEn: post?.excerptEn || "",
    contentRu: post?.contentRu || "",
    contentEn: post?.contentEn || "",
    isPublished: post?.isPublished || false,
  });
  const [uploading, setUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const saveMutation = useMutation({
    mutationFn: async () => {
      const body = {
        ...form,
        publishedAt: form.isPublished ? (post?.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString()) : null,
      };

      const url = post ? `/api/blog/${post.id}` : "/api/blog";
      const method = post ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Ошибка сохранения (${res.status})`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-admin"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setSaveSuccess(true);
      setSaveError("");
      setTimeout(() => onClose(), 800);
    },
    onError: (err: Error) => {
      setSaveError(err.message);
      setSaveSuccess(false);
    },
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((f) => ({ ...f, coverImage: data.url }));
    } catch (e) {
      alert("Ошибка загрузки изображения");
    }
    setUploading(false);
  };

  const updateField = (key: string, value: string | boolean) => {
    setForm((f) => {
      const updated = { ...f, [key]: value };
      if (key === "titleRu" && !post) {
        updated.slug = slugify(value as string);
      }
      return updated;
    });
  };

  const canSave = form.slug && form.titleRu && form.titleEn && form.excerptRu && form.excerptEn && form.contentRu && form.contentEn;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #001030 0%, #001845 50%, #001030 100%)" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/50" data-testid="button-editor-close">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white" data-testid="text-editor-title">
                {post ? "Редактирование статьи" : "Новая статья"}
              </h1>
              <p className="text-white/35 text-sm mt-0.5">Заполните все поля на русском и английском</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer select-none" title="Отметьте чтобы статья появилась на сайте">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => updateField("isPublished", e.target.checked)}
                className="rounded"
                data-testid="input-is-published"
              />
              Опубликовать сразу
            </label>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || !canSave}
              data-testid="button-save-post"
            >
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Статья сохранена успешно!
          </div>
        )}

        {saveError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {saveError}
          </div>
        )}

        {!canSave && !saveMutation.isPending && (
          <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Заполните все обязательные поля (slug, заголовки, описания, контент на обоих языках)
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Категория</label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white outline-none focus:border-sky-400/40"
                data-testid="select-category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key} className="bg-[#001845] text-white">{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5">URL-адрес (slug) <span className="text-white/25">— генерируется из заголовка</span></label>
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-sky-400/40"
                placeholder="moya-statya"
                data-testid="input-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-1.5">Обложка</label>
            <div className="flex items-center gap-3 flex-wrap">
              {form.coverImage && (
                <div className="relative">
                  <img src={form.coverImage} alt="" className="h-20 rounded-lg object-cover" />
                  <button
                    onClick={() => updateField("coverImage", "")}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                    data-testid="button-remove-cover"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                data-testid="input-cover-upload"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border-white/15 text-white/60"
                data-testid="button-upload-cover"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Загрузка..." : "Загрузить картинку"}
              </Button>
              <span className="text-xs text-white/30">или вставьте ссылку:</span>
              <input
                value={form.coverImage}
                onChange={(e) => updateField("coverImage", e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/20 outline-none focus:border-sky-400/40"
                placeholder="https://..."
                data-testid="input-cover-url"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Заголовок (RU) <span className="text-red-400">*</span></label>
              <input
                value={form.titleRu}
                onChange={(e) => updateField("titleRu", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-sky-400/40"
                placeholder="Заголовок статьи на русском"
                data-testid="input-title-ru"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Заголовок (EN) <span className="text-red-400">*</span></label>
              <input
                value={form.titleEn}
                onChange={(e) => updateField("titleEn", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-sky-400/40"
                placeholder="Article title in English"
                data-testid="input-title-en"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Краткое описание (RU) <span className="text-red-400">*</span></label>
              <textarea
                value={form.excerptRu}
                onChange={(e) => updateField("excerptRu", e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-sky-400/40 resize-none"
                placeholder="Краткое описание для превью"
                data-testid="input-excerpt-ru"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-1.5">Краткое описание (EN) <span className="text-red-400">*</span></label>
              <textarea
                value={form.excerptEn}
                onChange={(e) => updateField("excerptEn", e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-sky-400/40 resize-none"
                placeholder="Short description for preview"
                data-testid="input-excerpt-en"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
              <label className="block text-sm text-white/50">Содержание статьи (RU) <span className="text-red-400">*</span></label>
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 text-white/60 text-xs"
                onClick={() => updateField("contentRu", form.contentRu + buildBannerHtml("ru"))}
                data-testid="button-insert-banner-ru"
              >
                <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" />
                Вставить баннер
              </Button>
            </div>
            <div className="blog-editor-dark">
              <ReactQuill
                value={form.contentRu}
                onChange={(v) => updateField("contentRu", v)}
                modules={quillModules}
                theme="snow"
                placeholder="Напишите содержание статьи на русском..."
                data-testid="editor-content-ru"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
              <label className="block text-sm text-white/50">Содержание статьи (EN) <span className="text-red-400">*</span></label>
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 text-white/60 text-xs"
                onClick={() => updateField("contentEn", form.contentEn + buildBannerHtml("en"))}
                data-testid="button-insert-banner-en"
              >
                <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" />
                Insert banner
              </Button>
            </div>
            <div className="blog-editor-dark">
              <ReactQuill
                value={form.contentEn}
                onChange={(v) => updateField("contentEn", v)}
                modules={quillModules}
                theme="snow"
                placeholder="Write article content in English..."
                data-testid="editor-content-en"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
