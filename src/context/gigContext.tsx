import { createContext, useState } from 'react';
import { TGig } from '../../types';

type GigContextType = {
  gig: TGig | undefined;
  setGig: (gig: TGig) => void;
};

export const GigContext = createContext<GigContextType | undefined>(undefined);

export const GigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gig, setGig] = useState<TGig | undefined>(undefined);

  // const handleSetGig = (id: string) => {
  //   const gig = GIGS.find((gig) => gig.id === parseInt(id, 10));
  //   setGig(gig);
  // };

  return <GigContext.Provider value={{ gig, setGig }}>{children}</GigContext.Provider>;
};
