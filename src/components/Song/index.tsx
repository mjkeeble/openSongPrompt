// import { useParams } from 'react-router-dom';
// import * as songs from '../../../data/songs';
// import { TSong } from '../../../types';

export const Song = () => {
  // const { song, page } = useParams();
  // const songData: TSong | null = !song || !songs[song as keyof typeof songs] ? null : songs[song as keyof typeof songs];

  // if (!songData) return null;

  return (
    <div>
      <h1>song</h1>
      {/* <h1>{songData.meta.title}</h1>
      <h2>Page count: {songData.pages.length}</h2>
      <h3>Current page: {page}</h3> */}
    </div>
  );
};
