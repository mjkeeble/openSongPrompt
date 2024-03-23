import React from 'react';

type TProps = {
  lyrics: string[];
};

// Usage:
const Lyrics: React.FC<TProps> = ({ lyrics }) => {
  // Regular expression pattern to match "[" at the beginning and "]" at the end of the string
  const regex = /^\[.*\]$/;

  const isComment = (str: string): boolean => {
    return regex.test(str);
  };
  if (!lyrics.length) return <NoLyricsMessage />;

  return (
    <div>
      {lyrics.map((line, index) => (
        <p
          key={index}
          className={`${isComment(line) ? 'text-bj-green-light' : 'text-inherit'} min-h-8 pl-12 text-left -indent-12 text-lyric font-semibold leading-tight`}
        >
          {isComment(line) ? line.substring(1, line.length - 1) : line}
        </p>
      ))}
    </div>
  );
};

const NoLyricsMessage = () => {
  return (
    <div className="grid h-full w-full items-center justify-center">
      <p className="text-lyric font-semibold text-bj-green-light">No lyrics here!</p>
    </div>
  );
};

export default Lyrics;
