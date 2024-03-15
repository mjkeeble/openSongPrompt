import {forwardRef} from "react";

type TProps = {
  classes?: string;
  text: string;
  onclick?: () => void;
};

const GigButton = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-1/2 rounded-md border-none p-2 text-center text-3xl transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-bj-red hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-bj-green-mid focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});

export default GigButton;
