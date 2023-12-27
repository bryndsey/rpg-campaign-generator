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

<div class="container">
  <h1>RPG Campaign Generator</h1>
  <label id="prompt-label"
    >Enter a prompt
    <div class="input-area">
      <input
        bind:value={toneInput}
        disabled={loading}
        maxlength={MAX_INPUT_CHARACTERS}
        placeholder="e.g. 'Dark', 'Banana', 'Tuesday', 'Yellow', etc."
      />
      <button on:click={handleClick} disabled={loading}>Submit</button>
    </div>
  </label>

  <div class="output-container">
    <div class="metadata">
      <div>
        <h3>Input</h3>
        <p>
          {data && data.result === "success" && data.tone
            ? data.tone
            : "Input a prompt"}
        </p>
      </div>
      <div>
        <h3>Theme</h3>
        <p>
          {data && data.result === "success" && data.content.theme
            ? data.content.theme
            : "Input a prompt to generate a theme"}
        </p>
      </div>
    </div>
    <div class="result-container">
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
          <p class="plot">{data.content.story}</p>
        {/if}
      {:else}
        <p>Input a prompt as a starting point for your campaign plot.</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    margin: auto;
    padding: 32px;
  }

  p {
    white-space: pre-line;
  }

  .input-area {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .input-area > input {
    flex: 1;
    max-width: 60ch;
  }

  .output-container {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    gap: 16px;
  }

  .metadata {
    display: flex;
    gap: 8px;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
  }

  .metadata > * {
    padding: 16px;
    border: 2px solid lightgrey;
    border-radius: 8px;
  }

  .result-container {
    flex: 1;
    margin-inline: auto;
  }

  .plot {
    max-width: 50ch;
  }
</style>
