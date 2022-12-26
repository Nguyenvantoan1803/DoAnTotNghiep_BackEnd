const express = require('express');
const router = express.Router();
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + '.pdf')
    }
  })
var upload = multer({ storage: storage })

const {addUser, checkUser, uploadCV, getCV} = require('../controllers/user')

router.post("/",addUser)
router.post("/login",checkUser)
router.post("/uploadCv", upload.single('file') ,uploadCV)
router.get("/:username",getCV)

module.exports = router;
