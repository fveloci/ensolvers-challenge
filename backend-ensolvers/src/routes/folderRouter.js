const express = require('express');
const router = express.Router();
const controller = require('../controllers/folderController');
const auth = require('../middlewares/auth')


//router.get('/', controller.list);
router.get('/', controller.listByUser);
router.post('/', controller.createFolder);

module.exports = router;