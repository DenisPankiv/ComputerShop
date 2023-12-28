const express = require('express');
const router = express.Router();
const computerComponentsController = require('../controllers/computerComponentsController');

// ComputerComponents
router.get('/', computerComponentsController.getAllComputerComponents);
router.post('/', computerComponentsController.createComputerComponents);
router.get('/:id', computerComponentsController.getOneComputerComponents);
router.put('/:id', computerComponentsController.updateComputerComponents);
router.delete('/:id', computerComponentsController.deleteComputerComponents);


module.exports = router;