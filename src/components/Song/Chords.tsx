import React from 'react';
import { NavIndicator } from '..';

type TProps = {
  chords: string[][];
  isLastPage: boolean;
  timerHalted: boolean;
  hasTimer: boolean;
};

const Chords: React.FC<TProps> = ({ chords, isLastPage, timerHalted, hasTimer }) => {
  const progressIndicatorControlIcon = (): 'pause' | 'play' | undefined => {
    if (isLastPage) return undefined;
    if (hasTimer && timerHalted) return 'play';
    if (hasTimer) return 'pause';
  };
  const barsPerLine = Math.round(Math.max(...chords.map((subArray) => subArray.length)));
  const flattenedChords = chords.map((subArray) => {
    const padding = Array(barsPerLine - subArray.length).fill(' ');
    return [...subArray, ...padding];
  }).flat();

  return (
    <div className="w-full text-4xl">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${barsPerLine}, minmax(0, 1fr))` }}>
        {flattenedChords.map((cell, cellIndex) => (
          <div key={cellIndex} className="border border-solid border-slate-200 py-5 text-center">
            {cell.split(' ').map((chord: string, chordIndex: React.Key | null | undefined) => (
              <span className="text-6xl" key={chordIndex}>
                {chord}
              </span>
            ))}
          </div>
        ))}
      </div>

      <NavIndicator
        leftShort="backward"
        centreShort={progressIndicatorControlIcon()}
        rightShort={isLastPage ? 'forwardStep' : 'play'}
        leftLong="backwardStep"
        rightLong={isLastPage ? undefined : "forwardStep"}
      />
    </div>
  );
};

export default Chords;
