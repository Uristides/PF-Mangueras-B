async function register(name, password, email, rol) {
  try {
    const UserExist = await User.findOne({ where: { email: email } });

    if (UserExist) {
    }
  } catch (error) {}
}

module.exports = register;
