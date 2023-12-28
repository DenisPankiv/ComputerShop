const express = require('express');
const router = express.Router();
const componentInventoryController = require('../controllers/componentInventoryController');

router.get('/', componentInventoryController.getAllComponentInventory);
router.post('/', componentInventoryController.createComponentInventory);
router.put('/:id', componentInventoryController.updateComponentInventory);
router.delete('/:id', componentInventoryController.deleteComponentInventory);

module.exports = router;