import { useEffect, useState } from 'react';

type KeyPressType = 'tap' | 'hold' | 'double';

interface KeyPressEvent {
  keyPressed: string;
  type: KeyPressType;
}

const useKeyPressMonitor = (): KeyPressEvent | null => {
  const [lastKeyPressTime, setLastKeyPressTime] = useState<number>(0);
  const [keyPressCount, setKeyPressCount] = useState<number>(0);
  const [keyPressed, setKeyPressed] = useState<string>('');
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log("hook called")
      const targetKeys = ['k','l','m']
      const now = Date.now();
      const elapsedTime = now - lastKeyPressTime;

      if (!targetKeys.includes(event.key)) {
        return;
      }

      if (elapsedTime > 2000) {
        setKeyPressCount(1);
      } else {
        setKeyPressCount(keyPressCount + 1);
      }

      if (keyPressCount === 1 && elapsedTime < 2000) {
        setKeyPressed(event.key);

        if (elapsedTime < 500) {
          // Double press
          setKeyPressCount(0);
          setLastKeyPressTime(0);
          console.log({ keyPressed: event.key, type: 'double' });
        } else {
          // Tap
          console.log({ keyPressed: event.key, type: 'tap' });
        }
      } else if (keyPressCount === 2 && elapsedTime > 2000) {
        // Hold
        console.log({ keyPressed: event.key, type: 'hold' });
        setKeyPressCount(0);
      }

      setLastKeyPressTime(now);
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [keyPressCount, lastKeyPressTime]);

  if (keyPressed) {
    return { keyPressed, type: 'tap' };
  }

  return null;
};

export default useKeyPressMonitor;
