const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.get('/', promotionController.getPromotions);
router.post('/', promotionController.createPromotion);
router.put('/:id', promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);

module.exports = promotionRoutes;
