import React, {RefObject} from 'react'

type TProps = {
  ref?: RefObject<HTMLButtonElement> | ((button: HTMLButtonElement) => void);
  classes: string;
  text: string;
  onclick?: () => void;
};

export const Button:React.FC<TProps> = ({classes, text, onclick}) => {
  return (
    <button
      className={`${classes} w-full p-2 my-1 text-center rounded-md border-none focus:outline-none focus:ring-2 focus:ring-bj-green-mid focus:ring-offset-2 hover:ring-2 hover:ring-bj-red hover:ring-offset-2 transition-colors duration-300 ease-in-out`}
      onClick={onclick}>{text}</button>
  )
}
