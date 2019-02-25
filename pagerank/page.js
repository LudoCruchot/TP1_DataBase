class Page {
  constructor(name, linkOut, pageRank) {
    this.name = name;
    this.linkOut = linkOut;
    this.pageRank = pageRank;
    this.linkIn = 0;
  }
}

module.exports = Page;