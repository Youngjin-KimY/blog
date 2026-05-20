<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import TagPill from '$lib/components/TagPill.svelte';
  import type { PostDetail } from '$lib/types/content';

  interface Props {
    post: PostDetail;
  }

  let { post }: Props = $props();
</script>

<Seo title={post.title} description={post.description} path={post.canonicalPath} type="article" />

<section class="section">
  <div class="content-panel content-panel--post">
    <header class="post-header">
      <span class="meta-kicker">Post</span>
      <h1 class="post-title">{post.title}</h1>
      <p class="post-header__lede">{post.description}</p>
      <div class="post-header__footer">
        <div class="meta-row">
          <span>{post.dateLabel}</span>
          <span>{post.readingTime}</span>
          {#if post.updatedLabel}
            <span>Updated {post.updatedLabel}</span>
          {/if}
        </div>
        <div class="tag-list">
          {#each post.tags as tag}
            <TagPill href={`/tags/${tag.slug}/`} label={tag.name} />
          {/each}
        </div>
      </div>
    </header>

    <article class="prose">
      {@html post.html}
    </article>
  </div>
</section>
