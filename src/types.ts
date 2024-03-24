import { ACTIVEKEYS, LYRIC_PAGE_MODES, TEXT_SIZES } from './const';

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
  config?: TConfig;
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

export type TInput = (typeof ACTIVEKEYS)[number] | null;

export type TMode = (typeof LYRIC_PAGE_MODES)[number];

type TLyricPaneSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TConfig = {
  lyricPageMode?: TMode; // display mode for lyrics page
  lyricPaneSize?: TLyricPaneSize; // portion of screen for lyrics (x/12)
  orientation?: string; // screen orientation
  chordSize?: (typeof TEXT_SIZES)[number]; // size of chord text
  lyricSize?: (typeof TEXT_SIZES)[number]; // size of lyric text
};
