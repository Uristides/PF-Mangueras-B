const getInfoById = require("../../controllers/controllerProducts/getById");

const getInfoHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getInfoById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getInfoHandler;
