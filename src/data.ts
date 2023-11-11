import { intRange, oneOf, weighted } from "aimless.js";

export const names = ["Bryan", "Rachel", "Jameson", "Dean", "Sherlock"];

export const characterClasses = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

export const characterRaces = [
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Fairy",
  "Gnome",
  "Goblin",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Orc",
  "Tiefling",
];

const characterAlignments = [
  "Lawful good",
  "Neutral good",
  "Chaotic good",
  "Lawful neutral",
  "True neutral",
  "Chaotic neutral",
  "Lawful evil",
  "Neutral evil",
  "Chaotic evil",
  "Unaligned",
];

const alignmentWeights = Array(characterAlignments.length).fill(10);
alignmentWeights[characterAlignments.length - 1] = 1;

const abilityTypes = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export function getRandomName() {
  return oneOf(names);
}

export function getRandomClass() {
  return oneOf(characterClasses);
}

export function getRandomRace() {
  return oneOf(characterRaces);
}

export function getRandomAlignment() {
  // @ts-expect-error
  return weighted(characterAlignments, alignmentWeights);
}

export function rollDice(diceCount: number, diceSides: number): number[] {
  return Array(diceCount)
    .fill(diceSides)
    .map((max) => intRange(1, max));
}

export function getStartingAbilityScore() {
  const rolls = rollDice(4, 6).sort();
  rolls.splice(0, 1);

  return rolls.reduce((prev, curr) => prev + curr, 0);
}

export function getAbilities() {
  return abilityTypes.map(
    (ability) => [ability, getStartingAbilityScore()] as const
  );
}
