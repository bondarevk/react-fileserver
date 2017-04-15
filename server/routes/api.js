const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/upload', (req, res) => {
  global.upload(req, res, function(err) {
    console.log(req.files);
    if(err) {
      res.status(400).send("Error uploading file.");
      return;
    }
    res.send("File uploaded.");
  })
});

router.post('/files', (req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");

  let files = fs.readdirSync('./server/static/uploads/');

  res.status(200).send({
    status: 'success',
    files: files
  })
});

module.exports = router;