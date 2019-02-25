const Page = require('./page');

export default (number) => {
  const result = [];

  for (let i = 0; i < number; i++) {
    result.push(i);
  }

  return result;
}