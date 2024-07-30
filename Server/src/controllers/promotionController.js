// controllers/promotionController.js

const { Promotion, Manguera } = require('../db');

// Crear una nueva promoción
exports.createPromotion = async (req, res) => {
  try {
    const { title, description, discountPercentage, startDate, endDate, isActive, mangueras } = req.body;

    const promotion = await Promotion.create({
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      isActive,
    });

    if (mangueras && mangueras.length > 0) {
      const selectedMangueras = await Manguera.findAll({ where: { id: mangueras } });
      await promotion.setMangueras(selectedMangueras);
    }

    res.status(201).json(promotion);
  } catch (error) {
    console.error('Error creating promotion:', error);
    res.status(500).json({ error: 'Error creating promotion' });
  }
};

// Actualizar una promoción existente
exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discountPercentage, startDate, endDate, isActive, mangueras } = req.body;

    const promotion = await Promotion.findByPk(id);

    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    await promotion.update({
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      isActive,
    });

    if (mangueras && mangueras.length > 0) {
      const selectedMangueras = await Manguera.findAll({ where: { id: mangueras } });
      await promotion.setMangueras(selectedMangueras);
    }

    res.json(promotion);
  } catch (error) {
    console.error('Error updating promotion:', error);
    res.status(500).json({ error: 'Error updating promotion' });
  }
};

// Obtener todas las promociones
exports.getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      include: [{ model: Manguera }], // Incluye las mangueras relacionadas
    });
    res.json(promotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    res.status(500).json({ error: 'Error fetching promotions' });
  }
};

// Eliminar una promoción
exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findByPk(id);

    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    await promotion.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting promotion:', error);
    res.status(500).json({ error: 'Error deleting promotion' });
  }
};
