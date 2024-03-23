import { TSong } from 'src/types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';

type TProps = {
  song: TSong;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  timerHalted: boolean;
};

const LyricPage: React.FC<TProps> = ({ song, currentPage, setCurrentPage, timerHalted }) => {

  return (
    <div className='flex flex-col h-screen'>
      {!!song.pages[currentPage - 1] && !!song.tempo && !!song.timeSignature && (
        <ProgressBar
          tempo={song.tempo}
          timeSignature={song.timeSignature}
          timerHalted={timerHalted}
          duration={song.pages[currentPage - 1].duration || undefined}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          finalPage={song.pages.length === currentPage}
        />
      )}

      <div className="flex-1 grid h-full w-full grid-cols-12 divide-x">
        <div className="col-span-5 h-full p-4">
          <div className="flex flex-row justify-between text-bj-green-light">
            <p className="mb-8 ml-6 text-left text-5xl font-semibold">
              {song.pages[currentPage - 1].section}{' '}
            </p>
            <p className="text-right text-5xl mr-4">
              {currentPage}/{song.pages.length}
            </p>
          </div>
          <Chords chords={song.pages[currentPage - 1].chords}
            isLastPage={currentPage === song.pages.length}
            timerHalted={timerHalted}
            hasTimer={!!song.pages[currentPage - 1].duration } />
        </div>
        <div className="col-span-7 h-full px-4">
          <Lyrics lyrics={song.pages[currentPage - 1].lyrics} />
        </div>
      </div>
    </div>
  );
};

export default LyricPage;
