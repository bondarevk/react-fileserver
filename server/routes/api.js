const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');


  res.send('whoop');
});

module.exports = router;