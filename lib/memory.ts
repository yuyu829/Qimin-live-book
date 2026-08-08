import memoryData from "@/data/memories.json";
import type { CharacterProfile, LocationId, MemoryData, MemoryLocation } from "@/lib/types";

export const memory = memoryData as MemoryData;

export function getLocationById(id: string): MemoryLocation | undefined {
  return memory.locations.find((location) => location.id === id);
}

export function getCharacterById(id: string): CharacterProfile | undefined {
  return memory.characters.find((character) => character.id === id);
}

export function getCharacterForLocation(locationId: LocationId): CharacterProfile {
  const location = getLocationById(locationId);
  if (!location) {
    throw new Error(`Unknown location: ${locationId}`);
  }

  const character = getCharacterById(location.characterId);
  if (!character) {
    throw new Error(`Missing character for location: ${locationId}`);
  }

  return character;
}
