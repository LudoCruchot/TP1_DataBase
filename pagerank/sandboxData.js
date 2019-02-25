const Page = require('./page');

module.exports = (number) => {
  const result = [];

  for (let i = 0; i < number; i++) {
    const newPage = new Page(`Page-${i}`, 2, 10);
    result.push(newPage);
  }

  return result;
}