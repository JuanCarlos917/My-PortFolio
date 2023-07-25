const express = require('express');
const router = express();
const {
	generateSignedUrlMiddleware,
	uploadFile,
	upload,
	listFiles,
} = require('../controllers/s3MediaController');

router.get('/list', listFiles);
router.get('/generate-url/:key', generateSignedUrlMiddleware);
router.post('/', upload.single('file'), uploadFile);

module.exports = router;
