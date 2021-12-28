const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

router.delete('/:id', controller.deleteTask);
router.put('/:id', controller.modifyTask);
router.put('/:id/done', controller.checkTask);

module.exports = router;