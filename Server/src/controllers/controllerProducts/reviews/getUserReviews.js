const { Review } = require("../../../db");

const getReviewsUser = async (id) => {
  try {
    const reviews = await Review.findAll({ where: { userId: id } });
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

module.exports = getReviewsUser;
