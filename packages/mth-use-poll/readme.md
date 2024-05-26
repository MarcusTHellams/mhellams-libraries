# mth-use-poll

A React hook that runs a poll to check for a condition to be met, and if the condition is not met within a certain amount of time, the polling is stopped.

## Parameters

- **options** (object): The options to pass to usePoll.
  - **fn** (function): The callback function that checks for a condition to be met. It receives the interval ID as a parameter and should call **clearInterval** to stop the polling when the condition is met.
  - **ms** (number, optional): The interval time in milliseconds for the polling. Defaults to **500ms**.
  - **pollCount** (number, optional): The maximum number of times the polling function should run before it stops if the condition is not met. Defaults to **10**.
  - **pollFailsFn** (function, optional): A callback function that runs if the condition that is checked for never comes to conclusion and the pollCount is met.

## Example Usage

```javascript
import React, { useState } from 'react';
import { usePoll } from '@mhellams/mth-use-poll';

const PollingComponent = () => {
  const [data, setData] = useState(null);

  const pollFailsFn = ()=>{
  	console.error('Never received a response')
  }

  const fetchData = async (intervalToClear) => {
    const response = await fetch('https://api.example.com/data');
    const result = await response.json();

    if (result.conditionMet) {
      setData(result.data);
      clearInterval(intervalToClear);
    }
  };

  usePoll({ fn: fetchData, ms: 1000, pollCount: 5, pollFailsFn });

  return <div>{data ? <p>Data: {data}</p> : <p>Loading...</p>}</div>;
};

export default PollingComponent;
```

## Details

- Polling Mechanism: The usePoll hook sets up an interval that runs the provided callback function at the specified interval (ms). The callback function receives the interval ID, which can be used to clear the interval and stop polling when the desired condition is met.
- Automatic Stop: The polling will automatically stop if the specified pollCount is reached, ensuring that the polling does not run indefinitely if the condition is never met  A callback function can be run if the poll us automatically stopped.
- Usage with API Calls: This hook is particularly useful for scenarios where you need to repeatedly check an external condition, such as the result of an API call, and stop checking once the condition is satisfied.

## Parameters in Detail

- **fn**: This callback function is the core of the polling mechanism. It should contain the logic to check if the condition is met and call clearInterval with the provided interval ID to stop further polling.
- **ms**: This parameter defines the time interval between each poll. Adjust this based on how frequently you need to check the condition.
- **pollCount**: This parameter limits the number of polling attempts, preventing infinite polling loops and ensuring that your application does not keep checking indefinitely if the condition cannot be met.
- **pollFailsFn**: The callback function that is run if the condition being checked for is never met.

## Tips

- **Handling Side Effects**: Ensure that any side effects within the callback function (like state updates) are properly managed to avoid memory leaks or unnecessary re-renders.
- **Error Handling**: Implement error handling within the callback function to manage any potential issues that arise during polling, such as network errors or unexpected responses.

## Liscense

MIT

This documentation provides a comprehensive guide on how to use the usePoll hook, including an example to illustrate its usage in a real-world scenario.
