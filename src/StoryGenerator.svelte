<script lang="ts">
  import { MAX_INPUT_CHARACTERS } from "./pages/story";
  import type { ResponseBody } from "./types/ResponseBody";

  let data: ResponseBody | undefined;
  let loading = false;
  let toneInput: string;
  const handleClick = async () => {
    loading = true;
    try {
      data = await fetch(`./story?tone=${toneInput}`).then((x) => x.json());
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

<main class="container m-auto p-8">
  <h1>RPG Campaign Generator</h1>
  <label
    >Enter a prompt
    <div class="flex flex-row gap-2">
      <input
        class="input input-bordered flex-1 max-w-prose"
        bind:value={toneInput}
        disabled={loading}
        maxlength={MAX_INPUT_CHARACTERS}
        placeholder="e.g. 'Dark', 'Banana', 'Tuesday', 'Yellow', etc."
      />
      <button class="btn" on:click={handleClick} disabled={loading}
        >Submit</button
      >
    </div>
  </label>

  <div class="flex flex-row gap-4 mt-8">
    <div class="metadata flex flex-col gap-2 max-w-xs w-full">
      <div class="card card-bordered">
        <div class="card-body">
          <h3 class="card-title">Input</h3>
          <p>
            {data && data.result === "success" && data.tone
              ? data.tone
              : "Input a prompt"}
          </p>
        </div>
      </div>
      <div class="card card-bordered">
        <div class="card-body">
          <h3 class="card-title">Theme</h3>
          <p>
            {data && data.result === "success" && data.content.theme
              ? data.content.theme
              : "Input a prompt to generate a theme"}
          </p>
        </div>
      </div>
    </div>
    <div class="flex-1">
      {#if loading}
        <h2>Crafting campaign ideas. Please wait...</h2>
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
          <p class="max-w-prose">{data.content.story}</p>
        {/if}
      {:else}
        <p>Input a prompt as a starting point for your campaign plot.</p>
      {/if}
    </div>
  </div>
</main>

<style>
  p {
    white-space: pre-line;
  }
</style>
