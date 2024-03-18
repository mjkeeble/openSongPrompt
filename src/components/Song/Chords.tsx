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
    if (hasTimer && timerHalted) return 'play';
    if (hasTimer) return 'pause';
  };

  return (
    <div className="w-full ">
      <table className="w-full table-auto border-collapse p-2 text-7xl">
        <tbody>
          {chords.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className=" border border-solid border-slate-200 py-5 text-center">
                  {cell.split(' ').map((chord, chordIndex) => (
                    <span key={chordIndex}>{chord}</span>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <NavIndicator
        leftShort="backward"
        rightShort={isLastPage ? 'forwardStep' : 'play'}
        leftLong="backwardStep"
        rightLong="forwardStep"
        centreShort={progressIndicatorControlIcon()}
      />
    </div>
  );
};

export default Chords;
