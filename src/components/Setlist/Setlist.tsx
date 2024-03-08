import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GIGS from '../../../data/gigs';
import songs from '../../../data/songs.json';
import { TGig, TInternalGig, TSong } from '../../types';
import { displayDate } from '../../utils';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
const Setlist = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const importedGig: TGig | undefined = GIGS.find((gigFromList: TGig) => gigFromList.id === id);
  const gig: TInternalGig | undefined = importedGig
    ? {
        ...importedGig,
        setlist: importedGig.setlist.flatMap((subArray) => ['break', ...subArray]),
      }
    : undefined;

  if (gig) gig.setlist.push('break');

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

          {gig.setlist.map((songId: string, index) => {
            if (!songId) return <hr key={index} className="my-7" />;

            const song: TSong | undefined = songs.find((song) => {
              return song.id.toString() === songId;
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
