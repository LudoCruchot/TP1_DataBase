const Page = require('./page');

const values = {
  number: 5,
  linksOut: [1, 2, 3, 4, 5],
  pageranks: [10, 10, 10, 10, 10]
}

module.exports = () => {
  const result = [];

  for (let i = 0; i < values.number; i++) {
    const newPage = new Page(`Page-${i}`, values.linksOut[i], values.pageranks[i]);
    result.push(newPage);
  }

  return result;
}