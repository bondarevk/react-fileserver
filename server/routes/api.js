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

module.exports = router;