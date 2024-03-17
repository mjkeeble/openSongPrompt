export type TGig = {
  id: string;
  venue: string;
  town: string;
  dateTime: string;
  setlist: string[][];
};

export type TSong = {
  id: number;
  title: string;
  writtenBy: string[];
  gemaWerknummer?: string;
  duration_minutes: number;
  duration_seconds: number;
  lineup: string;
  key?: string;
  tempo: number;
  timeSignature: string;
  setup?: string;
  pages: TLyricPage[];
};

type TLyricPage = {
  chords: string[][];
  section: string;
  lyrics: string[];
  duration?: number; // in bars
};

export type TAction = {
  keyPressed: string | null;
  isLongPress: boolean;
};

export type TBreak = 'break';

export type TSetlist = (number | TBreak)[];

export type TRepertoireList = number[];
