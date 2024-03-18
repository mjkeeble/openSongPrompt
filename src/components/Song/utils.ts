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
  | 'up'
  | undefined;

export const leftShortCommand: symbolKeys = 'up'

export const centreShortCommand: symbolKeys = 'point';

export const rightShortCommand: symbolKeys = 'down';

export const leftLongCommand: symbolKeys = 'backwardFast';

export const centreLongCommand: symbolKeys = 'up';

export const rightLongCommand: symbolKeys = 'up';
