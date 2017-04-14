const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const api = require('./routes/api');

const app = express();

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(fileUpload());
app.use('/api', api);
app.use('/uploads', express.static(path.resolve(__dirname, 'static', 'uploads')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;