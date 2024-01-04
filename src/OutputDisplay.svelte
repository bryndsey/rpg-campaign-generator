<script lang="ts">
  import { state } from "./stores/campaign";
  import Markdown from "svelte-exmarkdown";

  const devMode = import.meta.env.DEV;

  let showCopiedAlert = false;

  async function copyStoryToClipboard(story: string) {
    try {
      await navigator.clipboard.writeText(story);

      showCopiedAlert = true;
      setTimeout(() => {
        showCopiedAlert = false;
      }, 5000);
    } catch (error) {
      console.log(error);
      showCopiedAlert = false;
    }
  }
</script>

<div class="card w-full overflow-y-clip bg-base-content/5 max-lg:card-compact">
  <div class="card-body relative overflow-y-auto">
    {#if $state.state === "loading"}
      <div class="grid h-full place-content-center place-items-center gap-4">
        <h2>Crafting campaign ideas. Please wait...</h2>
        <span class="loading loading-spinner"></span>
      </div>
    {:else if $state.state === "data"}
      {#if $state.data.result === "error"}
        <div
          class="grid h-full place-content-center place-items-center gap-4 text-balance text-center"
        >
          <h2 class="text-2xl">Looks like we rolled a Nat 1...</h2>
          {#if $state.data.errorCause === "INVALID INPUT" || $state.data.errorCause === "SAFETY"}
            <p class="m-auto max-w-prose">{$state.data.errorMessage}</p>
          {:else}
            <p>An error occurred trying to generate your campaign idea.</p>
            {#if devMode}
              <p>
                {$state.data.errorMessage}
              </p>
            {/if}
          {/if}
        </div>
      {:else}
        {@const story = $state.data.content.story}
        <button
          class="btn btn-xs sticky top-0 self-end"
          on:click={() => copyStoryToClipboard(story)}>Copy to clipboard</button
        >
        <div class="prose m-auto max-w-prose">
          <Markdown md={story} />
        </div>
      {/if}
    {:else}
      <div
        class="m-auto grid h-full max-w-prose place-content-center gap-2 p-4 text-center"
      >
        <h2 class="text-balance text-3xl font-semibold">
          Welcome to RPG Gampaign Creator
        </h2>
        <h3 class="mt-4 text-balance">
          Use AI to generate ideas for your next RPG campaign
        </h3>
      </div>
    {/if}
  </div>
  {#if showCopiedAlert}
    <div class="toast fixed z-10">
      <div class="alert">
        <span>Copied to clipboard</span>
      </div>
    </div>
  {/if}
</div>
