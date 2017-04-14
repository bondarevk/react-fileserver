const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');
const api = require('./routes/api');

const app = express();

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './server/static/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
global.upload = multer({ storage : storage }).array('file');


app.use(bodyParser.json());
app.use('/api', api);
app.use('/uploads', express.static(path.resolve(__dirname, 'static', 'uploads')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;