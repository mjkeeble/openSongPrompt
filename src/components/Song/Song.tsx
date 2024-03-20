import { getSetlist } from '@context/index';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screensaver } from '..';
import songs from '../../../data/songs.json';
import { BREAK, activeKeys } from '../../const.ts';
import { TSong } from '../../types';
import LyricPage from './LyricPage.tsx';
import TitlePage from './TitlePage.tsx';
import { HandleFootswitch } from './interaction';

const Song = () => {
  const Navigate = useNavigate();
  const setlist = getSetlist();

  const { id } = useParams();
  const setlistIndex: number = parseInt(id!);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timerHalted, setTimerHalted] = useState<boolean>(false);
  const song: TSong | undefined = songs.find((song: TSong) => song.id === setlist[setlistIndex]);

  useEffect(() => {
    const handleFootswitchInput = (event: KeyboardEvent) => {
      if (activeKeys.includes(event.key)) {
        return null;
      }
      HandleFootswitch({
        footswitchInput: event.key,
        currentSong: setlistIndex,
        totalSongs: setlist.length,
        currentPage,
        setCurrentPage,
        hasTimer: !!song && !!song.pages[currentPage].duration,
        timerHalted,
        setTimerHalted,
        songPages: songs.find((song: TSong) => song.id === setlist[setlistIndex] || null)?.pages.length || 0,
        Navigate,
      });
    };

    document.addEventListener('keydown', handleFootswitchInput);

    return () => {
      document.removeEventListener('keydown', handleFootswitchInput);
    };
  }, [currentPage, setlistIndex, timerHalted, setTimerHalted, Navigate, setlist, song]);

  if (!setlistIndex || setlist[setlistIndex] === BREAK) return <Screensaver />;

  if (!song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>setlist[setlistIndex]: {setlist[setlistIndex]}</p>
      </>
    );
  }

  return (
    <div className="h-screen w-full">
      {!currentPage ? (
        <TitlePage
          title={song.title}
          songKey={song.key}
          setup={song.setup}
          tempo={song.tempo}
          timeSignature={song.timeSignature}
          isLastSong={setlistIndex === setlist.length - 1}
        />
      ) : (
        <LyricPage song={song} currentPage={currentPage} setCurrentPage={setCurrentPage} timerHalted={timerHalted} />
      )}
    </div>
  );
};

export default Song;
