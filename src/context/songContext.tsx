import { createContext, useState } from 'react';
import { TSong } from '../../types';

type SongContextType = {
  song: TSong | undefined;
  setSong: (song: TSong) => void;
};

export const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [song, setSong] = useState<TSong | undefined>(undefined);

  // const handleSetGig = (id: string) => {
  //   const gig = GIGS.find((gig) => gig.id === parseInt(id, 10));
  //   setGig(gig);
  // };

  return <SongContext.Provider value={{ song, setSong }}>{children}</SongContext.Provider>;
};
