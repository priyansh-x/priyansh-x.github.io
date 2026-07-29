import { describe, expect, it } from "vitest";
import { postContent, posts, projects } from "@/lib/content";
import { formatDate } from "@/lib/utils";

describe("content", () => {
  it("gives every post a content entry", () => {
    for (const post of posts) {
      expect(postContent).toHaveProperty(post.slug);
    }
  });

  it("keeps each post's year in sync with its date", () => {
    for (const post of posts) {
      if (!post.date) continue;
      expect(post.date.slice(0, 4)).toBe(post.year);
    }
  });

  it("uses unique post slugs", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every project both languages", () => {
    for (const project of projects) {
      expect(project.descEn.length).toBeGreaterThan(0);
      expect(project.descHi.length).toBeGreaterThan(0);
    }
  });
});

describe("formatDate", () => {
  it("formats an ISO date in English", () => {
    expect(formatDate("2026-05-23", "en")).toBe("May 23, 2026");
  });

  it("returns a non-empty string for Hindi", () => {
    expect(formatDate("2026-05-23", "hi")).not.toHaveLength(0);
  });
});
