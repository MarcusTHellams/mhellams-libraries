/* eslint-disable no-console */
const log = (...args: unknown[]) => {
  console.log.apply(this, [...args.map((arg) => JSON.stringify(arg, null, 2))]);
};

export default log;
