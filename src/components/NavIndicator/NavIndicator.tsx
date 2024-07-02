import {
  IconDefinition,
  faArrowRotateRight,
  faBackwardFast,
  faBackwardStep,
  faDownLong,
  faEject,
  faForwardStep,
  faHandPointer,
  faMinus,
  faPause,
  faPlay,
  faUpLong,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type symbolKeys =
  | 'backward'
  | 'backwardFast'
  | 'backwardStep'
  | 'down'
  | 'eject'
  | 'forwardStep'
  | 'pause'
  | 'point'
  | 'play'
  | 'reload'
  | 'up'
  | 'x';

type TProps = {
  leftLong?: symbolKeys;
  leftShort?: symbolKeys;
  centreShort?: symbolKeys;
  centreLong?: symbolKeys;
  rightShort?: symbolKeys;
  rightLong?: symbolKeys;
};

const symbols: { [key: string]: IconDefinition } = {
  backward: faPlay,
  backwardFast: faBackwardFast,
  backwardStep: faBackwardStep,
  down: faDownLong,
  eject: faEject,
  forwardStep: faForwardStep,
  pause: faPause,
  point: faHandPointer,
  play: faPlay,
  reload: faArrowRotateRight,
  up: faUpLong,
  x: faX,
};

const NavIndicator: React.FC<TProps> = ({ leftLong, leftShort, centreLong, centreShort, rightLong, rightShort }) => {
  const showShort = leftShort || centreShort || rightShort;
  const showLong = leftLong || centreLong || rightLong;
  const rows = (showLong ? 1 : 0) + (showShort ? 1 : 0);

  if (!rows) return <></>;
  // TODO: refactor this to simplify the ternaries
  return (
    <div className={`fixed bottom-0 left-0 m-1 rounded-lg border-2 bg-black pt-1 text-3xl`}>
      {/* <p className="mb-2 pl-2 pt-1 text-left text-4xl font-semibold text-bj-blue-light">{showShort ? 'Short' : ''}</p> */}

      {showShort ? (
        <div className="grid grid-cols-3 mt-1">
          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={leftShort ? symbols[leftShort] : faMinus}
            rotation={leftShort === 'backward' ? 180 : undefined}
          />

          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={centreShort ? symbols[centreShort] : faMinus}
          />

          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={rightShort ? symbols[rightShort] : faMinus}
          />
        </div>
      ) : (
        null
      )}

      {/* {showLong ? (
        <p className="mb-0 mt-2 pl-2 pt-1 text-left text-4xl font-semibold text-bj-green-light">Long</p>
      ) : null} */}
      {showLong ? (
        <div className="grid grid-cols-3 mb-2">
          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={leftLong ? symbols[leftLong] : faMinus}
          />

          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={centreLong ? symbols[centreLong] : faMinus}
          />

          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={rightLong ? symbols[rightLong] : faMinus}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NavIndicator;
