const express = require("express");
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Dynamically create the uploads folder if it doesn't exist
//const uploadsFolder = path.join(__dirname, '../../frontend/public/myuploads');
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
  
const upload = multer({ 
     storage: storage,
     fileFilter: function (req, file, cb) {
        const allowedFileExtensions = ['.jpg', '.jpeg', '.png'];

        // Check if the file extension is in the allowed list
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedFileExtensions.includes(ext)) {
            cb(null, true);
        } else {
            const error = new Error('Invalid file type. Only JPG and PNG images are allowed.');
            error.code = 'INVALID_FILE_TYPE';
            cb(error);
        }
    },

});

// Middleware to handle Multer errors
const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: 'Multer error: ' + err.message });
    } else if (err && err.code === 'INVALID_FILE_TYPE') {
      res.status(400).json({ error: err.message });
    } else if (err) {
      res.status(500).json({ error: 'Internal server error: ' + err.message });
    } else {
      next();
    }
};


router.post('/upload', upload.array('files'), handleMulterErrors, (req, res) => {
     // Get the file paths from the uploaded files
  const filePaths = req.files.map(file => path.join(file.originalname));

    // Respond with success message and file paths
   res.json({ 
        message: 'Files uploaded successfully!', 
        files:  filePaths
    });
    
});


module.exports = router;