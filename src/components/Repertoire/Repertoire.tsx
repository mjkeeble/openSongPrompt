import { storeSetlist } from '@context/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import { TSong } from '../../types';

import { footswitch } from '../../const';

const Repertoire = () => {
  const navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repertoireList, setRepertoireList] = useState<TSong[]>([]);

  useEffect(() => {
    console.log('Getting songs');
    const fetchSongs = async (): Promise<TSong[] | null> => {
      try {
        const response: TSong[] = await (await fetch('http://localhost:3000/songs')).json();
        return response;
      } catch (error) {
        console.error('Error fetching songs', error);
        return null;
      }
    };

    const getAndSetSongs = async () => {
      const songList = await fetchSongs();
      if (songList) {
        setRepertoireList(songList.sort((a, b) => a.title.localeCompare(b.title)));
      }
    };
    getAndSetSongs();
  }, []);

  useEffect(() => {}, []);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoaded(true);
      console.log('Storing setlist');
      storeSetlist([0]);
      if (buttonsRef.current[0]) {
        console.log('setting focus');
        buttonsRef.current[0].focus();
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const endOfListRef = useRef<HTMLDivElement | null>(null);
  console.log('🚀 --------------------------------------------------------------🚀');
  console.log('🚀 => handleKeyDown => buttonsRef.current:', buttonsRef.current);
  console.log('🚀 --------------------------------------------------------------🚀');

  const handleKeyDown = (event: { key: string }) => {
    console.log('Keypress detected', event.key);
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

    console.log('storing to setlist', Number(id));
    storeSetlist(['BREAK', Number(id)]);
    if (storageUpdateDebounce) clearTimeout(storageUpdateDebounce);
    storageUpdateDebounce = setTimeout(() => {
      console.log('storing to setlist', Number(id));

      navigate(`/song/1`);
    }, 1000);
  };

  return (
    <div>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Repertoire</h1>
        <ul className="mb-20 mt-8">
          {repertoireList.map((song: TSong, index) => {
            // const song: TSong | undefined = songs.find((song) => song.id === songId);
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
