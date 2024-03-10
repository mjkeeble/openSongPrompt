import { createContext, useState } from 'react';
import { TSetlist } from '../types';

type SetlistContextType = {
  setlist: TSetlist;
  setSetlist: (setSetlist: TSetlist) => void;
};

export const SetlistContext = createContext<SetlistContextType>({ setlist: [], setSetlist: () => {} });

export const SetlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [setlist, setSetlist] = useState([] as TSetlist);

  return <SetlistContext.Provider value={{ setlist, setSetlist }}>{children}</SetlistContext.Provider>;
};
