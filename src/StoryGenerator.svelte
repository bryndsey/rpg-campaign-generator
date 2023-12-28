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

<div
  class="container m-auto flex h-dvh max-h-dvh flex-col overflow-hidden px-8"
>
  <header class="my-4">
    <h1 class="text-2xl">RPG Campaign Generator</h1>
  </header>
  <main class="flex flex-1 flex-col overflow-hidden">
    <label class="form-control">
      <div class="label">
        <span class="label-text"> Enter a prompt </span>
      </div>
      <div class="flex flex-row gap-2">
        <input
          class="input input-bordered max-w-prose flex-1"
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

    <div class="mt-8 flex flex-1 flex-row gap-4 overflow-hidden">
      <div class="flex w-full max-w-xs flex-col gap-2">
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
      <div class="card card-bordered flex-1">
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
    </div>
  </main>
  <footer class="footer footer-center p-4 text-base-content">
    <aside>
      <p>
        RPG Campaign Generator is meant to be used strictly as a source of
        inspriation. It makes no copyright claims or warranties on the content
        generated. The content is provided by third-party sources, and could
        contain inappropriate content or content based on existing copyrights.
        Use at your own risk, and please use responsibly.
      </p>
    </aside>
  </footer>
</div>

<style>
  p {
    white-space: pre-line;
  }
</style>
