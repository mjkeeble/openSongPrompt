import { TSong } from 'src/types';

export const fetchSongs = async (): Promise<TSong[] | null> => {
  try {
    const response: TSong[] = await (await fetch(`http://localhost:3000/songs`)).json();
    return response;
  } catch (error) {
    console.error('Error fetching songs', error);
    return null;
  }
};
