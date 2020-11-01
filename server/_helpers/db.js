const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const dbURL = 'mongodb://127.0.0.1:27017/';
mongoose.connect(process.env.MONGODB_URI || dbURL, connectionOptions) //mongodb://mongodb:27017/test
.then(() => {
    console.log(`mongoDb connection establish successfully at: ${dbURL}`);
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};