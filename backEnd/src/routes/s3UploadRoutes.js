const express = require('express');
const router = express();
const {generateSignedUrl, uploadFile} = require('../controllers/s3UploadController')


router.get('/generateSignedUrl', generateSignedUrl)
router.post('/uploadFile', uploadFile)

module.exports = router;