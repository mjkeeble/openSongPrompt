import { SetlistContext, SongContext } from '@context/index';
import { useContext } from 'react';

export const useSetlist = () => {
  return useContext(SetlistContext);
};

export const useSong = () => {
  return useContext(SongContext);
};
