<script lang="ts">
  import type { ResponseBody } from "./types/ResponseBody";

  let data: ResponseBody | undefined;
  let loading = false;
  let toneInput: string;
  const handleClick = async () => {
    loading = true;
    try {
      data = await fetch(`./story-${toneInput}`).then((x) => x.json());
    } catch {
      data = {
        result: "error",
        message: "Ran into an unexpected error. Try again",
      };
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <div class="input-area">
    <input bind:value={toneInput} />
    <button on:click={handleClick}>Submit</button>
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if data}
    {#if data.result === "error"}
      <p>An error occurred.</p>
      <p>{data.message}</p>
    {:else}
      <p>{data.tone}</p>
      <p>{data.content.theme}</p>
      <p>{data.content.story}</p>
    {/if}
  {/if}
</div>
