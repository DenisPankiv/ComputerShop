const express = require('express');
const router = express.Router();
const computerModelsController = require('../controllers/computerModelsController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', computerModelsController.getAllComputerModels);
router.get('/:id',computerModelsController.getOneComputerModels);
router.post('/', checkRole('ADMIN'), computerModelsController.createComputerModels);
router.put('/:id', checkRole('ADMIN'), computerModelsController.updateComputerModel);
router.delete('/:id',checkRole('ADMIN'), computerModelsController.deleteComputerModel);

module.exports = router;