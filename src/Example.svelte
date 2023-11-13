<script lang="ts">
  import {
    getAbilities,
    getRandomAlignment,
    getRandomBackground,
    getRandomClass,
    getRandomName,
    getRandomRace,
    getStartingAbilityScore,
  } from "./data";

  let currentName = getRandomName();
  let currentClass = getRandomClass();
  let currentRace = getRandomRace();
  let currentBackground = getRandomBackground();
  let currentAlignment = getRandomAlignment();

  let abilities = getAbilities();

  function roll() {
    currentName = getRandomName();
    currentClass = getRandomClass();
    currentRace = getRandomRace();
    currentBackground = getRandomBackground();
    currentAlignment = getRandomAlignment();

    abilities = getAbilities();
  }
</script>

<div class="myText">
  <h1>{currentName}</h1>
  <h2>{currentRace} {currentClass}</h2>
  <h3>{currentBackground}</h3>
  <h3>{currentAlignment}</h3>
  <ul>
    {#each abilities as [ability, score] (ability)}
      <li>{ability}: {score}</li>
    {/each}
  </ul>
  <button on:click={roll}>Re-roll</button>
</div>

<style>
  .myText {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
