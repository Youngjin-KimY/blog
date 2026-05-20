<script lang="ts">
  import { page } from '$app/state';
  import { site } from '$lib/site';
  import '../app.css';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();

  const navigation = [
    { href: '/', label: 'Home' },
    { href: '/archive/', label: 'Archive' },
    { href: '/tags/', label: 'Tags' },
    { href: '/about/', label: 'About' }
  ];

  function isActive(href: string): boolean {
    if (href === '/') {
      return page.url.pathname === href;
    }

    return page.url.pathname.startsWith(href);
  }
</script>

<div class="app-shell">
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="/">
        <span class="brand__eyebrow">Engineering Notes</span>
        <span class="brand__title">{site.title}</span>
      </a>

      <nav aria-label="Primary" class="site-nav">
        {#each navigation as item}
          <a class:active={isActive(item.href)} href={item.href}>{item.label}</a>
        {/each}
      </nav>
    </div>
  </header>

  <main class="page-frame">
    {@render children()}
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <span>
        {site.title} by <a href={site.github} rel="noreferrer" target="_blank">{site.author}</a>
      </span>
      <span>Built with SvelteKit, TypeScript, and GitHub Pages.</span>
    </div>
  </footer>
</div>
