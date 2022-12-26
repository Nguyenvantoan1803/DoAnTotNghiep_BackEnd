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

const {createCompany, findCompany, uploadCompany,ratingCompany} = require('../controllers/company')

router.post("/",createCompany)
router.post("/check",findCompany)
router.post("/update",uploadCompany)
router.post("/rating",ratingCompany)

module.exports = router;
