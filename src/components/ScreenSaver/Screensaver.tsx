import { NavIndicator } from '..';

const Screensaver = () => {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-1/3">
          <img className="my-60 drop-shadow-logo" src="/blues-jab-logo.png" alt="Blues Jab" />
        </div>
        <h1 className="text-9xl">www.bluesjab.de</h1>
      </div>

      <NavIndicator rightShort="play" />
    </div>
  );
};

export default Screensaver;
