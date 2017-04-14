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

module.exports = router;