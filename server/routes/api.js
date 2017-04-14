const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  Object.values(req.files).forEach((file) => {

    let filepath = 'server/static/uploads/' + file.name;
    fs.exists(filepath, (exists) => {
      if (!exists) {
        file.mv(filepath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });

  res.send('request accepted');
});

module.exports = router;