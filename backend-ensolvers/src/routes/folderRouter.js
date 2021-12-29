const express = require('express');
const router = express.Router();
const controller = require('../controllers/folderController');
const auth = require('../middlewares/auth')


//router.get('/', controller.list);
router.get('/', controller.listByUser);
router.post('/', controller.createFolder);
router.delete('/:id', controller.deleteFolder);

router.post('/:id/task', controller.createTask);
router.get('/:id/task', controller.getTasks);

module.exports = router;