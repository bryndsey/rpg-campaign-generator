<script lang="ts">
  import Footer from "./Footer.svelte";
  import { fetchStory } from "./network/fetchStory";
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import { state, tone, topic } from "./stores/campaign";
  import { tones } from "./types/tones";
</script>

<div class="m-auto flex h-dvh max-h-dvh flex-col overflow-y-clip px-4 md:px-8">
  <header class="my-4">
    <h1 class="text-lg md:text-2xl">RPG Campaign Generator</h1>
  </header>
  <main class="flex flex-1 flex-col overflow-y-clip">
    <div
      class="mt-2 flex flex-1 flex-col gap-4 overflow-y-clip md:mt-8 md:flex-row"
    >
      <div
        class="card flex-1 overflow-y-clip bg-base-content/5 max-lg:card-compact"
      >
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
      <div class="w-full md:max-w-xs">
        <div class="flex flex-row gap-2 md:flex-col">
          <label class="form-control w-full max-md:flex-1">
            <div class="label">
              <span class="label-text">Tone</span>
            </div>
            <select
              class="select select-bordered"
              disabled={$state.state === "loading"}
              bind:value={$tone}
            >
              {#each tones as tone}
                <option>{tone}</option>
              {/each}
            </select>
          </label>

          <label class="form-control max-md:flex-1">
            <div class="label">
              <span class="label-text">Topic</span>
            </div>
            <input
              bind:value={$topic}
              type="text"
              class="input input-bordered max-w-prose placeholder:opacity-60"
              disabled={$state.state === "loading"}
              maxlength={MAX_INPUT_CHARACTERS}
              placeholder="e.g. 'Dragon', 'Yellow', 'Tuesday', etc."
            />
          </label>
        </div>
        <button
          class="btn mt-4 w-full"
          on:click={fetchStory}
          disabled={$state.state === "loading"}>Submit</button
        >
      </div>
    </div>
  </main>
  <Footer></Footer>
</div>

<style>
  p {
    white-space: pre-line;
  }
</style>
