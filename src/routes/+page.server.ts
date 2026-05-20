import { error } from '@sveltejs/kit';
import { getHomePageData } from '$lib/server/home';

export async function load() {
  const data = await getHomePageData(1);

  if (!data) {
    throw error(404, 'Home page not found');
  }

  return data;
}
