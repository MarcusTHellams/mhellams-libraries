import { useState } from 'react';

import { MTHReactLoader } from '../lib';

function App() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <>
      <div
        ref={setContainer}
        style={{
          height: '250px',
          backgroundColor: 'red',
          color: 'white',
          position: 'relative',
        }}
      >
        Hello World
      </div>
      <MTHReactLoader container={container} show render={() => 'Children'} />
    </>
  );
}

export default App;
