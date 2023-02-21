const Social = require("../models/Social_model");
const handleError = require("../helpers/handleError");

const getAllSocial = async (req, res) => {
  try {
    const data = await Social.find();
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneSocial = async (req, res) => {
  try {
    const oneSocial = await Social.findById(req.params.id);
    if (!oneSocial)
      return res.status(400).json({ message: "Bunday media mavjud emas" });

    res.status(200).json({ message: "OK", data: oneSocial });
  } catch (err) {
    handleError(res, err);
  }
};

const addSocial = async (req, res) => {
  try {
    const { name, icon } = req.body;
    if (!name || !icon)
      return res
        .status(400)
        .json({ message: "Kiritiluvchi ma'lumot to'liq emas." });
    const newSocial = new Social({
      name,
      icon,
    });
    await newSocial.save();
    return res
      .status(201)
      .json({ message: "Term is saved successfully", data: newSocial });
  } catch (err) {
    handleError(res, err);
  }
};

const putSocial = async (req, res) => {
  try {
    const oldSocial = await Social.findById(req.params.id);
    if (!oldSocial)
      return res
        .status(400)
        .json({ message: "Bunday media bazada mavjud emas." });
    const updatedSocial = await Social.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || oldSocial.name,
        icon: req.body.icon || oldSocial.icon,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Social is updated successfully", data: updatedSocial });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const delSocial = await Social.findByIdAndDelete(req.params.id);
    if (!delSocial)
      return res
        .status(400)
        .json({ message: "Bunday media bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "Social is deleted successfully", data: delSocial });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllSocial,
  addSocial,
  putSocial,
  deleteSocial,
  getOneSocial,
};
