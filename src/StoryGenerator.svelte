<script lang="ts">
  let data;
  let toneInput: string;
  const handleClick = async () => {
    data = await fetch(`./story-${toneInput}`).then((x) => x.json());
  };
</script>

<div class="container">
  <div class="input-area">
    <input bind:value={toneInput} />
    <button on:click={handleClick}>Submit</button>
  </div>

  {#if data && data.result}
    <p>{data.params.tone}</p>
    <p>{data.result.theme}</p>
    <p>{data.result.story}</p>
  {/if}
</div>
