import React, { useEffect, useRef, useState } from 'react';

type TProps = {
  lyrics: string[];
};

// Usage:
const Lyrics: React.FC<TProps> = ({ lyrics }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(100); // Initial font size
  const [containerReady, setContainerReady] = useState<boolean>(false); // State to track if container is ready
  const [isResizingText, setIsResizingText] = useState<boolean>(true);
  
  useEffect(() => {
    setFontSize(100);
    setIsResizingText(true);
  }, [lyrics]);
  
  useEffect(() => {
    // This effect runs after the initial render
    setContainerReady(true); // Set containerReady to true after initial render
  }, []);
  
  useEffect(() => {
    // This effect runs whenever fontSize changes
    if (containerReady && containerRef.current) {
      // Check if container is ready and ref is not null
      const container = containerRef.current;
      const hasOverflow = container.scrollHeight > container.clientHeight;
      if (hasOverflow && fontSize > 20) {
        // Reduce font size and recheck
        setFontSize((prevSize) => prevSize - 1);
      } else {
        setIsResizingText(false);
      }
    }
  }, [fontSize, containerReady, lyrics]); // Re-run effect when fontSize or containerReady changes
  
  // Regular expression pattern to match "[" at the beginning and "]" at the end of the string
  const regexForComment = /^\[.*\]$/;

  
  const isComment = (str: string): boolean => {
    return regexForComment.test(str);
  };
  if (!lyrics.length) return <NoLyricsMessage />;

  return (
    <div ref={containerRef} className="overflow-y-auto max-h-full">
      {' '}
      {lyrics.map((line, index) => (
        <p
          key={index}
          className={`${isResizingText ? 'text-transparent' : (isComment(line) ? 'text-amber-500' : 'text-inherit')} min-h-8 pl-12 text-left -indent-12 font-semibold leading-tight`}
          style={{ fontSize }}
        >
          {isComment(line) ? line.substring(1, line.length - 1) : line}
        </p>
      ))}
    </div>
  );
};

const NoLyricsMessage = () => {
  return (
    <div className="grid w-full items-center justify-center">
      <p className="text-lyric font-semibold text-bj-green-light">No lyrics here!</p>
    </div>
  );
};

export default Lyrics;
