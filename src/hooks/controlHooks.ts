import { useRef, useState } from 'react';
import {TAction} from 'src/types';

type KeyPressMonitor = {
  action: TAction;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleKeyUp: (event: KeyboardEvent) => void;
};

const activeKeys = ['j', 'k', 'm'];

export const useKeyPressMonitor = (): KeyPressMonitor => {
  const isHoldRef = useRef<boolean | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);
  const keyRef = useRef<string | undefined>(undefined);
  const [action, setAction] = useState<TAction>({ keyPressed: '', isLongPress: false });

  const startPressTimer = (key: string) => {
    keyRef.current = key;
    isHoldRef.current = false;
    timerRef.current = setTimeout(() => {
      isHoldRef.current = true;
    }, 1000);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!activeKeys.includes(event.key) || keyRef.current) return;
    startPressTimer(event.key);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== keyRef.current) return;
    setAction({ keyPressed: event.key, isLongPress: isHoldRef.current });
    clearTimeout;
  };

  return {
    action,
    handleKeyDown,
    handleKeyUp,
  };
};
