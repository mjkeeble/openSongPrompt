import config from '../../../data/config.json';

export const getScreenSplit = (
  screenSplitSettingForSong: number | undefined,
  pageHasChords: boolean,
  pageHasLyrics: boolean,
): number => {
  if (!pageHasChords && !pageHasLyrics) {
    return screenSplitSettingForSong || Number(config.chordPaneSize);
  }
  if (!pageHasChords) return 0;

  if (!pageHasLyrics) return 12;

  return Number(screenSplitSettingForSong || config.chordPaneSize || 6);
};
