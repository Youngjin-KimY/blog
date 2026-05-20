import { error } from '@sveltejs/kit';
import { getHomePageData, getHomeTotalPages } from '$lib/server/home';

export async function entries() {
  const totalPages = await getHomeTotalPages();

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function load({ params }) {
  const page = Number(params.page);

  if (!Number.isInteger(page) || page < 2) {
    throw error(404, 'Page not found');
  }

  const data = await getHomePageData(page);

  if (!data) {
    throw error(404, 'Page not found');
  }

  return data;
}
