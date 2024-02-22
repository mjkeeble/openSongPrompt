import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GIGS from '../../../data/gigs';
import * as songs from '../../../data/songs';
import { TGig, TSong } from '../../../types';
import { displayDate } from '../../utils';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
export const SetList = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const gig: TGig | undefined = GIGS.find((gigFromList: TGig) => gigFromList.id === id);

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

  console.log(gig?.setList || 'no setlist found');
  return (
    <div>
      <h1>Set List</h1>
      {gig ? (
        <>
          <h2>
            {displayDate(gig.date)}, {gig.location}
          </h2>

          {gig.setList.map((songId: string | null) => {
            if (!songId) return <hr className="my-7" />;
            console.log('🚀 -----------------------------------------🚀');
            console.log('🚀 => {gig.setList.map => songId:', songId);
            console.log('🚀 -----------------------------------------🚀');
            const song: TSong | undefined = (songs as unknown as { [key: string]: TSong })[songId];
            if (!song)
              return (
                <p className='text-bj-red'>
                  <em>SONG NOT FOUND!!</em>
                </p>
              );

            return (
              <div key={songId}>
                <p className="mb-4">{song.meta.title}</p>
              </div>
            );
          })}
        </>
      ) : (
        <h1>Gig not found</h1>
      )}
    </div>
  );
};
