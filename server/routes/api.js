const express = require('express');
const fs = require('fs');
const router = express.Router();

router.put('/upload', (req, res) => {
  res.header("Content-Type", "application/json");
  global.upload(req, res, (error) => {
    if (error) {
      res.status(400).send({
        status: 'error'
      })
    } else {
      res.status(200).send({
        status: 'success'
      })
    }
  })
});

router.delete('/delete/:filename', (req, res) => {
  res.header("Content-Type", "application/json");
  fs.unlink(global.uploadsDir + req.params.filename, (error) => {
    if (error) {
      res.status(400).send({
        status: 'error'
      })
    } else {
      res.status(200).send({
        status: 'success'
      })
    }
  })
});

router.get('/files', (req, res) => {
  res.header("Content-Type", "application/json");
    fs.readdir(global.uploadsDir, (error, files) => {
    if (error) {
      res.status(400).send({
        status: 'error'
      })
    } else {
      res.status(200).send({
        status: 'success',
        files: files
      })
    }
  })
});

const weather = [
  {c: '-1c'},
  {c: '-2c'},
  {c: '-3c'},
  {c: '-4c'},
  {c: '-5c'},
  {c: '-6c'},
  {c: '-7c'}
];

router.get('/weather', (req, res) => {
  res.header("Content-Type", "application/json");

  let day = +req.query['day'];
  if (day > 0 && day <= 7) {
    res.send(weather[day + 1]);
  } else {
    res.status(400).send();
  }
});

module.exports = router;