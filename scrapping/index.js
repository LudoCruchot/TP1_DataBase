const mongoUtil = require('../utils/mongo');
const launchScrapping = require('./extractor');

console.log(">>LAUNCHING SCRAPPING SCRIPT");

mongoUtil.connect().then(launchScrapping);