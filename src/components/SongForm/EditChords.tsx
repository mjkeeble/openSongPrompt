import { useState } from 'react';

const EditChords = ({ chords }: { chords: string[][] }) => {
  const chordsPerLine = chords.reduce((max, arr) => Math.max(max, arr.length), 0) || 4;
  const [data, setData] = useState<string[][]>(chords);

  const handleChange = (lineIndex: number, barIndex: number, value: string) => {
    const newData = data.map((line, idx) => {
      if (idx === lineIndex) {
        const newLine = [...line];
        newLine[barIndex] = value;
        return newLine;
      }
      return line;
    });
    setData(newData);
  };

  return (
    <table>
      <tbody>
        {data.map((line, lineIndex) => (
          <tr key={lineIndex}>
            {new Array(chordsPerLine).fill(null).map((_, barIndex) => (
              <td key={barIndex}>
                <input
                  type="text"
                  value={line[barIndex] || ''}
                  onChange={(e) => handleChange(lineIndex, barIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditChords;
