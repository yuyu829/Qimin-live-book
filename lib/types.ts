export type LocationId = "kopitiam" | "grocery" | "bus-stop";

export type MapPosition = {
  x: number;
  y: number;
};

export type MemoryArtifact = {
  title: string;
  text: string;
};

export type MemoryLocation = {
  id: LocationId;
  name: string;
  year: number;
  characterId: string;
  mapPosition: MapPosition;
  summary: string;
  visual: {
    image: string;
    caption: string;
  };
  fragments: string[];
  artifacts: MemoryArtifact[];
  echoes: string[];
  promptSuggestions: string[];
};

export type CharacterProfile = {
  id: string;
  name: string;
  letterName: string;
  year: number;
  background: string;
  personality: string;
  known_information: string[];
  hidden_emotion: string;
  speech_style: string;
  life_details: string[];
};

export type TimelineNode = {
  year: number;
  title: string;
  locationId: LocationId;
  characterId: string;
  connection: string;
};

export type MemoryData = {
  project: {
    title: string;
    pitch: string;
    streetDescription: string;
  };
  locations: MemoryLocation[];
  characters: CharacterProfile[];
  timeline: TimelineNode[];
};

export type LetterReflection = {
  written: string;
  unwritten: string;
  pressure: string;
};
