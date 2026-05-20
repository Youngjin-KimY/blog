<script lang="ts">
  let { error, status }: { error: Error; status: number } = $props();
</script>

<section class="section">
  <div class="empty-state">
    <span class="section-heading__eyebrow">Error {status}</span>
    <h1 class="profile-card__title">That page is not available.</h1>
    <p>{error.message}</p>
    <p><a class="inline-link" href="/">Return home</a></p>
  </div>
</section>
