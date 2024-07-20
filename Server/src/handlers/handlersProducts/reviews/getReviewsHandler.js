const getReviewsProduct = require("../../../controllers/controllerProducts/reviews/getReviews");

const getReviewsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getReviewsProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getReviewsHandler;
