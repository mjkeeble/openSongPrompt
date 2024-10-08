import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { TSong } from 'src/types';

export type TGlobalSongs = {
  songs: TSong[];
  setSongData: (songs: TSong[]) => void;
};

const LOCAL_STORAGE_KEY = 'songs';

const getSongs = (): TSong[] => {
  const storedSongs = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedSongs ? JSON.parse(storedSongs) : [];
};

export const SongsContext = createContext<TGlobalSongs>({
  songs: getSongs(),
  setSongData: () => {},
});

export const SongsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [songs, setSongs] = useState<TSong[]>(getSongs());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(songs));
  }, [songs]);

  return (
    <SongsContext.Provider value={{ songs, setSongData: setSongs }}>
      {children}
    </SongsContext.Provider>
  );
};
