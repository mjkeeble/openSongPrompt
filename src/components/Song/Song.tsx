import { useKeyPressMonitor } from '@hooks/index';
// import debounce from 'lodash.debounce';
import {useEffect, useState} from 'react';
import { getSetlist } from '@context/index';
import { useNavigate, useParams } from 'react-router-dom';
import { Screensaver } from '..';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const.ts';
import { TSong } from '../../types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import { HandleSongPageInteraction } from './interaction';

const Song = () => {
  const Navigate = useNavigate();
  const setlist = getSetlist();
  console.log("🚀 -------------------------------🚀");
  console.log("🚀 => Song => setlist:", setlist);
  console.log("🚀 -------------------------------🚀");
  const { id } = useParams();
  const setlistIndex: number = parseInt(id!);
  const { action, onKeyDown, onKeyUp } = useKeyPressMonitor();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    HandleSongPageInteraction({
      action,
      currentSong: setlistIndex,
      currentPage,
      setCurrentPage,
      //filter songs for the id and return the number of pages as songPages,
      songPages: songs.find((song: TSong) => song.id === setlistIndex || null)?.pages.length || 0,
      Navigate,
    });
  }, [action, currentPage, setlistIndex, Navigate]);

  if (setlistIndex > setlist.length) Navigate('/');
  if (!setlistIndex ||setlist[setlistIndex] === BREAK) return <Screensaver />;

  console.log('setlistIndex', setlistIndex, setlist[setlistIndex]);

  const song: TSong | undefined = songs.find((song: TSong) => song.id === setlist[setlistIndex]);

  if (!song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>id: {setlistIndex}</p>
      </>
    );
  }
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  if (!currentPage) {
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
  } else {
    return (
      <div className="grid h-full w-full grid-cols-12 divide-x">
        <div className="h-fullp-4 col-span-5">
          <p className="mb-8 ml-6 text-left text-7xl font-semibold text-bj-green-light">
            {song.pages[currentPage - 1].section}{' '}
            <span className="text-3xl">
              {currentPage}/{song.pages.length}
            </span>
          </p>
          <Chords chords={song.pages[currentPage - 1].chords} />
        </div>
        <div className="col-span-7 h-full px-4">
          <Lyrics lyrics={song.pages[currentPage - 1].lyrics} />
        </div>
      </div>
    );
  }
};

const SetupText = (setup: string) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h2>{setup}</h2>
    </div>
  );
};

export default Song;
