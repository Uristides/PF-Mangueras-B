const { Manguera, Review } = require("../../../db");

const postReview = async (userId, mangueraId, info) => {
  return await Review.create({ ...info, userId, mangueraId });
};

module.exports = postReview;
