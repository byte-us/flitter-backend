"use strict";

const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })


router.post('/upload', upload.single('image'), (req, res) => {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    res.send('Se ha subido');
    res.render('/image')
  });

module.exports = router;