const { MercadoPagoConfig, Preference } = require('mercadopago');

// Asegúrate de que dotenv esté configurado para cargar las variables de entorno
require('dotenv').config();

// Inicializa Mercado Pago con el Access Token desde .env
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const createPreference = async (req, res) => {
  try {
    const { items } = req.body;

    // Crea una preferencia de pago con los datos recibidos
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map(item => ({
          title: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
        })),
        back_urls: {
          success: 'http://localhost:4173/success',
          failure: 'http://localhost:4173/failure',
          pending: 'http://localhost:4173/pending',
        },
        auto_return: 'approved',
      },
    });

    // Devuelve el ID de la preferencia
    res.status(200).json({ id: response.body.id });
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
};

module.exports = {
  createPreference,
};
