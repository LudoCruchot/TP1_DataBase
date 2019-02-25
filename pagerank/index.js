const sandboxData = require("./sandboxData");

const pages = sandboxData(5);

console.log(pages);

const page1 = pages[0];
const page2 = pages[1];
const page3 = pages[2];

page1.addLink(page2);
page1.addLink(page3);

page2.addLink(page1);

console.log(page1);