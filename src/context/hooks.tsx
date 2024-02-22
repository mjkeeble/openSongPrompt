import { useContext } from 'react';
import {SongContext} from '.';
import {GigContext} from '.';


export const useGig = () => {
  return useContext(GigContext);
};

export const useSong = () => {
  return useContext(SongContext);
};
