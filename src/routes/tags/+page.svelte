<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo description="Browse all tags in the blog." path="/tags/" title="Tags" />

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-heading__eyebrow">Tags</span>
      <h1>Browse by topic</h1>
    </div>
    <p>The new site uses tags as the main content taxonomy because the original posts do not use categories consistently.</p>
  </div>

  <div class="tag-grid">
    {#each data.tags as tag}
      <article class="tag-card">
        <a class="tag-card__title" href={`/tags/${tag.slug}/`}>{tag.name}</a>
        <p>{tag.count} posts · latest on {tag.latestDateLabel}</p>
      </article>
    {/each}
  </div>
</section>
