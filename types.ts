export type TGig = {
  id: number;
  location: string;
  date: string;
  setList: string[];
};

export type TSong = {
  meta: TSongMetadata;
  effects?: TEffectSettings;
  amp?: TAmpSettings;
  pages: {
    section?: string;
    chords?: TChordSection[];
    lyrics?: string[];
  }[];
};
export type TSongMetadata = {
  title: string;
  key: string;
  countTempo?: number;
  timeSignature?: string;
  countIn?: string[];
  by?: {
    lyrics: string;
    music: string;
  };
  gemaRef?: string;
};

export type TEffectSettings = {
  soulFood: boolean;
  twoKingsLeft: boolean;
  twoKingsRight: boolean;
  delay: boolean;
  reverb: boolean;
};

export type TAmpSettings = {
  master?: number;
  reverb?: number;
  tremolo?: TAmpTremeloOn;
  tone?: number;
  volume?: number;
  nfb: boolean;
};

export type TAmpTremeloOn = {
  speed: number;
  intensity: boolean;
};

export type TChordSection = {
  section: string;
  chords: string[][];
};
