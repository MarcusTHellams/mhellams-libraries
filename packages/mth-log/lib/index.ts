/* eslint-disable no-console */
const log = (prefix = '', obj: unknown) => {
  console.log(prefix, JSON.stringify(obj, null, 2));
};

export default log;
