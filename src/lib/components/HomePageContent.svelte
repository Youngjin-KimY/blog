<script lang="ts">
  import Pagination from '$lib/components/Pagination.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import TagPill from '$lib/components/TagPill.svelte';
  import type { HomePagePayload } from '$lib/types/content';

  interface Props {
    data: HomePagePayload;
  }

  let { data }: Props = $props();

  const isFirstPage = $derived(data.pagination.page === 1);
  const pagePath = $derived(isFirstPage ? '/' : `/page/${data.pagination.page}/`);
  const pageTitle = $derived(isFirstPage ? undefined : `Page ${data.pagination.page}`);
  const pageDescription = $derived(
    isFirstPage
      ? 'A personal blog about algorithms, backend details, refactors, and implementation notes worth keeping.'
      : `Page ${data.pagination.page} of writing, sorted by written date descending.`
  );
</script>

<Seo description={pageDescription} path={pagePath} title={pageTitle} />

{#if isFirstPage}
  <section class="hero">
    <div class="hero__panel">
      <div class="hero__copy">
        <span class="hero__eyebrow">Latest-first technical writing</span>
        <h1>Notes that still make sense after studying.</h1>
        <p>
          A personal blog about algorithms, lightweight kubernetes, Ai-agent, backend details, refactors, and the implementation
          details that are easy to forget once the task is over.
        </p>
        <div class="hero__actions">
          <a class="button-link button-link--solid" href="/archive/">Browse the archive</a>
          <a class="button-link button-link--ghost" href="/about/">Read the about page</a>
        </div>
      </div>
    </div>

    <aside class="hero__aside">
      <div class="profile-card">
        <img alt="Youngjin Kim" class="profile-card__image" src="/avatar.jpeg" />
        <div class="profile-card__body">
          <div>
            <p class="meta-kicker">Notebook owner</p>
            <h2 class="profile-card__title">Youngjin Kim</h2>
          </div>
          <p>Compact notes for code, systems, and tool changes.</p>
          <a
            class="inline-link"
            href="https://github.com/Youngjin-KimY"
            rel="noreferrer"
            target="_blank"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div class="stat-grid">
        <article class="stat-card">
          <strong>{data.totalPosts}</strong>
          <p>total posts</p>
        </article>
        <article class="stat-card">
          <strong>{data.totalTags}</strong>
          <p>tag topics</p>
        </article>
      </div>
    </aside>
  </section>
{/if}

{#if isFirstPage && data.featured}
  <section class="section">
    <div class="section-heading">
      <div>
        <span class="section-heading__eyebrow">Start Here</span>
        <h2>Latest post on top</h2>
      </div>
      <p>The newest entry stays highlighted first, and older posts continue through paginated pages.</p>
    </div>

    <PostCard featured index={0} post={data.featured} />
  </section>
{/if}

<section class="section">
  <div class="section-heading">
    <div>
      <span class="section-heading__eyebrow">{isFirstPage ? 'Recent Writing' : 'More Writing'}</span>
      <h2>{isFirstPage ? 'Latest posts' : `Page ${data.pagination.page}`}</h2>
    </div>
    <p>
      {#if isFirstPage}
        The home page shows a focused set of recent posts, while older writing continues through pagination and the archive.
      {:else}
        Older writing continues here, still sorted by written date descending.
      {/if}
    </p>
  </div>

  <div class="post-grid">
    {#each data.items as post, index}
      <PostCard index={index + 1} {post} />
    {/each}
  </div>

  <Pagination pagination={data.pagination} />
</section>

{#if isFirstPage}
  <section class="section">
    <div class="section-heading">
      <div>
        <span class="section-heading__eyebrow">Topics</span>
        <h2>Popular tags</h2>
      </div>
      <p>Tags replace the old category-first theme navigation and match the current content better.</p>
    </div>

    <div class="tag-list">
      {#each data.tags as tag}
        <TagPill href={`/tags/${tag.slug}/`} label={`${tag.name} · ${tag.count}`} />
      {/each}
    </div>
  </section>
{/if}
