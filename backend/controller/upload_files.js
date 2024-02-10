const express = require("express");
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Dynamically create the uploads folder if it doesn't exist
const uploadsFolder = path.join(__dirname, '../../myuploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsFolder); // Use the dynamically created uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Files uploaded successfully!' });
});


module.exports = router;