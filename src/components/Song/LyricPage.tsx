import { TSong } from 'src/types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import { getScreenSplit } from './utils';

type TProps = {
  song: TSong;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  timerHalted: boolean;
};

const LyricPage: React.FC<TProps> = ({ song, currentPage, setCurrentPage, timerHalted }) => {
  const screenSplit = getScreenSplit(
    song.config?.chordPaneSize,
    !!song.pages[currentPage - 1].chords.length,
    !!song.pages[currentPage - 1].lyrics.length,
  );

  return (
    <div className="flex h-screen flex-col overflow-y-hidden">
      {!!song.pages[currentPage - 1] && !!song.tempo && !!song.timeSignature ? (
        <ProgressBar
          tempo={song.tempo}
          timeSignature={song.timeSignature}
          timerHalted={timerHalted}
          duration={song.pages[currentPage - 1].duration || undefined}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          finalPage={song.pages.length === currentPage}
        />
      ) : null}

      <div className="grid flex-1 grid-cols-10 divide-x overflow-y-auto">
        <div className={`col-span-${screenSplit} p-4`}>
          <div className="flex flex-row justify-between text-bj-green-light">
            <p className="mb-8 ml-6 text-left text-5xl font-semibold">{song.pages[currentPage - 1].section} </p>

            <p className="mr-4 text-right text-5xl">
              {currentPage}/{song.pages.length}
            </p>
          </div>
          <Chords
            chords={song.pages[currentPage - 1].chords}
            isLastPage={currentPage === song.pages.length}
            timerHalted={timerHalted}
            hasTimer={!!song.pages[currentPage - 1].duration}
          />
        </div>
        {/* <div className="col-span-8 overflow-y-hidden px-4" style={{ height: 'calc(100vh - 60px)' }}> */}
        <div className={`col-span-${10 - screenSplit} overflow-y-hidden px-4`} style={{ height: 'calc(100vh - 60px)' }}>
          <Lyrics lyrics={song.pages[currentPage - 1].lyrics} />
        </div>
      </div>
    </div>
  );
};

export default LyricPage;
