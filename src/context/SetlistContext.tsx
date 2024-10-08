import { createContext, ReactNode, useEffect, useState } from 'react';
import { TSetlist } from 'src/types';

export type TGlobalSetlist = {
  setlist: TSetlist;
  setSetlist: (setlist: TSetlist) => void;
};

const LOCAL_STORAGE_KEY = 'setlist';

const getSetlist = (): TSetlist => {
  const setlist = localStorage.getItem('setlist');
  return setlist ? JSON.parse(setlist) : [];
};

export const SetlistContext = createContext<TGlobalSetlist | undefined>(undefined);

export const SetlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [setlist, setSetlist] = useState<TSetlist>(getSetlist());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setlist));
  }, [setlist]);

  return <SetlistContext.Provider value={{ setlist, setSetlist }}>{children}</SetlistContext.Provider>;
};
