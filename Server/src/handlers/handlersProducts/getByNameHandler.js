const getProductByName = require("../../controllers/controllerProducts/getByName");

const getByNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const producByName = await getProductByName(name);
      res.status(200).json(producByName);
    } else {
      res.status(400).json({ error: "No se encontro" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getByNameHandler;
