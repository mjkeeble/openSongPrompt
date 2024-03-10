import { useSetlist } from '@hooks/contextHooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gigs from '../../../data/gigs.json';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const';
import { TGig, TSong, TSetlist, TBreak } from '../../types';
import { displayDate } from '../../utils';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
const Setlist = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const { setlist, setSetlist } = useSetlist();
  const gig: TGig | undefined = gigs.find((gigFromList: TGig) => gigFromList.id === id);
  const consolidatedSetlist = (gig: TGig | undefined): TSetlist => {
    if (!gig) return [];
    return gig.setlist.flatMap((subArray) => [BREAK as TBreak, ...subArray.map(Number)]).concat([BREAK as TBreak]);
  } 

  setSetlist(consolidatedSetlist(gig));

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === 'l') {
        console.log('l');
      } else if (event.key === 'k') {
        console.log('k');
        Navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [Navigate]);

  return (
    <div>
      <h1>Set List</h1>
      {!gig ? (
        <h1>Gig not found</h1>
      ) : (
        <>
          <h5>
            {displayDate(gig.dateTime)}, {gig.venue}, {gig.town}
          </h5>

          {setlist.map((songId: number | TBreak, index) => {
            if (songId === BREAK) return <hr key={index} className="my-7" />;

            const song: TSong | undefined = songs.find((song) => {
              return song.id === songId;
            });
            if (!song)
              return (
                <p key={index} className="text-bj-red">
                  <em>SONG NOT FOUND!!</em>
                </p>
              );

            return <p key={index}>{song.title}</p>;
          })}
        </>
      )}
    </div>
  );
};

export default Setlist;
