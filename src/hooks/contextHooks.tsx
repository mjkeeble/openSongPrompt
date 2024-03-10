import { SetlistContext, SongContext } from '@context/index';
import { useContext } from 'react';

export const useSetList = () => {
  return useContext(SetlistContext);
};

export const useSong = () => {
  return useContext(SongContext);
};
