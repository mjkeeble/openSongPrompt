import {TSong} from "src/types";
import ProgressBar from "./ProgressBar";
import Chords from "./Chords";
import Lyrics from "./Lyrics";

type TProps = {
  song: TSong;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const LyricPage: React.FC<TProps> = ({song, currentPage, setCurrentPage}) => {
  const duration = song.pages[currentPage - 1].duration;
  
  return (
    <div>
      {!!duration && !!song.tempo && !!song.timeSignature && (
        <ProgressBar
          tempo={song.tempo}
          timeSignature={song.timeSignature}
          duration={duration}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          finalPage={song.pages.length === currentPage}
        />
      )}

      <div className="grid h-full w-full grid-cols-12 divide-x">
        <div className="col-span-5 h-full p-4">
          <p className="mb-8 ml-6 text-left text-7xl font-semibold text-bj-green-light">
            {song.pages[currentPage - 1].section}{' '}
            <span className="text-3xl">
              {currentPage}/{song.pages.length}
            </span>
          </p>
          <Chords chords={song.pages[currentPage - 1].chords} />
        </div>
        <div className="col-span-7 h-full px-4">
          <Lyrics lyrics={song.pages[currentPage - 1].lyrics} />
        </div>
      </div>
    </div>
  );
}

export default LyricPage
