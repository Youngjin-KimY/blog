import { error } from '@sveltejs/kit';
import { getTagCollectionBySlug, getTagCollections } from '$lib/server/content';

export async function entries() {
  const tags = await getTagCollections();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function load({ params }) {
  const tag = await getTagCollectionBySlug(params.tag);

  if (!tag) {
    throw error(404, 'Tag not found');
  }

  return { tag };
}
