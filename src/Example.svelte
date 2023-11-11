<script lang="ts">
  import {
    getAbilities,
    getRandomAlignment,
    getRandomClass,
    getRandomName,
    getRandomRace,
    getStartingAbilityScore,
  } from "./data";

  let currentName = getRandomName();
  let currentClass = getRandomClass();
  let currentRace = getRandomRace();
  let currentAlignment = getRandomAlignment();

  let abilities = getAbilities();

  function roll() {
    currentName = getRandomName();
    currentClass = getRandomClass();
    currentRace = getRandomRace();
    currentAlignment = getRandomAlignment();

    abilities = getAbilities();
  }
</script>

<div class="myText">
  <h1>Hello, {currentName}!</h1>
  <h2>{currentRace} {currentClass}</h2>
  <h3>{currentAlignment}</h3>
  <ul>
    {#each abilities as ability}
      <li>{ability[0]}: {ability[1]}</li>
    {/each}
  </ul>
  <button on:click={roll}>Re-roll</button>
</div>

<style>
  .myText {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
