<script lang="ts">
  import { getRandomName } from "./data";

  let currentName = getRandomName();

  function getNewName() {
    currentName = getRandomName();
  }
</script>

<div>
  <h1>Hello, {currentName}!</h1>
  <button on:click={getNewName}>Get new name</button>
</div>
