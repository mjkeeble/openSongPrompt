import { TGig, TSong } from 'src/types';

export const fetchGig = async (id: string): Promise<TGig | null> => {
  console.log('🚀 -------------------------🚀');
  console.log('🚀 => fetchGig => id:', id);
  console.log('🚀 -------------------------🚀');
  try {
    const response: TGig = await (await fetch(`http://localhost:3000/gigs/${id}`)).json();
    return response;
  } catch (error) {
    console.error('Error fetching gig', error);
    return null;
  }
};

export const fetchSongs = async (ids: number[]): Promise<TSong[] | null> => {
  const songs: TSong[] = [];
  try {
    await Promise.all(
      ids.map(async (id) => {
        const response: TSong = await (await fetch(`http://localhost:3000/songs/${id}`)).json();
        songs.push(response);
      }),
    );
    console.log('🚀 ------------------------------🚀');
    console.log('🚀 => ids.map => songs:', songs);
    console.log('🚀 ------------------------------🚀');
    
    return songs;
  } catch (error) {
    console.error('Error fetching songs', error);
    return null;
  }
};
