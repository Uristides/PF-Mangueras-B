const getTypes = require("../../../controllers/controllerProducts/categories/getTypes");

const getTypesHandler = async (req, res) => {
  try {
    res.status(200).send(await getTypes());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getTypesHandler;
