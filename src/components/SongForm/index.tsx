import { useState } from 'react';
import { TSong } from 'src/types';
import LyricsPageForm from './LyricsPageForm';

type SongFormProps = Omit<TSong, 'id'> & {
  id?: string;
};

const SongForm = (props: SongFormProps) => {
  const [song, setSong] = useState<SongFormProps>({
    id: props.id || undefined,
    title: props.title || '',
    version: props.version || undefined,
    writtenBy: props.writtenBy || [],
    gemaWerknummer: props.gemaWerknummer || '',
    duration: props.duration || undefined,
    lineup: props.lineup || undefined,
    pages: props.pages || [],
    scale: props.scale || undefined,
    tempo: props.tempo || undefined,
    timeSignature: props.timeSignature || undefined,
    setup: props.setup || undefined,
    config: props.config || undefined,
  });
  const [chordBarsPerLine] = useState<number>(4);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do something with the submitted song data
    console.log(song);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="button">Duplicate</button>
        <label>
          Title:
          <input type="text" name="title" value={song.title} onChange={handleChange} />
        </label>
        <br />

        <label>
          Version
          <input type="text" name="version" value={song.version || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Songwriters
          {/* <input type="text" name="version" value={song.version || ''} onChange={handleChange} /> */}
        </label>
        <br />

        <label>
          GEMA Werknummer
          <input type="text" name="gemaWerknummer" value={song.gemaWerknummer || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Duration
          <label>
            Minutes
            <input type="number" name="minutes" value={song.duration?.minutes} onChange={handleChange} />
          </label>
          <label>
            Seconds
            <input type="number" name="seconds" value={song.duration?.seconds} onChange={handleChange} />
          </label>
        </label>
        <br />

        <label>
          Lineup
          <input type="text" name="lineup" value={song.lineup || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Key
          <input type="text" name="key" value={song.scale || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Tempo
          <input type="number" name="tempo" value={song.tempo || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Time Signature
          <input type="text" name="timeSignature" value={song.timeSignature || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          setup
          <input type="text" name="setup" value={song.setup || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Display configuration - Chord Pane Size
          <input type="text" name="chordPaneSize" value={song.config?.chordPaneSize || ''} onChange={handleChange} />
        </label>
        <br />

        <label>
          Pages
          {song.pages.map((page, index) => (
            <LyricsPageForm key={index} lyricPage={page} chordBarsPerLine={chordBarsPerLine} />
          ))}
          <input type="text" name="chordPaneSize" value={song.config?.chordPaneSize || ''} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
};

export default SongForm;
