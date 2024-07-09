import { getSetlist } from '@context/index';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screensaver } from '..';
import songs from '../../../data/songs.json';
import { ACTIVEKEYS, BREAK } from '../../const.ts';
import { TSong, TSongWithDuration } from '../../types';
import LyricPage from './LyricPage.tsx';
import TitlePage from './TitlePage.tsx';
import { ManageInteraction } from './interaction';

const Song = () => {
  const Navigate = useNavigate();
  const setlist = getSetlist();

  const { id } = useParams();
  const setlistIndex: number = parseInt(id!);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timerHalted, setTimerHalted] = useState<boolean>(false);
  const song: TSong | TSongWithDuration | undefined = songs.find(
    (song: TSong | TSongWithDuration) => song.id === setlist[setlistIndex],
  );
  const duration = song?.pages[currentPage - 1]?.duration || 0;

  useEffect(() => {
    const handleFootswitchInput = (event: KeyboardEvent) => {
      if (ACTIVEKEYS.includes(event.key)) {
        ManageInteraction({
          showingScreensaver: setlist[setlistIndex] === BREAK,
          footswitchInput: event.key,
          currentSong: setlistIndex,
          totalSongs: setlist.length,
          currentPage,
          setCurrentPage,
          hasTimer: !!duration && !!song?.pages.length && currentPage < song?.pages.length,
          timerHalted,
          setTimerHalted,
          songPages:
            songs.find((song: TSong | TSongWithDuration) => song.id === setlist[setlistIndex] || null)?.pages.length ||
            0,
          Navigate,
        });
      }
    };

    document.addEventListener('keydown', handleFootswitchInput);

    return () => {
      document.removeEventListener('keydown', handleFootswitchInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, setlistIndex, timerHalted]);

  if (!setlistIndex || setlist[setlistIndex] === BREAK)
    return <Screensaver isStart={!setlistIndex} isLastSong={setlistIndex === setlist.length - 1} />;

  if (!song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>setlist[setlistIndex]: {setlist[setlistIndex]}</p>
      </>
    );
  }
  return (
    <div className="w-full overflow-x-hidden">
      {!currentPage ? (
        <TitlePage
          title={song.title}
          scale={song.scale}
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
