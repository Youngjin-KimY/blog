import { getTagCollections } from '$lib/server/content';

export async function load() {
  return {
    tags: await getTagCollections()
  };
}
