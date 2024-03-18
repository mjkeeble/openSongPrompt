import { getSetlist } from '@context/index';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavIndicator } from '..';
import gigs from '../../../data/gigs.json';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const';
import { TBreak, TGig, TRepertoireList, TSetlist, TSong } from '../../types';
import { displayDate } from '../../utils';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
const Setlist = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: at the moment setlist is stored in local storage and
  const gig: TGig | undefined = gigs.find((gigFromList: TGig) => gigFromList.id === id);
  const setlist: TSetlist | TRepertoireList = gig
    ? getSetlist()
    : songs.sort((a: TSong, b: TSong) => a.title.localeCompare(b.title)).map((song: TSong) => song.id);

  useEffect(() => {
    if (buttonsRef.current[0]) {
      buttonsRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    if (isLoaded) {
      const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
      if (event.key === 'm') {
        buttonsRef.current[currentIndex].click();
      } else if (event.key === 'j' && currentIndex > 0) {
        buttonsRef.current[currentIndex - 1].focus();
      } else if (event.key === 'k' && currentIndex < buttonsRef.current.length - 1) {
        buttonsRef.current[currentIndex + 1].focus();
      }
    }
  };

  return (
    <div>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Set List</h1>
        {gig && (
          <h3>
            {displayDate(gig.dateTime)}, {gig.venue}, {gig.town}
          </h3>
        )}

        <ul>
          {setlist.map((songId: number | TBreak, index) => {
            if (songId === BREAK)
              return (
                <li key={index}>
                  <SongButton
                    ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                    classes="bg-bj-blue"
                    onclick={() => Navigate(`/song/${index}`)}
                    text="BREAK"
                  />
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
                <SongButton
                  ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                  classes=""
                  onclick={() => Navigate(`/song/${index}`)}
                  text={song.title}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
    </div>
  );
};

type TProps = {
  classes: string;
  text: string;
  onclick?: () => void;
};

const SongButton = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-2/3 rounded-md border-none p-2 text-center text-7xl transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-bj-red hover:ring-offset-2 focus:bg-bj-green-mid focus:text-bj-white focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});
export default Setlist;
