import { forwardRef } from 'react';

type TProps = {
  classes?: string;
  text: string;
  onclick?: () => void;
};

const SongListButton = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-2/3 rounded-full border-none p-2 text-center text-7xl transition-colors duration-300 ease-in-out focus:text-8xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});

export default SongListButton;
