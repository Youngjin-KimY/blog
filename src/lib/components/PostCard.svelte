<script lang="ts">
  import type { PostSummary } from '$lib/types/content';
  import TagPill from '$lib/components/TagPill.svelte';

  interface Props {
    post: PostSummary;
    index?: number;
    featured?: boolean;
  }

  let { post, index = 0, featured = false }: Props = $props();
</script>

<article class:post-card--featured={featured} class="post-card" style={`--index: ${index};`}>
  <div class="post-card__kicker">{post.dateLabel} · {post.readingTime}</div>
  <a href={post.canonicalPath}>
    <span class="post-card__title">{post.title}</span>
  </a>
  <p class="post-card__excerpt">{post.excerpt}</p>
  <div class="tag-list">
    {#each post.tags as tag}
      <TagPill href={`/tags/${tag.slug}/`} label={tag.name} muted />
    {/each}
  </div>
  <div class="post-card__footer">
    <a class="inline-link" href={post.canonicalPath}>Read post</a>
    {#if post.updatedLabel}
      <span class="eyebrow-value">Updated {post.updatedLabel}</span>
    {/if}
  </div>
</article>
