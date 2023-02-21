const Description = require("../models/Description_model");
const handleError = require("../helpers/handleError");

const getAllDescription = async (req, res) => {
  try {
    const data = await Description.find()
      .populate("dict_id")
      .populate("category_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addDescription = async (req, res) => {
  try {
    const { dict_id, category_id, description } = req.body;
    const newDescription = new Description({
      dict_id,
      category_id,
      description,
    });
    await newDescription.save();
    return res.status(200).json({
      message: "Description is saved successfully",
      data: newDescription,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putDescription = async (req, res) => {
  try {
    const oldDescription = await Description.findById(req.params.id);
    if (!oldDescription)
      return res
        .status(400)
        .json({ message: "Bunday Description bazada mavjud emas." });
    const updatedDescription = await Description.findByIdAndUpdate(
      req.params.id,
      {
        dict_id: req.body.dict_id || oldDescription.dict_id,
        category_id: req.body.category_id || oldDescription.category_id,
        description: req.body.description || oldDescription.description,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Description is updated successfully",
      data: updatedDescription,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteDescription = async (req, res) => {
  try {
    const delDescription = await Description.findByIdAndDelete(req.params.id);
    if (!delDescription)
      return res
        .status(400)
        .json({ message: "Bunday Description bazada mavjud emas." });
    return res.status(200).json({
      message: "Description is deleted successfully",
      data: delDescription,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllDescription,
  addDescription,
  putDescription,
  deleteDescription,
};
