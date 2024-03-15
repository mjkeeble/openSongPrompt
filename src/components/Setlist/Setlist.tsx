import { getSetlist, storeSetlist } from '@context/index';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gigs from '../../../data/gigs.json';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const';
import { TBreak, TGig, TSetlist, TSong } from '../../types';
import { displayDate } from '../../utils';
import SetlistButton from './SetlistButton';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
const Setlist = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  // TODO: at the moment setlist is stored in local storage and
  const gig: TGig | undefined = gigs.find((gigFromList: TGig) => gigFromList.id === id);
  const setlist: TSetlist = gig
    ? getSetlist()
    : songs.sort((a: TSong, b: TSong) => a.title.localeCompare(b.title)).map((song: TSong) => song.id);

  useEffect(() => {
    // set focus on the firs button
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
    if (event.key === 'm') {
      buttonsRef.current[currentIndex].click();
    } else if (event.key === 'j' && currentIndex > 0) {
      buttonsRef.current[currentIndex - 1].focus();
    } else if (event.key === 'k' && currentIndex < buttonsRef.current.length - 1) {
      buttonsRef.current[currentIndex + 1].focus();
    }
  };

  //  -------------------------------
  //  GIG SETLIST
  //  -------------------------------
  if (gig && setlist.length > 0)
    return (
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1>Set List</h1>
        <h3>
          {displayDate(gig.dateTime)}, {gig.venue}, {gig.town}
        </h3>
        <div className="flex w-full justify-center">
          <h6 className="my-6 w-1/2 rounded-md border-none bg-bj-green-mid p-2 text-center text-3xl font-bold">
            Centre pedal to start
          </h6>
        </div>
        <ul>
          {setlist.map((songId: number | TBreak, index) => {
            if (songId === BREAK)
              return (
                <li key={index}>
                  <SetlistButton classes="bg-bj-blue" onclick={() => Navigate(`/song/${index}`)} text="BREAK" />
                </li>
              );

            const song: TSong | undefined = songs.find((song) => song.id === songId);
            if (!song) {
              return (
                <li key={index}>
                  <p className="text-bj-red">
                    <em>SONG NOT FOUND!!</em>
                  </p>
                </li>
              );
            }

            return (
              <li key={index}>
                <SetlistButton onclick={() => Navigate(`/song/${index}`)} text={song.title} />
              </li>
            );
          })}
        </ul>
      </div>
    );

  //  -------------------------------
  //  REPERTOIRE
  //  -------------------------------

  const handleSelectSongFromRepertoire = (id: number) => {
    storeSetlist([id]);
    Navigate(`/song/0`);
  };

  return (
    <div>
      <h1>Repertoire</h1>
      <ul className="boxShadow">
        {setlist.map((songId: number | TBreak) => {
          if (songId === BREAK) return null;
          const song: TSong | undefined = songs.find((song) => song.id === songId);
          if (!song) return null;

          return (
            <li>
              <SetlistButton onclick={() => handleSelectSongFromRepertoire(song.id)} text={song.title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Setlist;
