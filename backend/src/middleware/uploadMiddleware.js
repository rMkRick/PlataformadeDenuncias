const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // Default max file size 50MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (mime.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) { // 5MB for images
        return cb(new Error('Image file size exceeds 5MB limit!'), false);
      }
    } else if (mime.startsWith('video/')) {
      if (file.size > 50 * 1024 * 1024) { // 50MB for videos
        return cb(new Error('Video file size exceeds 50MB limit!'), false);
      }
    } else if (mime === 'application/pdf' || mime === 'application/msword' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      if (file.size > 10 * 1024 * 1024) { // 10MB for documents
        return cb(new Error('Document file size exceeds 10MB limit!'), false);
      }
    } else {
      return cb(new Error('Unsupported file type!'), false);
    }
    cb(null, true);
  }
});

module.exports = upload;