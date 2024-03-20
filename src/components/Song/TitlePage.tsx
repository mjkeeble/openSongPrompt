import { NavIndicator } from '..';
import CountIn from './CountIn';

type TProps = {
  title: string;
  songKey: string | undefined;
  setup: string | undefined;
  tempo: number;
  timeSignature: string;
  isLastSong: boolean;
};

const TitlePage: React.FC<TProps> = ({ title, songKey, setup, tempo, timeSignature, isLastSong }) => {
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden px-8 py-8">
      <header className=" m-2 flex items-start justify-between text-4xl ">
        <h1 className="text-left">{title}</h1>
        <h2>{currentTime}</h2>
      </header>
      <div className="flex h-full items-center justify-center">
        <div className="w-full text-center text-lyric">
          {songKey && <p>Key: {songKey}</p>}
          {setup && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-lyric">{setup}</p>
            </div>
          )}
          <div>
            <CountIn tempo={tempo} timeSignature={timeSignature} />
          </div>
        </div>
      </div>
      <NavIndicator
        leftShort="backwardFast"
        centreShort="eject"
        rightShort="play"
        rightLong={isLastSong ? 'forwardStep' : 'eject'}
        // centreShort="eject"  // TODO: add navigate back to setlist
      />
    </div>
  );
};

export default TitlePage;
