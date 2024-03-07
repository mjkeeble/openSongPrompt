import React from 'react';

type TProps = {
  chords: string[][];
};

//split each string in a subarray into separate words
//map over each subarray and return a td for each word
//return a tr for each subarray

const Chords: React.FC<TProps> = ({ chords }) => {
  return (
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
  );
};

export default Chords;
