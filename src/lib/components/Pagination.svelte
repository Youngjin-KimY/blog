<script lang="ts">
  import type { HomePagination } from '$lib/types/content';

  interface Props {
    pagination: HomePagination;
  }

  let { pagination }: Props = $props();
</script>

{#if pagination.totalPages > 1}
  <nav aria-label="Pagination" class="pagination">
    {#if pagination.prevHref}
      <a class="pagination__link pagination__link--edge" href={pagination.prevHref}>Newer</a>
    {/if}

    <div class="pagination__pages">
      {#each pagination.links as link}
        <a class:active={link.current} class="pagination__link" href={link.href}>
          {link.page}
        </a>
      {/each}
    </div>

    {#if pagination.nextHref}
      <a class="pagination__link pagination__link--edge" href={pagination.nextHref}>Older</a>
    {/if}
  </nav>
{/if}
