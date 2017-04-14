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
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  })
});

module.exports = router;