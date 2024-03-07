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
    <div >
      {lyrics.map((line, index) => (
        <p
          key={index}
          className={`${isComment(line) ? 'text-bj-green-light' : 'text-inherit'} text-lyric min-h-8 text-left pl-12 -indent-12 leading-tight`}
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
      <p className="text-bj-green-light text-lyric font-semibold">No lyrics here!</p>
    </div>
  );
};

export default Lyrics;
