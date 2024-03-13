import { useRef, useState } from 'react';

type TAction = {
  keyPressed: string | null;
  isLongPress: boolean;
};

type KeyPressData = {
  action: TAction;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
};

export const useKeyPressMonitor = (): KeyPressData => {
  const keyPressed = useRef<string | null>(null);
  const isLongPress = useRef<boolean>(false);
  const startTimerRef = useRef<number>();
  const resetActionTimerRef = useRef<number>();

  const [action, setAction] = useState<TAction>({ keyPressed: null, isLongPress: false });
  
    const resetActionTimer = () => {
      resetActionTimerRef.current = setTimeout(() => {
        setAction({ keyPressed: null, isLongPress: false });
      }, 400);
    };

  const startPressTimer = () => {
    // console.log('🚀 => startPressTimer => startPressTimer');
    isLongPress.current = false;
    startTimerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction({keyPressed: keyPressed.current, isLongPress: isLongPress.current});
      resetActionTimer();
    }, 1000);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log('keypress down', event.key, event.repeat);

    // abort if not a valid key
    if (!['j', 'k', 'm'].includes(event.key) || event.repeat) return;
    // store key to ref
    keyPressed.current = event.key;
    // console.log('🚀 => handleKeyDown => keyPressed.current:', keyPressed.current);
    // start timer
    startPressTimer();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    console.log('keypress up', event.key,'repeat', event.repeat);
    if (event.key !== keyPressed.current || event.repeat) return;
    clearTimeout(startTimerRef.current);

    if (action.keyPressed !== keyPressed.current || action.isLongPress !== isLongPress.current) {
      setAction({ keyPressed: event.key, isLongPress: isLongPress.current });
      // console.log('🚀 => handleKeyUp => setAction:', action.keyPressed, action.isLongPress);

      // Clear the action indicating the key press ended
      resetActionTimer();
      // console.log('🚀 => handleKeyUp => resetAction:', action.keyPressed, action.isLongPress);
    }
  };

  return {
    action,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };
};
