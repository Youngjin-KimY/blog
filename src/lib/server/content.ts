import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import type { ArchiveSection, PageContent, PostDetail, PostSummary, TagCollection } from '$lib/types/content';
import { formatLongDate, slugifyTag, truncate } from '$lib/utils/format';

type FrontmatterValue = string | Date | string[] | boolean | null | undefined;

interface RawFrontmatter {
  title?: FrontmatterValue;
  date?: FrontmatterValue;
  last_modified_at?: FrontmatterValue;
  tags?: FrontmatterValue;
  math?: FrontmatterValue;
  description?: FrontmatterValue;
}

const ROOT_DIR = process.cwd();
const POSTS_DIR = path.join(ROOT_DIR, 'content', 'posts');
const PAGES_DIR = path.join(ROOT_DIR, 'content', 'pages');

let cachedPosts: Promise<PostDetail[]> | null = null;
const cachedPages = new Map<string, Promise<PageContent>>();

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}

function normalizeMarkdown(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/^\{:\s*\.[^}]+\}\s*$/gm, '')
    .replace(
      /\{\{\s*["']?\/assets\/images\/([^"'}?]+)(?:\?raw=true)?["']?\s*\|\s*relative\s*_?url\s*\}\}/g,
      '/images/$1'
    )
    .replace(/\/assets\/images\//g, '/images/')
    .replace(/<\/br>/g, '<br />')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeTags(value: FrontmatterValue): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function deriveDateFromFilename(filename: string): Date {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);

  if (!match) {
    return new Date();
  }

  const [, year, month, day] = match;
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`);
}

function parseDate(value: FrontmatterValue, fallback: Date): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = new Date(value);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return fallback;
}

function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function createDescription(rawMarkdown: string, frontmatterDescription: FrontmatterValue): string {
  if (typeof frontmatterDescription === 'string' && frontmatterDescription.trim().length > 0) {
    return frontmatterDescription.trim();
  }

  return truncate(stripMarkdown(rawMarkdown), 170);
}

async function renderMarkdown(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        ariaHidden: 'true',
        className: ['heading-anchor']
      },
      content: {
        type: 'text',
        value: ' #'
      }
    })
    .use(rehypeExternalLinks, {
      rel: ['noopener', 'noreferrer'],
      target: '_blank'
    })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(file);
}

async function readPostFile(filename: string): Promise<PostDetail> {
  const fullPath = path.join(POSTS_DIR, filename);
  const source = await fs.readFile(fullPath, 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data as RawFrontmatter;
  const normalizedBody = normalizeMarkdown(parsed.content);
  const fallbackDate = deriveDateFromFilename(filename);
  const publishedAt = parseDate(frontmatter.date, fallbackDate);
  const updatedAt = parseDate(frontmatter.last_modified_at, publishedAt);
  const title = typeof frontmatter.title === 'string' ? frontmatter.title.trim() : filename;
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const tags = normalizeTags(frontmatter.tags).map((name) => ({
    name,
    slug: slugifyTag(name)
  }));
  const html = await renderMarkdown(normalizedBody);
  const description = createDescription(normalizedBody, frontmatter.description);
  const date = publishedAt.toISOString();
  const updated = updatedAt.getTime() === publishedAt.getTime() ? null : updatedAt.toISOString();

  return {
    slug,
    title,
    description,
    excerpt: description,
    date,
    dateLabel: formatLongDate(date),
    updated,
    updatedLabel: updated ? formatLongDate(updated) : null,
    year: date.slice(0, 4),
    month: date.slice(5, 7),
    day: date.slice(8, 10),
    tags,
    readingTime: readingTime(normalizedBody).text,
    canonicalPath: `/posts/${slug}/`,
    legacyPath: `/${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8, 10)}/${slug}/`,
    math: frontmatter.math === true,
    html
  };
}

async function loadPosts(): Promise<PostDetail[]> {
  const files = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    files.filter((filename) => filename.endsWith('.md')).map((filename) => readPostFile(filename))
  );

  return sortByDateDesc(posts);
}

async function readPageFile(slug: string): Promise<PageContent> {
  const fullPath = path.join(PAGES_DIR, `${slug}.md`);
  const source = await fs.readFile(fullPath, 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data as RawFrontmatter;
  const body = normalizeMarkdown(parsed.content);
  const title = typeof frontmatter.title === 'string' ? frontmatter.title.trim() : slug;
  const description = createDescription(body, frontmatter.description);

  return {
    title,
    description,
    html: await renderMarkdown(body)
  };
}

async function getPostsInternal(): Promise<PostDetail[]> {
  if (!cachedPosts) {
    cachedPosts = loadPosts();
  }

  return cachedPosts;
}

function toSummary(post: PostDetail): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    date: post.date,
    dateLabel: post.dateLabel,
    updated: post.updated,
    updatedLabel: post.updatedLabel,
    year: post.year,
    month: post.month,
    day: post.day,
    tags: post.tags,
    readingTime: post.readingTime,
    canonicalPath: post.canonicalPath,
    legacyPath: post.legacyPath,
    math: post.math
  };
}

export async function getAllPostSummaries(): Promise<PostSummary[]> {
  const posts = await getPostsInternal();
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const posts = await getPostsInternal();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getArchiveSections(): Promise<ArchiveSection[]> {
  const posts = await getAllPostSummaries();
  const sections = new Map<string, PostSummary[]>();

  for (const post of posts) {
    const group = sections.get(post.year) ?? [];
    group.push(post);
    sections.set(post.year, group);
  }

  return [...sections.entries()].map(([year, yearPosts]) => ({
    year,
    posts: sortByDateDesc(yearPosts)
  }));
}

export async function getTagCollections(): Promise<TagCollection[]> {
  const posts = await getAllPostSummaries();
  const groups = new Map<string, TagCollection>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const current = groups.get(tag.slug);

      if (current) {
        current.count += 1;
        current.posts.push(post);
        continue;
      }

      groups.set(tag.slug, {
        name: tag.name,
        slug: tag.slug,
        count: 1,
        latestDate: post.date,
        latestDateLabel: post.dateLabel,
        posts: [post]
      });
    }
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      posts: sortByDateDesc(group.posts)
    }))
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      return left.name.localeCompare(right.name);
    });
}

export async function getTagCollectionBySlug(slug: string): Promise<TagCollection | null> {
  const groups = await getTagCollections();
  return groups.find((group) => group.slug === slug) ?? null;
}

export async function getPageContent(slug: string): Promise<PageContent> {
  const cached = cachedPages.get(slug);

  if (cached) {
    return cached;
  }

  const pagePromise = readPageFile(slug);
  cachedPages.set(slug, pagePromise);
  return pagePromise;
}
