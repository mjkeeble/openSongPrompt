import { storeSetlist } from '@context/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import songs from '../../../data/songs.json';
import { footswitch } from '../../const';
import { TSong } from '../../types';

const Repertoire = () => {
  const navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: at the moment setlist is stored in local storage and

  const repertoireList: TSong[] = songs
    .sort((a, b) => a.title.localeCompare(b.title));
  const songIds: number[] = songs.map((song: TSong) => song.id);

  useEffect(() => {
    storeSetlist([0]);
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

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: { key: string }) => {
    if (isLoaded) {
      // TODO: refactor with switch
      const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
      if (event.key === footswitch.centreShort) {
        buttonsRef.current[currentIndex].click();
      } else if (event.key === footswitch.leftShort && currentIndex > 0) {
        buttonsRef.current[currentIndex - 1].focus();
        buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (event.key === footswitch.leftShort && currentIndex === 0) {
        buttonsRef.current[repertoireList.length - 1].focus();
        buttonsRef.current[repertoireList.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (event.key === footswitch.rightShort) {
        if (currentIndex < buttonsRef.current.length - 1) {
          buttonsRef.current[currentIndex + 1].focus();
          buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (currentIndex === buttonsRef.current.length - 1) {
          buttonsRef.current[0].focus();
          buttonsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (endOfListRef.current) {
          endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (event.key === footswitch.leftLong) {

        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const handleSelectSong = (id: number) => {
    let storageUpdateDebounce: NodeJS.Timeout | null = null;

    console.log('storing to setlist', id);
    storeSetlist(['BREAK', id]);
    if (storageUpdateDebounce) clearTimeout(storageUpdateDebounce);
    storageUpdateDebounce = setTimeout(() => {
      console.log('storing to setlist', id);

      navigate(`/song/1`);
    }, 1000);
  };

  return (
    <div>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Repertoire</h1>
        <ul className="mb-20 mt-8">
          {songIds.map((songId: number, index) => {
            const song: TSong | undefined = songs.find((song) => song.id === songId);
            if (!song) return null;

            return (
              <li key={index}>
                <SongListButton
                  ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                  classes=""
                  onclick={() => handleSelectSong(song.id)}
                  title={song.title}
                  version={song.version}
                />
              </li>
            );
          })}
          <div ref={endOfListRef} />
        </ul>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
    </div>
  );
};

export default Repertoire;
