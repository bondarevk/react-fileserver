const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const multer = require('multer');
const api = require('./routes/api');
const fse = require('fs-extra');

const iosocket = require('./ioscoket');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

iosocket.init(io);

global.uploadsDir = './server/static/uploads/';

app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

fse.ensureDirSync(global.uploadsDir);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, global.uploadsDir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
global.upload = multer({ storage : storage }).array('file');

global.bans = {};


app.use(bodyParser.json());
app.use('/api', api);
app.use('/uploads', express.static(path.resolve(__dirname, 'static', 'uploads')));

app.get('*', (req, res) => {
  let ip = req.connection.remoteAddress;
  if (ip.length > 7 && ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  console.log(`${req.baseUrl} - ${ip} > `);

  if (global.bans.hasOwnProperty(ip)) {
    if (global.bans[ip] === true) {
      res.send('<b>YOU HAVE BEEN BANNED</b>')
    }
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  }

});

module.exports = http;