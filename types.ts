export type TSetList = string[];

export type TSong = {
  meta: TSongMetadata;
  effects?: TEffectSettings;
  amp?: TAmpSettings;
  song: TSongWithChordPage | TLyricsSectionWithChords[] | TLyricsSection[];
};
export type TSongMetadata = {
  title: string;
  key: string;
  tempo?: number;
  timeSignature?: string;
  countIn?: string[];
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

type TAmpTremeloOn = {
  speed: number;
  intensity: boolean;
};

type TLyricsSection = {
  section: string;
  lyrics?: string[];
};
type TLyricsSectionWithChords = TLyricsSection & {
  chords: string[][];
};

type TChordSection = {
  section: string;
  chords: string[][];
};

type TSongWithChordPage = {
  chords: TChordSection[];
  lyrics: TLyricsSection[];
};
