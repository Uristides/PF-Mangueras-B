const postReview = require("../../../controllers/controllerProducts/reviews/postReview");

const postReviewHandler = async (req, res) => {
  const { userId, mangueraId, comment, rating } = req.body;
  try {
    const info = {
      comment: comment,
      rating: rating,
    };
    const response = await postReview(userId, mangueraId, info);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postReviewHandler;
