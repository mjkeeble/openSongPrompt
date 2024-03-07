import { useEffect, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GIGS from '../../../data/gigs';
import { TGig } from '../../types';
import { useGig } from '../../context';
import { displayDate } from '../../utils';
import dateBasedStatus from './utils';

export const Gigs = () => {
  const { selectedGig, setSelectedGig } = useGig();
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    // Find the index of the gig for today or the last gig before today
    const gigIndex = GIGS.reduce((acc, gig, index) => {
      const gigDate = new Date(gig.dateTime);
      gigDate.setHours(0, 0, 0, 0); // Normalize gig date

      // If gigDate is today or before today and closer to today than the current acc
      if (gigDate <= today && (acc === -1 || gigDate > new Date(GIGS[acc].dateTime))) {
        return index;
      }
      return acc;
    }, -1);

    // If a gig is found, focus on its button
    if (gigIndex !== -1 && buttonsRef.current[gigIndex]) {
      buttonsRef.current[gigIndex].focus();
    }
  }, []);

  const handleKeyDown = (event: { key: string }) => {
    const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
    if (event.key === 'k' && currentIndex > 0) {
      buttonsRef.current[currentIndex - 1].focus();
    } else if (event.key === 'l' && currentIndex < buttonsRef.current.length - 1) {
      buttonsRef.current[currentIndex + 1].focus();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <h1 className="mb-5 font-fredericka text-5xl text-bj-white">Gigs</h1>
      <ul className="boxShadow">
        {GIGS.map((gigFromList: TGig, index) => (
          <li key={gigFromList.id}>
            <Button
              ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
              classes={`${dateBasedStatus(gigFromList.dateTime, gigFromList.id, selectedGig)}`}
              onclick={() => {
                setSelectedGig(gigFromList.id);
                Navigate(`/setList/${gigFromList.id}`);
              }}
              text={`${displayDate(gigFromList.dateTime)}, ${gigFromList.venue}, ${gigFromList.town}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

type TProps = {
  classes: string;
  text: string;
  onclick?: () => void;
};


const Button = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`${classes} my-1 w-full rounded-md border-none p-2 text-center transition-colors duration-300 ease-in-out hover:ring-2 hover:ring-bj-red hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-bj-green-mid focus:ring-offset-2`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});
