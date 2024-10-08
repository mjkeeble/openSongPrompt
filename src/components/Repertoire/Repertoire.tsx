import { useSetlist, useSongs } from '../../hooks';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import { TSong } from '../../types';

import { footswitch } from '../../const';
import { fetchSongs } from './utils';

const Repertoire = () => {
  const navigate = useNavigate();
  const { setSetlist } = useSetlist();
  const { setSongData: setSongDetails } = useSongs();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repertoireList, setRepertoireList] = useState<TSong[]>([]);

  useEffect(() => {
    const getAndSetSongs = async () => {
      const songList = await fetchSongs();
      if (songList) {
        setSongDetails(songList);
        setRepertoireList(
          songList.sort((a, b) => {
            const titleComparison = a.title.localeCompare(b.title);
            if (titleComparison !== 0) {
              return titleComparison;
            }
            return (a.version ?? '').localeCompare(b.version ?? '');
          }),
        );
      }
    };

    getAndSetSongs();
  }, [setSongDetails]);

  useEffect(() => {}, [repertoireList]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoaded(true);
      setSetlist([]);
      if (buttonsRef.current[0]) {
        buttonsRef.current[0].focus();
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [setSetlist]);

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: { key: string }) => {
    if (isLoaded) {
      // TODO: refactor with switch
      const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
      switch (event.key) {
        case footswitch.centreShort:
          buttonsRef.current[currentIndex].click();
          break;
        case footswitch.leftShort:
          if (currentIndex > 0) {
            buttonsRef.current[currentIndex - 1].focus();
            buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            buttonsRef.current[repertoireList.length - 1].focus();
            buttonsRef.current[repertoireList.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        case footswitch.rightShort:
          if (currentIndex < buttonsRef.current.length - 1) {
            buttonsRef.current[currentIndex + 1].focus();
            buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (currentIndex === buttonsRef.current.length - 1) {
            buttonsRef.current[0].focus();
            buttonsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (endOfListRef.current) {
            endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case footswitch.leftLong:
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSelectSong = (id: number) => {
    let storageUpdateDebounce: NodeJS.Timeout | null = null;

    setSetlist([Number(id)]);
    if (storageUpdateDebounce) clearTimeout(storageUpdateDebounce);
    storageUpdateDebounce = setTimeout(() => {
      navigate(`/song/0`);
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
