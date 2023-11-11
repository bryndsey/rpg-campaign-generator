import { oneOf, weighted } from "aimless.js";

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
