import { error } from '@sveltejs/kit';
import { getAllPostSummaries, getPostBySlug } from '$lib/server/content';

export async function entries() {
  const posts = await getAllPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return { post };
}
