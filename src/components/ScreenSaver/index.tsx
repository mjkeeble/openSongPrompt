import '../../../public/blues_jab_logo.svg';
// import { TGig } from '../../../types';
// import { displayDate } from '../../utils';

export const ScreenSaver= () => {
  return (
    <div>
      <div className="flex h-full flex-col items-center justify-center">
        <img src="blues_jab_logo.svg" alt="Blues Jab Logo" />
        <h1>www.bluesjab.de</h1>
      </div>
      <div className="sticky bottom-0 text-center">
        <h1>footer</h1>
        {/* <h1>{gig.location}</h1>
        <h1>{displayDate(gig.date)}</h1> */}
      </div>
    </div>
  );
};
