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

module.exports = {
  insert: (spell) => mongoose.connection.collection('spells').insertOne({ spell }),
  insertPages: (pages) => {
    mongoose.connection.collection('pages').insertMany(pages, (err, res) => {
      if(err) return console.log("error while inserting to mongoDB");
      
      console.log(res, "inserted");
      process.exit(1);
    });
  }
}