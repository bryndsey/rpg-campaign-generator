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
  <div class="input-area">
    <input
      bind:value={toneInput}
      disabled={loading}
      maxlength={MAX_INPUT_CHARACTERS}
    />
    <button on:click={handleClick} disabled={loading}>Submit</button>
  </div>

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
      <p>{data.tone}</p>
      <p>{data.content.theme}</p>
      <p>{data.content.story}</p>
    {/if}
  {/if}
</div>

<style>
  .container {
    max-width: 50ch;
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
  }
</style>
