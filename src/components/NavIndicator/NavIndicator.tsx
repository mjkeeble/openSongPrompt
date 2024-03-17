import {
  IconDefinition,
  faBackward,
  faBackwardFast,
  faBackwardStep,
  faCircle,
  faDownLong,
  faForward,
  faForwardFast,
  faForwardStep,
  faHandPointer,
  faMinus,
  faPlay,
  faStop,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type symbolKeys =
  | 'backward'
  | 'backwardFast'
  | 'backwardStep'
  | 'down'
  | 'forward'
  | 'forwardFast'
  | 'forwardStep'
  | 'pause'
  | 'point'
  | 'play'
  | 'stop'
  | 'up';

type TProps = {
  leftLong?: symbolKeys;
  leftShort?: symbolKeys;
  centreShort?: symbolKeys;
  centreLong?: symbolKeys;
  rightShort?: symbolKeys;
  rightLong?: symbolKeys;
};

const symbols: { [key: string]: IconDefinition } = {
  backward: faBackward,
  backwardFast: faBackwardFast,
  backwardStep: faBackwardStep,
  down: faDownLong,
  forward: faForward,
  forwardFast: faForwardFast,
  forwardStep: faForwardStep,
  pause: faStop,
  point: faHandPointer,
  play: faPlay,
  stop: faStop,
  up: faUpLong,
};

const NavIndicator: React.FC<TProps> = ({ leftLong, leftShort, centreLong, centreShort, rightLong, rightShort }) => {
  const showShort = leftShort || centreShort || rightShort;
  const showLong = leftLong || centreLong || rightLong;
  const rows = 1 + (showLong ? 1 : 0) + (showShort ? 1 : 0);

  return (
    <div
      className={`fixed bottom-0 left-0 m-1 grid w-96 grid-cols-4 bg-black grid-rows-${rows} rounded-lg border pt-4 text-3xl`}
    >
      <p className="mb-2 pl-2 pt-1 text-left text-2xl font-semibold text-bj-blue-mid">Short</p>

      <div>
        {showShort ? (
          <FontAwesomeIcon className=" text-center text-bj-blue-mid" icon={leftShort ? symbols[leftShort] : faMinus} />
        ) : (
          <></>
        )}
      </div>

      <div>
        {showShort ? (
          <FontAwesomeIcon
            className=" text-center text-bj-blue-mid"
            icon={centreShort ? symbols[centreShort] : faMinus}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {showShort ? (
          <FontAwesomeIcon
            className=" text-center text-bj-blue-mid"
            icon={rightShort ? symbols[rightShort] : faMinus}
          />
        ) : (
          <></>
        )}
      </div>
      <div></div>
      <div>
        <FontAwesomeIcon className={`${showLong ? '' : 'pb-4'}`} icon={faCircle} />
      </div>

      <div>
        <FontAwesomeIcon icon={faCircle} />
      </div>
      <div>
        <FontAwesomeIcon icon={faCircle} />
      </div>
      {showLong && <p className="mb-0 pl-2 pt-1 text-left text-2xl font-semibold text-bj-green-mid">Long</p>}
      {showLong && (
        <div>
          <FontAwesomeIcon className="text-center text-bj-green-mid" icon={leftLong ? symbols[leftLong] : faMinus} />
        </div>
      )}
      {showLong && (
        <div>
          <FontAwesomeIcon
            className=" text-center text-bj-green-mid"
            icon={centreLong ? symbols[centreLong] : faMinus}
          />
        </div>
      )}
      {showLong && (
        <div>
          <FontAwesomeIcon className=" text-center text-bj-green-mid" icon={rightLong ? symbols[rightLong] : faMinus} />
        </div>
      )}
    </div>
  );
};

export default NavIndicator;
