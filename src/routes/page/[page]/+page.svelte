<script lang="ts">
  import HomePageContent from '$lib/components/HomePageContent.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<HomePageContent {data} />
