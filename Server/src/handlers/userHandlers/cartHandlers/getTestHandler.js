const getTestHandler = (req, res) => {
    return res.status(200).send("All good");
}

module.exports = getTestHandler;
