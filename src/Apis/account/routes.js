const express = require('express');
const accController = require('./controller');
const router = express.Router();
const { authenticate } = require('../../middlewares/authMiddleware');

router.post('/create/customer_account', authenticate, accController.createWallet);

module.exports = router;