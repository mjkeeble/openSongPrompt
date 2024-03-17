import { storeSetlist } from '@context/index';
import { forwardRef, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import songs from '../../../data/songs.json';
import { TRepertoireList, TSong } from '../../types';

// export const SetList: React.FC<TGig> = ({ location, date, setList }) => {
const Repertoire = () => {
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  // TODO: at the moment setlist is stored in local storage and

  const repertoireList: TRepertoireList = songs
    .sort((a: TSong, b: TSong) => a.title.localeCompare(b.title))
    .map((song: TSong) => song.id);

  useEffect(() => {
    storeSetlist([0]);
    if (buttonsRef.current[0]) {
      buttonsRef.current[0].focus();
    }
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

  const handleSelectSong = (id: number) => {
    let storageUpdateDebounce: NodeJS.Timeout | null = null;
  
    console.log('storing to setlist', id);
    storeSetlist(['break', id]);
    if (storageUpdateDebounce) clearTimeout(storageUpdateDebounce);
    storageUpdateDebounce = setTimeout(() => {
      console.log('storing to setlist', id);
     
      Navigate(`/song/1`);
    }, 1000);

  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <h1 className="my-5 font-fredericka text-7xl text-bj-white">Repertoire</h1>
      <ul className="boxShadow">
        {repertoireList.map((songId: number, index) => {
          const song: TSong | undefined = songs.find((song) => song.id === songId);
          if (!song) return null;

          return (
            <li>
              <SongButton
                ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                classes=""
                onclick={() => handleSelectSong(song.id)}
                text={song.title}
              />
            </li>
          );
        })}
      </ul>
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
export default Repertoire;
