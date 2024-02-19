import { useContext } from 'react';
import { SongContext } from './songContext';

export const useGig = () => {
  return useContext(SongContext);
};

export const useSong = () => {
  return useContext(SongContext);
};
