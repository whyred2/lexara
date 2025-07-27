import { prisma } from "@/lib/prisma";

const adjectives = [
  "Swift",
  "Bright",
  "Cool",
  "Smart",
  "Quick",
  "Sharp",
  "Bold",
  "Fast",
  "Wise",
  "Clear",
  "Pure",
  "Fresh",
  "Wild",
  "Free",
  "True",
  "Kind",
  "Calm",
  "Warm",
  "Dark",
  "Light",
  "Deep",
  "High",
  "Blue",
  "Gold",
];

const nouns = [
  "Wolf",
  "Eagle",
  "Tiger",
  "Lion",
  "Bear",
  "Fox",
  "Hawk",
  "Storm",
  "Star",
  "Moon",
  "Sun",
  "Fire",
  "Wave",
  "Wind",
  "Rock",
  "Tree",
  "River",
  "Sky",
  "Ocean",
  "Mountain",
  "Thunder",
  "Lightning",
  "Snow",
  "Rain",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomNumber(): string {
  return Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
}

export async function generateUniqueNickname(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    const number = generateRandomNumber();

    const nickname = `${adjective}${noun}${number}`;

    const existingUser = await prisma.user.findUnique({
      where: { nickname },
    });

    if (!existingUser) {
      return nickname;
    }

    attempts++;
  }

  return `User${Date.now()}`;
}
