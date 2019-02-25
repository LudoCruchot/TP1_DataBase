class Page {
  constructor(name, linkOut, pagerank) {
    this.name = name;
    this.linkOut = linkOut;
    this.pagerank = pagerank;
    this.links = [];
  }

  addLink(page) {
    const link = { 
      pagerank: page.pagerank, 
      linkOut: page.linkOut 
    };
    this.links.push(link);
  }
}

module.exports = Page;