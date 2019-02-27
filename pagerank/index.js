const mongoUtil = require('../utils/mongo');
const getSandboxData = require("./sandboxData");
const Page = require('./page');

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
    .then(() => {
      console.log(">>PAGES INSERTED TO MONGO");
      /* let's update the pageranks */
      Page.updatePageranks()
        .then(() => {
          console.log(">>PAGESRANKS UPDATED");
          process.exit(1);
        })
        .catch(e => console.log("err =>", e));
    });
  });
