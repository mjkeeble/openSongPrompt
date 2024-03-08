import { GigContext, SongContext } from '@context/index';
import { useContext } from 'react';

export const useGig = () => {
  return useContext(GigContext);
};

export const useSong = () => {
  return useContext(SongContext);
};
