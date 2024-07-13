const getLongitudes = require("../../../controllers/controllerProducts/categories/getLongitude");

const getLongitudesHandler = async (req, res) => {
  try {
    res.status(200).send(await getLongitudes());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getLongitudesHandler;
