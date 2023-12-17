<script lang="ts">
  let data: string;
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

  <p>
    {JSON.stringify(data)}
  </p>
</div>
