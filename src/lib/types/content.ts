export interface TagLink {
  name: string;
  slug: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  updated: string | null;
  updatedLabel: string | null;
  year: string;
  month: string;
  day: string;
  tags: TagLink[];
  readingTime: string;
  canonicalPath: string;
  legacyPath: string;
  math: boolean;
}

export interface PostDetail extends PostSummary {
  html: string;
}

export interface ArchiveSection {
  year: string;
  posts: PostSummary[];
}

export interface TagCollection {
  name: string;
  slug: string;
  count: number;
  latestDate: string;
  latestDateLabel: string;
  posts: PostSummary[];
}

export interface PageContent {
  title: string;
  description: string;
  html: string;
}

export interface HomePaginationLink {
  current: boolean;
  href: string;
  page: number;
}

export interface HomePagination {
  hasNext: boolean;
  hasPrev: boolean;
  links: HomePaginationLink[];
  nextHref: string | null;
  page: number;
  prevHref: string | null;
  totalPages: number;
}

export interface HomePagePayload {
  featured: PostSummary | null;
  items: PostSummary[];
  pagination: HomePagination;
  tags: TagCollection[];
  totalPosts: number;
  totalTags: number;
}
