import type { HomePagePayload, HomePagination } from '$lib/types/content';
import { getAllPostSummaries, getTagCollections } from '$lib/server/content';

export const HOME_PAGE_SIZE = 5;

function pageHref(page: number): string {
  return page === 1 ? '/' : `/page/${page}/`;
}

function buildPagination(page: number, totalPages: number): HomePagination {
  return {
    hasNext: page < totalPages,
    hasPrev: page > 1,
    links: Array.from({ length: totalPages }, (_, index) => {
      const nextPage = index + 1;

      return {
        current: nextPage === page,
        href: pageHref(nextPage),
        page: nextPage
      };
    }),
    nextHref: page < totalPages ? pageHref(page + 1) : null,
    page,
    prevHref: page > 1 ? pageHref(page - 1) : null,
    totalPages
  };
}

export async function getHomeTotalPages(): Promise<number> {
  const posts = await getAllPostSummaries();
  const remainingCount = Math.max(posts.length - 1, 0);

  return Math.max(1, Math.ceil(remainingCount / HOME_PAGE_SIZE));
}

export async function getHomePageData(page: number): Promise<HomePagePayload | null> {
  const posts = await getAllPostSummaries();
  const tags = await getTagCollections();
  const featured = posts[0] ?? null;
  const remainingPosts = featured ? posts.slice(1) : posts;
  const totalPages = Math.max(1, Math.ceil(remainingPosts.length / HOME_PAGE_SIZE));

  if (page < 1 || page > totalPages) {
    return null;
  }

  const startIndex = (page - 1) * HOME_PAGE_SIZE;
  const items = remainingPosts.slice(startIndex, startIndex + HOME_PAGE_SIZE);

  return {
    featured: page === 1 ? featured : null,
    items,
    pagination: buildPagination(page, totalPages),
    tags: page === 1 ? tags.slice(0, 8) : [],
    totalPosts: posts.length,
    totalTags: tags.length
  };
}
