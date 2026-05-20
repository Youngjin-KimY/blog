<script lang="ts">
  import PostArticle from '$lib/components/PostArticle.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<PostArticle post={data.post} />
