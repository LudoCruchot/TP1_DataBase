const mongoose = require('mongoose');

const { DB_HOST, DB_NAME } = require('../config.json');

module.exports = {
  connect: () => new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true }, (err) => {
      if (err) {
        reject(">>Error while conencting to MongoDB");
      } 

      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error: '));
      db.once('open',  () => console.log('Connection successful'));

      // if node crashes, closes Mongo connection
      process.on('SIGINT', () => {  
        mongoose.connection.close(() => { 
          console.log('>>Mongoose default connection disconnected through app termination'); 
          process.exit(0); 
        }); 
      }); 

      resolve(true);
    });
  })
}