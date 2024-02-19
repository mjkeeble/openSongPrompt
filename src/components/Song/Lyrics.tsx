import React from 'react';

interface TextWithInlineSpansProps {
  text: string[];
}

const TextWithInlineSpans: React.FC<TextWithInlineSpansProps> = ({ text }) => {
  return (
    <div>
      {text.map((line, lineIndex) => (
        <p key={lineIndex}>
          {line.split(/(\[.*?\])/).map((part: string, index: number) => {
            if (index % 2 === 0) {
              return <span key={index} className='text-white font-bold'>{part}</span>;
            } else {
              return (
                <span key={index} style={{ fontWeight: 'bold' }}>
                  {part}
                </span>
              );
            }
          })}
        </p>
      ))}
    </div>
  );
};

// Usage:
const Lyrics: React.FC = () => {
  const texts: string[][] = [
    ['[This] is a demonstration [of what] I want.', 'Another [example] with square brackets [inside].'],
    ['[This] is another example.', 'Yet [another] one.'],
  ];

  return (
    <div>
      {texts.map((line, index) => (
        <TextWithInlineSpans key={index} text={line} />
      ))}
    </div>
  );
};

export default Lyrics;
