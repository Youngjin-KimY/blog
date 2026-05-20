<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo description={data.page.description} path="/about/" title={data.page.title} />

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-heading__eyebrow">About This Blog</span>
      <h1>{data.page.title}</h1>
    </div>
    <p>{data.page.description}</p>
  </div>

  <div class="content-panel">
    <div class="prose">
      {@html data.page.html}
    </div>
  </div>
</section>
