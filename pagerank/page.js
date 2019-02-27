const mongo = require('../utils/mongo');
const mongoose = require('mongoose');

function map () {
  /* foreach of its links */
  let pagerank = 0;
  this.links.map(link => {
    pagerank += (link.linkNumber > 0) ? link.pagerank / link.linkNumber : 0;
  });
  pagerank *= 0.85;
  pagerank += 0.15;
  emit(this.name, pagerank);
};
function reduce (key, values) {
  return {
    v: values,//.filter((v) => v._id === key),
    k: key,
  }
};

class Page {
  constructor(name, linkOut, pagerank, linkNumber = 0) {
    this.name = name;
    this.linkOut = linkOut;
    this.pagerank = pagerank;
    this.links = [];
    this.linkNumber = linkNumber;
  }

  addLink(page) {
    console.log(">>", page.name, "now linked to", this.name);
    const { name, linkOut, pagerank, linkNumber } = page;
    this.links.push({ name, linkOut, pagerank, linkNumber });
  }

  static updatePageranks() {
    return new Promise((resolve, reject) => {
      mongoose.connection.collection('pages').mapReduce(map, reduce, { out: "reduced" }, (err, res) => {
        if(err) return reject(err);

        mongoose.connection.db.collection('pages').find({}, (e, docs) => {
          if (e) return reject(e);
          return resolve(true);
        });
      });
    });
  }
}

module.exports = Page;
