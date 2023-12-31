<script lang="ts">
  import { state } from "./stores/campaign";
</script>

<div class="card w-full overflow-y-clip bg-base-content/5 max-lg:card-compact">
  <div class="card-body overflow-y-auto">
    {#if $state.state === "loading"}
      <h2>Crafting campaign ideas. Please wait...</h2>
      <span class="loading loading-spinner"></span>
    {:else if $state.state === "data"}
      {#if $state.data.result === "error"}
        <p>An error occurred.</p>
        <p>
          {$state.data.error instanceof Error
            ? $state.data.error.message
            : typeof $state.data.error === "string"
              ? $state.data.error
              : typeof $state.data.error === "object"
                ? JSON.stringify($state.data.error)
                : "Unknown error"}
        </p>
      {:else}
        <p class="m-auto max-w-prose">
          {$state.data.content.story}
        </p>
      {/if}
    {:else}
      <p>Input a prompt as a starting point for your campaign plot.</p>
    {/if}
  </div>
</div>

<style>
  p {
    white-space: pre-line;
  }
</style>
