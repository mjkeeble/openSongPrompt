import { ACTIVEKEYS, LYRIC_PAGE_MODES, TEXT_SIZES, BREAK } from './const';

export type TGig = {
  id: string;
  venue: string;
  town: string;
  dateTime: string;
  setlist: number[][];
};

export type TSong = {
  id: number;
  title: string;
  writtenBy: string[];
  gemaWerknummer?: string;
  duration?: {
    minutes: number;
    seconds: number;
  };
  lineup?: string;
  scale?: string;
  tempo?: number;
  timeSignature?: string;
  setup?: string;
  config?: TSongConfig;
  pages: TLyricPage[];
  version?: string;
  notes?: string;
};

export type TLyricPage = {
  chords: string[][];
  section: string;
  lyrics: string[];
  duration?: number; // in bars
};

export type TAction = {
  keyPressed: string | null;
  isLongPress: boolean;
};

export type TBreak = typeof BREAK;

export type TSetlist = (number | TBreak)[];

export type TRepertoireList = string[];

export type TInput = (typeof ACTIVEKEYS)[number] | null;

export type TMode = (typeof LYRIC_PAGE_MODES)[number];

type TLyricPaneSize = 3 | 4 | 5 | 6 | 7;

export type TConfig = {
  lyricPageMode?: TMode; // display mode for lyrics page
  chordPaneSize?: TLyricPaneSize; // portion of screen for lyrics (x/12)
  portrait: boolean; // screen orientation
  chordFontSize?: (typeof TEXT_SIZES)[number]; // size of chord text
  lyricMinFontSize: number; // min size of lyric text
  lyricMaxFontSize: '100' | '150' | '250'; // max size of lyric text
};

export type TSongConfig = {
  lyricPageMode?: TMode; // display mode for lyrics page
  chordPaneSize?: TLyricPaneSize; // portion of screen for lyrics (x/12)
};

export type symbolKeys =
  | 'backward'
  | 'backwardFast'
  | 'backwardStep'
  | 'down'
  | 'forward'
  | 'forwardFast'
  | 'forwardStep'
  | 'pause'
  | 'point'
  | 'play'
  | 'stop'
  | 'up'
  | undefined;

export type SongAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_WRITTEN_BY'; payload: string[] }
  | { type: 'SET_GEMA_WERKNUMMER'; payload: string }
  | { type: 'SET_DURATION'; payload: { minutes: number; seconds: number } }
  | { type: 'SET_LINEUP'; payload: string }
  | { type: 'SET_KEY'; payload: string }
  | { type: 'SET_TEMPO'; payload: number }
  | { type: 'SET_TIME_SIGNATURE'; payload: string }
  | { type: 'SET_SETUP'; payload: string }
  | { type: 'SET_CONFIG'; payload: TSongConfig }
  | { type: 'ADD_PAGE'; payload: TLyricPage }
  | { type: 'REMOVE_PAGE'; payload: number }
  | { type: 'SET_PAGE'; payload: { index: number; page: TLyricPage } };
