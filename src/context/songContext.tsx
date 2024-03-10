import { createContext, useState } from 'react';

type SongContextType = {
  song: string;
  setSong: (song: string) => void;
};

export const SongContext = createContext<SongContextType>({ song: "", setSong: () => {} });

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [song, setSong] = useState("undefined");

  return <SongContext.Provider value={{ song, setSong }}>{children}</SongContext.Provider>;
};
