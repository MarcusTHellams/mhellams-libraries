import { usePoll } from '../lib';
import { renderHook } from './tests/utils/utils';

describe('usePoll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call the callback function at specified intervals', () => {
    const fn = vi.fn();
    renderHook(() => usePoll({ fn, ms: 1000, pollCount: 3 }));

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should stop polling after pollCount is reached and run the failedFn function', () => {
    const fn = vi.fn();
    const failedFn = vi.fn();
    renderHook(() =>
      usePoll({ fn, ms: 1000, pollCount: 3, pollFailsFn: failedFn })
    );

    vi.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(failedFn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(3); // should not be called more than pollCount
    expect(failedFn).toHaveBeenCalledTimes(1);
  });

  it('should clear the interval when the condition is met', () => {
    const fn = vi.fn((interval) => {
      if (fn.mock.calls.length >= 2) {
        clearInterval(interval);
      }
    });
    renderHook(() => usePoll({ fn, ms: 1000, pollCount: 5 }));

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(2000);
    expect(fn).toHaveBeenCalledTimes(2); // should not be called more than 2 times
  });
});
