import { SongContext } from '@context/index';
import { useContext } from 'react';

export const useSong = () => {
  return useContext(SongContext);
};
