import { intRange, oneOf, weighted } from "aimless.js";
import { Chance } from "chance";

const chance = new Chance();

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

export const characterBackgrounds = [
  "Acolyte",
  "Charlatan",
  "Criminal",
  "Entertainer",
  "Folk Hero",
  "Gladiator",
  "Guild Artisan",
  "Guild Merchant",
  "Hermit",
  "Knight",
  "Noble",
  "Outlander",
  "Pirate",
  "Sage",
  "Sailor",
  "Soldier",
  "Spy",
  "Urchin",
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

function imaginaryName() {
  return chance.capitalize(chance.word());
}

const nameGenerationFunctions = [
  () => chance.name(),
  () => imaginaryName(),
  () => `${imaginaryName()} ${imaginaryName()}`,
  () => `${imaginaryName()} ${chance.last()}`,
  () => `${chance.first()} ${imaginaryName()}`,
  () => chance.first(),
  () => chance.last(),
];

export function getRandomName() {
  // return oneOf(names);
  // return chance.name();
  return oneOf(nameGenerationFunctions)();
}

export function getRandomClass() {
  return oneOf(characterClasses);
}

export function getRandomRace() {
  return oneOf(characterRaces);
}

export function getRandomBackground() {
  return oneOf(characterBackgrounds);
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
  // Roll 4d6
  const rolls = rollDice(4, 6);

  // Drop the lowest
  rolls.sort().splice(0, 1);

  // Return the sum
  return rolls.reduce((prev, curr) => prev + curr, 0);
}

export function getAbilities() {
  return abilityTypes.map(
    (ability) => [ability, getStartingAbilityScore()] as const
  );
}
