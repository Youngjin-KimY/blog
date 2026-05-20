import { getPageContent } from '$lib/server/content';

export async function load() {
  return {
    page: await getPageContent('about')
  };
}
