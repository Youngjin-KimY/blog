<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import TagPill from '$lib/components/TagPill.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo description="Every post grouped by year." path="/archive/" title="Archive" />

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-heading__eyebrow">Archive</span>
      <h1>All writing by year</h1>
    </div>
    <p>Every post stays available here, grouped by year and still sorted latest-first inside each section.</p>
  </div>

  <div class="archive-list">
    {#each data.sections as section}
      <div class="content-panel">
        <h2 class="archive-year">{section.year}</h2>
        <div class="tag-listing">
          {#each section.posts as post}
            <article class="archive-item">
              <div class="archive-item__header">
                <a class="post-card__title" href={post.canonicalPath}>{post.title}</a>
                <span class="eyebrow-value">{post.dateLabel}</span>
              </div>
              <p>{post.excerpt}</p>
              <div class="tag-list">
                {#each post.tags as tag}
                  <TagPill href={`/tags/${tag.slug}/`} label={tag.name} muted />
                {/each}
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
