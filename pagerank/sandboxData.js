const Page = require('./page');

const values = {
  number: 3,
  linksOut: [1, 2, 3],
  pageranks: [5, 5, 5],
  linkNumber: [2, 1, 0],
}

module.exports = () => {
  const result = [];

  for (let i = 0; i < values.number; i++) {
    const newPage = new Page(`Page-${i}`, values.linksOut[i], values.pageranks[i], values.linkNumber[i]);
    result.push(newPage);
  }

  return result;
}