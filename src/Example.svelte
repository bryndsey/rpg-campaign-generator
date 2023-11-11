<script lang="ts">
  import { getRandomClass, getRandomName, getRandomRace } from "./data";

  let currentName = getRandomName();
  let currentClass = getRandomClass();
  let currentRace = getRandomRace();

  function roll() {
    currentName = getRandomName();
    currentClass = getRandomClass();
    currentRace = getRandomRace();
  }
</script>

<div class="myText">
  <h1>Hello, {currentName}!</h1>
  <h2>{currentRace} {currentClass}</h2>
  <button on:click={roll}>Re-roll</button>
</div>

<style>
  .myText {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
