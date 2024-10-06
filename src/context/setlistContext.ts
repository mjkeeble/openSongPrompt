import { createContext, useContext } from 'react';
import {TSetlist} from 'src/types';

export type TGlobalSetlist = {
  setlist: TSetlist;
  setSetlist: (setlist: TSetlist) => void;
};

export const setlistContext = createContext<TGlobalSetlist>({
  setlist: [],
  setSetlist: () => {},
});

export const useSetlist = () => useContext(setlistContext);
