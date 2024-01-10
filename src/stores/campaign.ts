import { atom } from "nanostores";
import { type Tone } from "../types/tones";
import { type CampaignState } from "../types/CampaignState";
import type { Setting } from "../types/settings";

export const topic = atom<string | undefined>(undefined);

export const tone = atom<Tone>("Unspecified");

export const setting = atom<Setting>("Unspecified");

export const state = atom<CampaignState>({ state: "initial" });
