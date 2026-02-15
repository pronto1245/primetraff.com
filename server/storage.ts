import { type User, type InsertUser, type BlogPost, type InsertBlogPost, users, blogPosts } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc, and } from "drizzle-orm";
import pg from "pg";
import crypto from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  listBlogPosts(opts?: { category?: string; publishedOnly?: boolean }): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private posts: Map<string, BlogPost> = new Map();

  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  async createUser(insert: InsertUser): Promise<User> {
    const user: User = { ...insert, id: crypto.randomUUID(), createdAt: new Date() } as User;
    this.users.set(user.id, user);
    return user;
  }

  async listBlogPosts(opts?: { category?: string; publishedOnly?: boolean }): Promise<BlogPost[]> {
    let posts = Array.from(this.posts.values());
    if (opts?.category) posts = posts.filter(p => p.category === opts.category);
    if (opts?.publishedOnly !== false) posts = posts.filter(p => p.isPublished);
    return posts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getBlogPostBySlug(slug: string) {
    return Array.from(this.posts.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string) { return this.posts.get(id); }

  async createBlogPost(insert: InsertBlogPost): Promise<BlogPost> {
    const post: BlogPost = {
      ...insert,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      isPublished: insert.isPublished ?? true,
      coverImage: insert.coverImage ?? null,
    } as BlogPost;
    this.posts.set(post.id, post);
    return post;
  }

  async updateBlogPost(id: string, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    const updated = { ...post, ...update } as BlogPost;
    this.posts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }
}

class DatabaseStorage implements IStorage {
  private db;
  constructor(connectionString: string) {
    const pool = new pg.Pool({ connectionString });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.db.insert(users).values(insertUser).returning();
    return user;
  }

  async listBlogPosts(opts?: { category?: string; publishedOnly?: boolean }): Promise<BlogPost[]> {
    const conditions = [];
    if (opts?.category) {
      conditions.push(eq(blogPosts.category, opts.category));
    }
    if (opts?.publishedOnly !== false) {
      conditions.push(eq(blogPosts.isPublished, true));
    }
    const query = this.db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }
    return query;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(insert: InsertBlogPost): Promise<BlogPost> {
    const [post] = await this.db.insert(blogPosts).values(insert).returning();
    return post;
  }

  async updateBlogPost(id: string, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await this.db.update(blogPosts).set(update).where(eq(blogPosts.id, id)).returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
}

function createStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    console.log("Using PostgreSQL database storage");
    return new DatabaseStorage(process.env.DATABASE_URL);
  }
  console.log("No DATABASE_URL found, using in-memory storage");
  return new MemStorage();
}

export const storage = createStorage();
