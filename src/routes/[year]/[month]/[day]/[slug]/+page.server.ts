import { error } from '@sveltejs/kit';
import { getAllPostSummaries, getPostBySlug } from '$lib/server/content';

export async function entries() {
  const posts = await getAllPostSummaries();
  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug
  }));
}

export async function load({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  if (post.year !== params.year || post.month !== params.month || post.day !== params.day) {
    throw error(404, 'Legacy post path does not match the written date');
  }

  return { post };
}
