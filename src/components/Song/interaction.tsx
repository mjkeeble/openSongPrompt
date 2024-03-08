import { Dispatch, SetStateAction } from 'react';
import { TAction } from 'src/types';
import { TCurrentLocation } from './Song';

type TProps = {
  action: TAction;
  currentLocation: TCurrentLocation;
  setCurrentLocation: Dispatch<SetStateAction<TCurrentLocation>>;
  songPages: number;
};

const activeKeys = ['j', 'k', 'm'];

// This component returns null. It is only responsible for handling user commands

export const handleInteraction: React.FC<TProps> = ({ action, currentLocation, setCurrentLocation, songPages }) => {
  // if action data is incomplete or pressed button is invalid, ignore
  if (!action.keyPressed || action.isLongPress === undefined || !activeKeys.includes(action.keyPressed)) return null;

  // j short press - one page back within current song
  if (action.keyPressed === 'j' && !action.isLongPress) {
    setCurrentLocation({ ...currentLocation, page: Math.max(0, currentLocation.page - 1) });
  }

  // k short press - one page forward within current song
  if (action.keyPressed === 'k' && !action.isLongPress) {
    setCurrentLocation({ ...currentLocation, page: Math.min(songPages, currentLocation.page + 1) });
  }

  // m short press - go to setlist of currentLocation.page ===0
  if (action.keyPressed === 'm' && !action.isLongPress) {
    setCurrentLocation({ ...currentLocation, page: 0 });
  }
  return null;
};
