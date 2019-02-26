const mongoUtil = require('../utils/mongo');
const getSandboxData = require("./sandboxData");

const pages = getSandboxData();

const page1 = pages[0];
const page2 = pages[1];
const page3 = pages[2];

page1.addLink(page2);
page1.addLink(page3);
page2.addLink(page1);

/* insert pages with links */
mongoUtil
  .clearCollection("pages")
  .catch(e => console.log(e))
  .then(() => {
    mongoUtil.insertPages(pages)
    .catch(err => console.log(err))
    .then(res => {
      console.log(">>BASE PAGES INSERTED");
      /* let's update the pageranks */
      const updatedPages = pages.map(page => page.updatePagerank());
      // pages[0].updatePagerank();
    });
  })
