import { TLyricPage } from 'src/types';
import EditChords from './EditChords';
import EditLyrics from './EditLyrics';

type TProps = {
  lyricPage: TLyricPage;
  chordBarsPerLine: number;
}

const LyricPageForm = (props: TProps) => {
  return (
    <div>
      <label>
        Section
        <input type="text" name="section" value={props.lyricPage.section} />
      </label>
      <label>
        Duration
        <input type="text" name="duration" value={props.lyricPage.duration} />
      </label>
      <label>
        Chords
        <EditChords chords={props.lyricPage.chords} />
      </label>
      <label>
        Lyrics
        <EditLyrics lyrics={props.lyricPage.lyrics} chordBarsPerLine={props.chordBarsPerLine} />
      </label>
    </div>
  );
};

export default LyricPageForm;
