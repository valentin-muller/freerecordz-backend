const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: 'dysfmyeoa',
  api_key: '693716298261861',
  api_secret: 'h7MMUU7azqsi_SJwshXoNA_NrN0'
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'freerecordz',
  allowedFormats: ['mp3', 'wav']
});
 
const parser = multer({ storage: storage });

module.exports = parser