const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Router = require('./src/router/Router');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const dbUrl = 'mongodb://localhost:27017/AnyDollBackend';

mongoose.set('debug', false);
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.on('open', () => {
  console.log('Database connected successfully!!!...');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/amy-doll', Router);
app.use(cors());
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log('Server is running on port 8000 !!!');
});
