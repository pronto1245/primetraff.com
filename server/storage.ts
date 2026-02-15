import { type User, type InsertUser, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async listBlogPosts(opts?: { category?: string; publishedOnly?: boolean }): Promise<BlogPost[]> {
    let posts = Array.from(this.posts.values());
    if (opts?.category) {
      posts = posts.filter(p => p.category === opts.category);
    }
    if (opts?.publishedOnly) {
      posts = posts.filter(p => p.isPublished);
    }
    posts.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    return posts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.posts.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.posts.get(id);
  }

  async createBlogPost(insert: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insert,
      id,
      coverImage: insert.coverImage || null,
      isPublished: insert.isPublished ?? false,
      publishedAt: insert.publishedAt || null,
      createdAt: new Date(),
    };
    this.posts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.posts.get(id);
    if (!existing) return undefined;
    const updated: BlogPost = { ...existing, ...update };
    this.posts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }
}

export const storage = new MemStorage();
