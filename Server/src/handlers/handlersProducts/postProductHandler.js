const createProductDB = require("../../controllers/controllerProducts/postProduct");

const postCreateProduct = async (req, res) => {
  /* const { image, name, height, weight, life_span, temperaments } = req.body;
  try {
    const info = {
      image: image,
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
    
};
*/
  const info = req.body;
  try {
    const response = await createProductDB(info /*brand*/);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postCreateProduct;
