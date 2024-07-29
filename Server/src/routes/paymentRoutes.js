const { Router } = require('express');
const { createPreference } = require('../handlers/paymentHandler.js');

const router = Router();

// Ruta para crear la preferencia de pago
router.post('/create_preference', createPreference);

module.exports = router;
