import { oneOf } from "aimless.js";

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

export function getRandomName() {
  return oneOf(names);
}

export function getRandomClass() {
  return oneOf(characterClasses);
}

export function getRandomRace() {
  return oneOf(characterRaces);
}
