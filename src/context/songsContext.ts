import { createContext, useContext } from 'react';
import { TSong } from 'src/types';

export type TSongDetails = {
  songs: TSong[];
  setSongDetails: (songs: TSong[]) => void;
};

export const songsContext = createContext<TSongDetails>({
  songs: [],
  setSongDetails: () => {},
});

export const useSongs = () => useContext(songsContext);
