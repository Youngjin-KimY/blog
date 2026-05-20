<script lang="ts">
  import PostCard from '$lib/components/PostCard.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo
  description={`Posts tagged ${data.tag.name} in the blog.`}
  path={`/tags/${data.tag.slug}/`}
  title={`Tag: ${data.tag.name}`}
/>

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-heading__eyebrow">Tag View</span>
      <h1>#{data.tag.name}</h1>
    </div>
    <p>{data.tag.count} posts sorted by written date descending.</p>
  </div>

  <div class="post-grid">
    {#each data.tag.posts as post, index}
      <PostCard {post} {index} />
    {/each}
  </div>
</section>
