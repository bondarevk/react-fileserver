const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');
const api = require('./routes/api');
const fs = require("fs");

const iosocket = require('./ioscoket');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

iosocket.init(io);

global.uploadsDir = './server/static/uploads/';

app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

if (!fs.existsSync(global.uploadsDir)){
  fs.mkdirSync(global.uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, global.uploadsDir);
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

module.exports = http;