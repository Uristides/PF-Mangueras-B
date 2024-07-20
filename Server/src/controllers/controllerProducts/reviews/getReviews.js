const { Review } = require("../../../db");

const getReviewsProduct = async (id) => {
  try {
    const reviews = await Review.findAll({ where: { mangueraId: id } });
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

module.exports = getReviewsProduct;
