import { atom } from "nanostores";
import { type Tone } from "../types/tones";

export const topic = atom<string | undefined>(undefined);

export const tone = atom<Tone>("Unspecified");
