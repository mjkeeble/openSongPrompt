import { Dispatch, SetStateAction, createContext, useState } from 'react';

type SetlistContextType = {
  setlist: (number | 'BREAK')[];
  setSetlist: Dispatch<SetStateAction<(number | 'BREAK')[]>>;
};

export const SetlistContext = createContext<SetlistContextType>({ setlist: [], setSetlist: () => {} });

export const SetlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [setlist, setSetlist] = useState<(number | 'BREAK')[]>([]);

  return <SetlistContext.Provider value={{ setlist, setSetlist }}>{children}</SetlistContext.Provider>;
};
