<script lang="ts">
  import {
    getRandomAlignment,
    getRandomClass,
    getRandomName,
    getRandomRace,
  } from "./data";

  let currentName = getRandomName();
  let currentClass = getRandomClass();
  let currentRace = getRandomRace();
  let currentAlignment = getRandomAlignment();

  function roll() {
    currentName = getRandomName();
    currentClass = getRandomClass();
    currentRace = getRandomRace();
    currentAlignment = getRandomAlignment();
  }
</script>

<div class="myText">
  <h1>Hello, {currentName}!</h1>
  <h2>{currentRace} {currentClass}</h2>
  <h3>{currentAlignment}</h3>
  <button on:click={roll}>Re-roll</button>
</div>

<style>
  .myText {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
