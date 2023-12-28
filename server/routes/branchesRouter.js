const express = require('express');
const router = express.Router();
const branchesController = require('../controllers/branchesController')

// Branches
router.get('/', branchesController.getAllBranches);// Отримання списку філій
router.post('/', branchesController.createBranch); // Створення нової філії
router.put('/:id', branchesController.updateBranch);// Оновлення філії за ідентифікатором
router.delete('/:id', branchesController.deleteBranch);// Видалення філії за ідентифікатором

module.exports = router;