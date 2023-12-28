const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController')
const authMiddleware = require('../middleware/authMiddelware')

// Clients
router.post('/registration', clientController.registration)
router.post('/login', clientController.login)
router.get('/auth',authMiddleware, clientController.check)
router.put('/:id' ,clientController.updateClient);// Оновлення клієнта за ідентифікатором
router.delete('/:id', clientController.deleteClient);// Видалення клієнта за ідентифікатором

module.exports = router;