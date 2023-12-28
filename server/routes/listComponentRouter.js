const express = require('express');
const router = express.Router();
const listComponentController = require('../controllers/listComponentController');

router.get('/', listComponentController.getAllListComponents);
router.post('/', listComponentController.createListComponent);
router.put('/:id', listComponentController.updateListComponent);
router.delete('/:id', listComponentController.deleteListComponent);

module.exports = router;