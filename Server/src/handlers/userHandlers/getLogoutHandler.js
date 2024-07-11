const logoutHandler = (req, res) => {
  try {
    return res.clearCookie("lacookie").send("cookie limpia");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = logoutHandler;
