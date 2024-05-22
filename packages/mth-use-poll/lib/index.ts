import { useEffect, useRef } from 'react';

/**
 *  A React hook to run polling to look for a condition to be met and after a certain amount of time if the condition
 *  is not met then the polling is stopped.
 *
 * @callback requestCallback
 * @param {intervalToClear} - the number id from an interval to clear
 *
 *
 * @param {Object} options - the options to pass to usePoll
 * @param {requestCallback} options.fn - the callback that checks for a condition to be met and when the condition is met cancels the interval
 * @param {number} [options.ms = 500] - the amount of milliseconds to apply to the setInterval function. The default
 * @param {number} [options.pollCount = 10] - the amount of times the setInterval function should run before it is canaled because the condition that is being looked for was never met
 *
 */
export const usePoll = ({
  fn,
  ms = 500,
  pollCount = 10,
}: {
  fn: (intervalToClear: number) => void;
  ms?: number;
  pollCount?: number;
}) => {
  const fnRef = useRef(fn);
  const pollCountRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pollCountRef.current >= pollCount) {
        clearInterval(interval);
      }
      fnRef.current(interval as unknown as number);
      pollCountRef.current += 1;
    }, ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
