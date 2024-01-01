<script lang="ts">
  import { state } from "./stores/campaign";

  const devMode = import.meta.env.DEV;
</script>

<div class="card w-full overflow-y-clip bg-base-content/5 max-lg:card-compact">
  <div class="card-body overflow-y-auto">
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
        <p class="m-auto max-w-prose whitespace-pre-line">
          {$state.data.content.story}
        </p>
      {/if}
    {:else}
      <div
        class="m-auto grid h-full max-w-prose place-content-center gap-2 text-center"
      >
        <h2 class="text-2xl">Welcome to RPG Gampaign Creator</h2>
        <p>
          This tool can help generate ideas for your next RPG campaign using AI.
        </p>
        <p>
          If you want to customize the campaign the AI creates, use the settings
          to tell the tool what you're looking for.
        </p>
      </div>
    {/if}
  </div>
</div>
