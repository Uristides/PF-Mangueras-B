const getReviewsUser = require("../../../controllers/controllerProducts/reviews/getUserReviews");

const getReviewsUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getReviewsUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getReviewsUserHandler;
