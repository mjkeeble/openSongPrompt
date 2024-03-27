import { NavIndicator } from '..';

type TProps = {
  isStart: boolean;
  isLastSong: boolean;
};

const Screensaver: React.FC<TProps> = ({ isStart, isLastSong }) => {
  
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-1/3">
          <img className="my-60 drop-shadow-logo" src="/blues-jab-logo.png" alt="Blues Jab" />
          {/* <div className="w-3/5">
          <img src="/songPrompter_logo_transparent_white.png" alt="openSongPrompt. Your songs. On stage. No worries" /> */}
        </div>
        <h1 className="text-9xl">www.bluesjab.de</h1>
      </div>

      <NavIndicator
        leftShort={isStart ? undefined : 'backwardStep'}
        rightShort={isLastSong ? 'x' : 'play'}
        centreLong="eject"
      />
    </div>
  );
};

export default Screensaver;
