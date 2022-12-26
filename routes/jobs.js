const express = require('express');
const router = express.Router();
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })
var upload = multer({ storage: storage })

const {addJob, closeJob, updateJob, getJobByIdCompany, getJobByTime} = require('../controllers/job')

router.get("/",getJobByTime)
router.get("/:idCompany",getJobByIdCompany)
router.post("/add", upload.single('image') ,addJob)
router.post("/close",closeJob)
router.post("/update", upload.single('image') ,updateJob)

module.exports = router;
