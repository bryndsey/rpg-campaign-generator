export const tones = [
  "Unspecified",
  "Adventurous",
  "Ambiguous",
  "Cheerful",
  "Dark",
  "Dynamic",
  "Eerie",
  "Enchanting",
  "Energetic",
  "Enigmatic",
  "Epic",
  "Funny",
  "Gloomy",
  "Gritty",
  "Haunting",
  "Intense",
  "Irreverent",
  "Jubilant",
  "Lighthearted",
  "Melancholic",
  "Mysterious",
  "Pensive",
  "Playful",
  "Puzzling",
  "Quirky",
  "Sardonic",
  "Sensual",
  "Silly",
  "Surreal",
  "Suspenseful",
  "Tense",
  "Tragic",
  "Tranquil",
  "Uplifting",
  "Vibrant",
  "Whimsical",
  "Wistful",
  "Witty",
] as const;

export type Tone = (typeof tones)[number];
