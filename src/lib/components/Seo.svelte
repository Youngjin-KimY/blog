<script lang="ts">
  import { absoluteUrl, site } from '$lib/site';

  interface Props {
    title?: string;
    description?: string;
    path?: string;
    type?: 'website' | 'article';
    image?: string;
  }

  let {
    title,
    description = site.description,
    path = '/',
    type = 'website',
    image = '/thumbnail.png'
  }: Props = $props();

  const pageTitle = $derived(title ? `${title} | ${site.title}` : site.title);
  const canonicalUrl = $derived(absoluteUrl(path));
  const imageUrl = $derived(absoluteUrl(image));
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:type" content={type} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={imageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
</svelte:head>
