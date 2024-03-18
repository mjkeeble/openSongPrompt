import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAction } from 'src/types';

type TProps = {
  action: TAction;
  resetAction: () => void;
  currentSong: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  songPages: number;
  timerHalted: boolean;
  setTimerHalted: Dispatch<SetStateAction<boolean>>;
  Navigate: ReturnType<typeof useNavigate>;
};

const activeKeys = ['j', 'k', 'm'];

// This component returns null. It is only responsible for handling user commands

export const HandleSongPageInteraction: React.FC<TProps> = ({
  action,
  resetAction,
  currentSong,
  currentPage,
  setCurrentPage,
  timerHalted,
  setTimerHalted,
  songPages,
  Navigate,
}) => {
  // no action, ignore
  if (!action.keyPressed && !action.isLongPress) return null;

  // if action data is incomplete or pressed button is invalid, ignore
  if (!action.keyPressed || !activeKeys.includes(action.keyPressed)) {
    resetAction();
    return null;
  }

  // j short press
  if (action.keyPressed === 'j' && !action.isLongPress) {
    resetAction();

    // go to previous page in song
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      // go to previous song if at the start of this one
      Navigate(`/song/${Math.max(currentSong - 1, 0)}`);
    }
    setTimerHalted(false);
    return null;
  }

  // k short press
  if (action.keyPressed === 'k' && !action.isLongPress) {
    resetAction();
    if (currentPage < songPages) {
      // go to next page in song

      setCurrentPage(currentPage + 1);
    } else {
      // go to next song if at the end of this one

      setCurrentPage(0);
      // go to next song or repertoire if at end of setlist
      Navigate(`/song/${currentSong + 1}`);
    }
    setTimerHalted(false);
    return null;
  }

  // m short press
  if (action.keyPressed === 'm' && !action.isLongPress) {
    resetAction();
    // go to previous song
    if (!currentPage) {
      setTimerHalted(false);
      // Navigate('/setlist/1');
    } else {
      // toggle freeze timer
      setTimerHalted(!timerHalted);
    }
    return null;
  }

  //m long press
  if (action.keyPressed === 'm' && action.isLongPress) {
    resetAction();
    if (!currentPage) {
      // go to setlist
      // TODO: setlist id need correcting
      setTimerHalted(false);
      // Navigate('/setlist/1');
    }
    return null;
  }

  // k long press
  if (action.keyPressed === 'k' && action.isLongPress) {
    if (currentPage) {
      resetAction();
      setTimerHalted(false);
      // go to next song or repertoire if at end of setlist
      Navigate(`/song/${currentSong + 1}`);
    } else {
      Navigate('/setlist/1');
    }
    return null;
  }

  // j long press
  if (action.keyPressed === 'j' && action.isLongPress) {
    resetAction();
    if (currentPage) {
      // navigate to start of current song if on a lyrics page
      setCurrentPage(0);
    }
    setTimerHalted(false);
  }

  return null;
};