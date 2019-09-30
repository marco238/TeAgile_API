const mongoose = require('mongoose');
const DB_NAME = 'teagile';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
      console.info(`Connect to db ${DB_NAME}`);
  })
  .catch(error => {
      console.error(`Unable to connect to db ${DB_NAME}: ${error}`);
  });