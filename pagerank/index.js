const mongoUtil = require('../utils/mongo');
const getSandboxData = require("./sandboxData");

const pages = getSandboxData();

const page1 = pages[0];
const page2 = pages[1];
const page3 = pages[2];

page1.addLink(page2);
page1.addLink(page3);

page2.addLink(page1);

console.log(pages);
mongoUtil.insertPages(pages);