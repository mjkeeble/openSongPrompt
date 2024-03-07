// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ScreenSaver } from '..';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const.ts';
import useKeyPressMonitor from '../../customHooks/index.ts';
import { TSong } from '../../types';
import Chords from './Chords';
import Lyrics from './Lyrics';

type TCurrentLocation = {
  songIndex: number;
  page: number;
};

export const Song = () => {
  // const Navigate = useNavigate();
  const {id} = useParams(); // FOR TESTING
  const currentLocation: TCurrentLocation = { songIndex: 0, page: 1 };
  // const [currentLocation, setCurrentLocation] = useState<TCurrentLocation>({ songIndex: 0, page: 1 });
  const handleKeyPress = useKeyPressMonitor();

  console.log({handleKeyPress})

  // console.log(id, id === BREAK, id === 'break')
  // if (id === BREAK) return (<ScreenSaver />);

  const song: TSong | undefined = songs.find((song) => song.id === parseInt(id!) || null);

  if (!song) {
    if (id === BREAK) {
      return <ScreenSaver />;
    } else {
      return (
        <>
          <h1>No song found!</h1>
          <p>id: {id}</p>
        </>
      );
    }
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
          <div className="text-lyric col-span-1 text-center">
            {song.key && <p>Key: {song.key}</p>}
            <p>{!page && song.setup && SetupText(song.setup)}</p>
          </div>
        </div>

        {song.setup && <p>{song.setup}</p>}
      </div>
    );
  }

  return (
    <div className="grid h-full w-full grid-cols-12 divide-x">
      <div className="h-fullp-4 col-span-5">
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
