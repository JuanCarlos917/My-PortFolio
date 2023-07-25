const express = require('express');
const router = express();
const {
	generateSignedUrlMiddleware,
	uploadFile,
	upload,
	listFiles,
    delteFileS3
} = require('../controllers/s3MediaController');

router.get('/list', listFiles);
router.get('/generate-url/:key', generateSignedUrlMiddleware);
router.post('/', upload.single('file'), uploadFile);
router.delete('/delete-file/:key', delteFileS3);

module.exports = router;
