import {FC, useState} from 'react';

type EditLyricsProps ={
  lyrics: string[];
  chordBarsPerLine: number;
}

const EditLyrics:FC<EditLyricsProps> = ({lyrics}: EditLyricsProps) => {
  const [textArray, setTextArray] = useState<string[]>(lyrics)
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setTextArray(event.target.value.split('/n'));
  };
  return <textarea value={textArray.join('/n')} onChange={handleChange}/>;
};

export default EditLyrics;
