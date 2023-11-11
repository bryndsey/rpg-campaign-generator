import { oneOf } from "aimless.js";

const names = ["Bryan", "Rachel", "Jameson", "Dean"];

export function getRandomName() {
  return oneOf(names);
}
