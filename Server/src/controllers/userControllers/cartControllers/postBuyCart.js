const mercadopago = require("mercadopago");
const { User, Manguera } = require("../../../db");

// Configura Mercado Pago con tu access token
const client = new mercadopago.MercadoPagoConfig({
  accessToken:
    "TEST-8914053964380499-072819-0e25f688909c7429f596f12992b0c3f3-1921011382",
});
const preference = new mercadopago.Preference(client);

const postBuyCart = async (id, totalAmount) => {
  try {
    // Obtén el usuario por su ID
    const usuario = await User.findByPk(id);
    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }

    // Obtén y verifica el carrito del usuario
    const cart = usuario.cart;
    if (!Array.isArray(cart)) {
      throw new Error("El carrito del usuario no está en el formato esperado.");
    }
    console.log("Carrito del usuario:", cart);

    // Verificación del stock
    let stockIssues = [];
    for (let item of cart) {
      const [idProducto, cantidad] = item.split(":").map(Number);
      const manguera = await Manguera.findByPk(idProducto);
      if (manguera) {
        if (manguera.stock < cantidad) {
          stockIssues.push({
            idProducto,
            stock: manguera.stock,
            cantidadRequerida: cantidad,
          });
        }
      } else {
        stockIssues.push({ idProducto, stock: 0, cantidadRequerida: cantidad });
      }
    }

    // Manejo de problemas de stock
    if (stockIssues.length > 0) {
      throw new Error(
        `Stock insuficiente para algunos productos: ${JSON.stringify(
          stockIssues
        )}`
      );
    }

    // Crear la preferencia de pago en Mercado Pago
    const items = await Promise.all(
      cart.map(async (item) => {
        const [idProducto, cantidad] = item.split(":").map(Number);
        const manguera = await Manguera.findByPk(idProducto);
        if (!manguera) {
          throw new Error(`Producto con ID ${idProducto} no encontrado.`);
        }
        return {
          title: manguera.name,
          quantity: parseInt(cantidad),
          unit_price: parseFloat(manguera.price),
          currency_id: "USD",
        };
      })
    );

    const preferenceData = {
      body: {
        items,
        back_urls: {
          success: "https://thehosefactory.up.railway.app/checkout/feedBack",
          failure: "https://thehosefactory.up.railway.app/checkeout",
          pending: "https://thehosefactory.up.railway.app",
        },
        auto_return: "approved",
      },
    };
    console.log(
      "Datos de preferencia de pago antes de la creación:",
      JSON.stringify(preferenceData)
    );

    // Crear una nueva preferencia utilizando la configuración del cliente
    const response = await preference.create(preferenceData);
    const preferenceId = response.id;
    console.log(response);
    return preferenceId;
  } catch (error) {
    console.error("No se efectuó la compra:", error.message);
    throw new Error("No se efectuó la compra: " + error.message);
  }
};

module.exports = postBuyCart;
