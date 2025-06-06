import { User } from "@/models";
import { getLevel } from "./user";

export const SEEDS = ["tree", "sunflower", "corn", "daisy"];

export const getSeed = (user: User): string => {
  if (!user.daily) return SEEDS[0];

  const { mathLevel, writingLevel } = getLevel(user.daily);
  const level = mathLevel + writingLevel;

  const random = Math.random();

  const possibilities = [0.5, 0.3, 0.15, 0.05];

  // possibilities[3] = possibilities[3] * level > 0.1 ? 0.1 : possibilities[3] * level;
  // possibilities[2] = possibilities[2] * level > 0.2 ? 0.2 : possibilities[2] * level;
  // possibilities[1] = possibilities[1] * level > 0.3 ? 0.3 : possibilities[1] * level;
  // possibilities[0] = 1 - possibilities[3] - possibilities[2] - possibilities[1];

  if (random < possibilities[0]) return SEEDS[0];
  else if (random < possibilities[0] + possibilities[1]) return SEEDS[1];
  else if (random < possibilities[0] + possibilities[1] + possibilities[2])
    return SEEDS[2];
  else return SEEDS[3];
};

export const getCollections = (collections: string) => {
  const arr = JSON.parse(collections);

  const map = new Map();
  for (let obj of arr) {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    map.set(key, value);
  }

  return map;
};

export const convertCollectionsToString = (map: Map<string, number>) => {
  const array = [];

  for (let [key, value] of map) {
    array.push(`{"${key}": ${value}}`);
  }

  return `[${array.join(",")}]`;
};
