const postCreateDogs = async (req, res) => {
  const { image, name, height, weight, life_span, temperaments } = req.body;
  try {
    const info = {
      image: image,
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
    };
    const response = await createDogDB(info, temperaments);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
