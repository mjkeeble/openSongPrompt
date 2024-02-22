import { createContext, useState } from 'react';

type GigContextType = {
  selectedGig: string;
  setSelectedGig: (gig: string) => void;
};

export const GigContext = createContext<GigContextType>({ selectedGig: '1', setSelectedGig: () => {} });

export const GigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGig, setSelectedGig] = useState('');

  return <GigContext.Provider value={{ selectedGig, setSelectedGig }}>{children}</GigContext.Provider>;
};
