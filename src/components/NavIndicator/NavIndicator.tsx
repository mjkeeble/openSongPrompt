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

  return (
    <div
      className={`fixed bottom-0 left-0 m-1 grid w-96 grid-cols-4 bg-black grid-rows-${rows} bokrder-2 rounded-lg border pt-4 text-5xl`}
    >
      <p className="mb-2 pl-2 pt-1 text-left text-4xl font-semibold text-bj-blue-light">{showShort ? 'Short' : ''}</p>

      <div>
        {showShort ? (
          <FontAwesomeIcon
            className=" text-center text-bj-blue-light"
            icon={leftShort ? symbols[leftShort] : faMinus}
            rotation={leftShort === 'backward' ? 180 : undefined}
          />
        ) : (
          <></>
        )}
      </div>

      <div>
        {showShort ? (
          <FontAwesomeIcon
            className=" text-center text-bj-blue-light"
            icon={centreShort ? symbols[centreShort] : faMinus}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {showShort ? (
          <FontAwesomeIcon
            className=" text-center text-bj-blue-light"
            icon={rightShort ? symbols[rightShort] : faMinus}
          />
        ) : (
          <></>
        )}
      </div>
      {showLong ? (
        <p className="mb-0 mt-2 pl-2 pt-1 text-left text-4xl font-semibold text-bj-green-light">Long</p>
      ) : null}
      {showLong ? (
        <div>
          <FontAwesomeIcon
            className="mt-2 text-center text-bj-green-light"
            icon={leftLong ? symbols[leftLong] : faMinus}
          />
        </div>
      ) : null}
      {showLong ? (
        <div>
          <FontAwesomeIcon
            className="mt-2 text-center text-bj-green-light"
            icon={centreLong ? symbols[centreLong] : faMinus}
          />
        </div>
      ) : null}
      {showLong ? (
        <div>
          <FontAwesomeIcon
            className="mt-2 text-center text-bj-green-light"
            icon={rightLong ? symbols[rightLong] : faMinus}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NavIndicator;
