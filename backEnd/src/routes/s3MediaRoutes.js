const express = require('express');
const router = express();
const {
	uploadFile,
	upload,
	listFiles,
	delteFileS3,
} = require('../controllers/s3MediaController');
const { generateUrlMiddleware } = require('../middleware/generateUrlMiddleware');

router.get('/list', listFiles);
router.get('/generate-url/:key', generateUrlMiddleware);
router.post('/', upload.single('file'), uploadFile);
router.delete('/delete-file/:key', delteFileS3);

module.exports = router;
