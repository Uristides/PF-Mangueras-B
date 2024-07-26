
const getReviewsUserId = require('../../../controllers/controllerProducts/reviews/getReviewsUserId')

const getUserReviewsHandler = async ( req, res )=>{
    const { id } = req.params;

    try {
        const response = await getReviewsUserId(id)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = getUserReviewsHandler


