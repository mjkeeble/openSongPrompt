import { useKeyPressMonitor } from '@hooks/index';
// import debounce from 'lodash.debounce';
import { getSetlist } from '@context/index';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screensaver } from '..';
import songs from '../../../data/songs.json';
import { BREAK } from '../../const.ts';
import { TSong } from '../../types';
import LyricPage from './LyricPage.tsx';
import TitlePage from './TitlePage.tsx';
import { HandleSongPageInteraction } from './interaction';

const Song = () => {
  const Navigate = useNavigate();
  const setlist = getSetlist();

  const { id } = useParams();
  const setlistIndex: number = parseInt(id!);
  const { action, onKeyDown, onKeyUp } = useKeyPressMonitor();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    console.log('page interaction');
    HandleSongPageInteraction({
      action,
      currentSong: setlistIndex,
      currentPage,
      setCurrentPage,
      //filter songs for the id and return the number of pages as songPages,
      songPages: songs.find((song: TSong) => song.id === setlistIndex || null)?.pages.length || 0,
      Navigate,
    });
  }, [Navigate, action, currentPage, setlistIndex]);

  useEffect(() => {
    if (setlistIndex > setlist.length) Navigate('setlist/');
  }, [setlistIndex, setlist, Navigate]);

  if (!setlistIndex || setlist[setlistIndex] === BREAK) return <Screensaver />;

  const song: TSong | undefined = songs.find((song: TSong) => song.id === setlist[setlistIndex]);

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
        />
      ) : (
        <LyricPage song={song} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default Song;
