import { useKeyPressMonitor } from '@hooks/index';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Screensaver } from '..';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const.ts';
import { TSong } from '../../types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import { handleInteraction } from './interaction';

export type TCurrentLocation = {
  songIndex: number;
  page: number;
};

const Song = () => {
  // const Navigate = useNavigate();
  const { id } = useParams();
  const { action, handleKeyDown, handleKeyUp } = useKeyPressMonitor();
  const [currentLocation, setCurrentLocation] = useState<TCurrentLocation>({ songIndex: 0, page: 0 });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);



  useEffect(() => {
    handleInteraction({
      action,
      currentLocation,
      setCurrentLocation,
      songPages: songs[currentLocation.songIndex].pages.length,
    });
  }, [action, currentLocation]);

  // console.log(id, id === BREAK, id === 'break')
  if (id === BREAK) return <Screensaver />;

  // const handleOnKeyUp = (event: React.KeyboardEvent) => {
  //   console.log('key up', event.key);
  // };

  const song: TSong | undefined = songs.find((song) => song.id === parseInt(id!) || null);

  if (!song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>id: {id}</p>
      </>
    );
  }

  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  if (currentLocation.page === 0) {
    return (
      <div className="flex h-screen w-full flex-col p-2">
        <header className=" m-2 flex items-start justify-between text-6xl ">
          <h1>{song.title}</h1>
          <h2>{currentTime}</h2>
        </header>
        <div className="flex h-full items-center justify-center">
          <div className="col-span-1 text-center text-lyric">
            {song.key && <p>Key: {song.key}</p>}
            <p>{song.setup && SetupText(song.setup)}</p>
          </div>
        </div>

        {song.setup && <p>{song.setup}</p>}
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-12 divide-x">
      <div className="h-fullp-4 col-span-5">
        <p className="mb-8 ml-6 text-left text-7xl font-semibold text-bj-green-light">
          {song.pages[currentLocation.page - 1].section}{" "}
          <span className="text-3xl">{currentLocation.page}/{song.pages.length}</span>
        </p>
        <Chords chords={song.pages[currentLocation.page - 1].chords} />
      </div>
      <div className="col-span-7 h-full px-4">
        <Lyrics lyrics={song.pages[currentLocation.page - 1].lyrics} />
      </div>
    </div>
  );
};

const SetupText = (setup: string) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h2>{setup}</h2>
    </div>
  );
};

export default Song;
