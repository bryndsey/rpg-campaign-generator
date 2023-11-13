<script lang="ts">
  import {
    getAbilities,
    getRandomAlignment,
    getRandomBackground,
    getRandomClass,
    getRandomName,
    getRandomRace,
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

<div class="myText characterContainer">
  <h1>{currentName}</h1>
  <div class="detailContainer">
    <p>{currentClass}</p>
    <p>{currentBackground}</p>
    <p>{currentRace}</p>
    <p>{currentAlignment}</p>
  </div>
</div>
<ul class="abilityList">
  {#each abilities as [ability, score] (ability)}
    <li class="abilityItem">
      <p class="abilityHeader">{ability.toUpperCase()}</p>
      <p class="abilityValue">{score}</p>
    </li>
  {/each}
</ul>
<button on:click={roll}>Re-roll</button>

<style>
  .myText {
    font-family: Arial, Helvetica, sans-serif;
  }

  .characterContainer {
    gap: 16px;
    padding: 16px;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }

  .detailContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: 2px solid black;
    padding: 8px;
  }

  .abilityList {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    width: fit-content;
  }

  .abilityItem {
    list-style-type: none;
    text-align: center;
    line-height: 0;
  }

  .abilityHeader {
    font-size: 0.75rem;
  }

  .abilityValue {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
