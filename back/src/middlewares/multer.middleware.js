const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/users');
  },
  filename: (req, file, callback) => {
    const name = '_' + Math.random().toString(36).substr(2, 9);//file.originalname.split(' ').join('_');5
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).any('photo');
