/* eslint-disable no-console */

import { usePoll } from '../lib';

declare const window: {
  marcus: string;
} & Window;

setTimeout(() => {
  window.marcus = 'marcus';
}, 4500);

function App({ successfulPoll = true }: { successfulPoll?: boolean }) {
  usePoll({
    fn: (interval) => {
      console.log('Polling');
      if (window.marcus && successfulPoll) {
        console.log('🚀 ~ App ~ window.marcus:', window.marcus);
        clearInterval(interval);
      }
    },
    pollCount: 30,
  });
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
