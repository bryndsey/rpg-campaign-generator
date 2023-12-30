<script lang="ts">
  import Footer from "./Footer.svelte";

  import { tones } from "./types/tones";
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import type { ResponseBody } from "./types/ResponseBody";

  let data: ResponseBody | undefined;
  let loading = false;
  let tone: "Unspecified";
  let topic: string | undefined;
  const handleClick = async () => {
    loading = true;
    data = undefined;
    try {
      const queryParams = new URLSearchParams();
      if (tone !== "Unspecified") {
        queryParams.append("tone", tone);
      }
      if (topic) {
        queryParams.append("topic", topic);
      }
      data = await fetch(`./story?${queryParams.toString()}`).then((x) =>
        x.json(),
      );
    } catch {
      data = {
        result: "error",
        error: "Ran into an unexpected error. Try again",
      };
    } finally {
      loading = false;
    }
  };
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
          {#if loading}
            <h2>Crafting campaign ideas. Please wait...</h2>
            <span class="loading loading-spinner"></span>
          {:else if data}
            {#if data.result === "error"}
              <p>An error occurred.</p>
              <p>
                {data.error instanceof Error
                  ? data.error.message
                  : typeof data.error === "string"
                    ? data.error
                    : typeof data.error === "object"
                      ? JSON.stringify(data.error)
                      : "Unknown error"}
              </p>
            {:else}
              <p class="m-auto max-w-prose">
                {data.content.story}
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
              disabled={loading}
              bind:value={tone}
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
              bind:value={topic}
              type="text"
              class="input input-bordered max-w-prose placeholder:opacity-60"
              disabled={loading}
              maxlength={MAX_INPUT_CHARACTERS}
              placeholder="e.g. 'Dragon', 'Yellow', 'Tuesday', etc."
            />
          </label>
        </div>
        <button
          class="btn mt-4 w-full"
          on:click={handleClick}
          disabled={loading}>Submit</button
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
