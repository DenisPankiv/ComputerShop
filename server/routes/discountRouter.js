const express = require('express');
const router = express.Router();
const discountsController = require('../controllers/discountsController');

router.get('/', discountsController.getAllDiscounts);
router.post('/', discountsController.createDiscount);
router.put('/:id', discountsController.updateDiscount);
router.delete('/:id', discountsController.deleteDiscount);


module.exports = router;