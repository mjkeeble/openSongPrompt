import {forwardRef} from "react";

type TProps = {
  classes?: string;
  text: string;
  onclick?: () => void;
};

const SetlistButton = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-2/3 rounded-full border-none p-2 text-center text-7xl transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-bj-red hover:ring-offset-2 focus:bg-bj-green-mid focus:text-bj-white focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});

export default SetlistButton;
