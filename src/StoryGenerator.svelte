<script lang="ts">
  let data;
  let loading = false;
  let toneInput: string;
  const handleClick = async () => {
    loading = true;
    try {
      data = await fetch(`./story-${toneInput}`).then((x) => x.json());
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
  {:else if data && data.result}
    <p>{data.params.tone}</p>
    <p>{data.result.theme}</p>
    <p>{data.result.story}</p>
  {/if}
</div>
