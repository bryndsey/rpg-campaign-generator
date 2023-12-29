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

<div class="m-auto flex h-dvh max-h-dvh flex-col overflow-y-clip px-4 md:px-8">
  <header class="my-4">
    <h1 class="text-lg md:text-2xl">RPG Campaign Generator</h1>
  </header>
  <main class="flex flex-1 flex-col overflow-y-clip">
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

    <div
      class="mt-2 flex flex-1 flex-col gap-4 overflow-y-clip md:mt-8 md:flex-row"
    >
      <div
        class="grid w-full grid-cols-2 gap-2 md:flex md:max-w-xs md:flex-col"
      >
        <div class="card card-compact bg-base-content/5">
          <div class="card-body">
            <h3 class="card-title">Input</h3>
            <p>
              {data && data.result === "success" && data.tone
                ? data.tone
                : "Input a prompt"}
            </p>
          </div>
        </div>
        <div class="card card-compact bg-base-content/5">
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
    </div>
  </main>
  <footer class="footer footer-center p-4">
    <aside>
      <p class="whitespace-normal text-xs opacity-80">
        RPG Campaign Generator is meant to be used merely as a source of
        inspriation, and makes no copyright claims or warranties on the content
        generated. The content may not be entirely original or appropriate. Use
        at your own risk, and please use responsibly.
      </p>
    </aside>
  </footer>
</div>

<style>
  p {
    white-space: pre-line;
  }

  p.whitespace-normal {
    white-space: normal;
  }
</style>
