<script lang="ts">
  interface Props {
    href: string;
    label: string;
    muted?: boolean;
  }

  let { href, label, muted = false }: Props = $props();
</script>

<a class:tag-pill--soft={muted} class="tag-pill" {href}>
  #{label}
</a>
