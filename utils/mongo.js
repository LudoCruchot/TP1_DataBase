const mongoose = require('mongoose');

const { DB_HOST, DB_NAME } = require('../config.json');

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(">>Error while conencting to MongoDB");
    process.exit(0);
  }

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => console.log('Connection successful'));

  // if node crashes, closes Mongo connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('>>Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
});

const updatePromise = (data) => new Promise((resolve, reject) => {
  console.log("d", data);
  mongoose.connection.collection('pages').updateOne({ name: data._id }, { $set: { pagerank: data.value } }, (err, doc) => {
    if(err) return reject("error while updating pagerank " + err);
    return resolve();
  });
});

module.exports = {
  clearCollection: (name) => new Promise((resolve, reject) => {
    mongoose.connection.collection(name).deleteMany({}, (err, res) => {
      if (err) return reject("Error while cleaning");

      return resolve(res);
    })
  }),
  insert: (spell) => mongoose.connection.collection('spells').insertOne({ spell }),
  insertPages: (pages) => new Promise((resolve, reject) => {
    mongoose.connection.collection('pages').insertMany(pages, (err, res) => {
      if(err) return reject("error while inserting to mongoDB" + err);
          
      return resolve(res);
    });
  }),
  updatePageranks: (data) => new Promise((resolve, reject) => {
      Promise.all(data.map(d => updatePromise(d)))
        .then(res => resolve(res))
        .catch(e => {
          console.log("error in .all", e);
          return reject("error in .all" + e);
        }); 
    })
}