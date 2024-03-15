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
  console.log('🚀 HandleSongPageInteraction  🚀');

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
      Navigate(`/song/${currentSong + 1}`);
    }
    setTimerHalted(false);
    return null;
  }

  if (action.keyPressed === 'm' && !action.isLongPress) {
    resetAction();
    setTimerHalted(!timerHalted); 
    return null;
  }

  //m long press
  if (action.keyPressed === 'm' && action.isLongPress) {
    resetAction();
    if (!currentPage) {
      setTimerHalted(false);
      Navigate('/setlist/1');
    }
    return null;
  }

  // k long press
  if (action.keyPressed === 'k' && action.isLongPress) {
    resetAction();
    // navigate to next song
    setTimerHalted(false);
    Navigate(`/song/${currentSong + 1}`);
    return null;
  }

  // j long press
  if (action.keyPressed === 'j' && action.isLongPress) {
    resetAction();
    if (!currentPage) {
      // navigate to previous song if on the title page
      Navigate(`/song/${currentSong - 1}`);
    } else {
      // navigate to start of current song if on a lyrics page
      Navigate(`/song/${currentSong}`);
    }
    setTimerHalted(false);
  }

  return null;
};
