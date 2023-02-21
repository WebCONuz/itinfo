const Tag = require("../models/Tag_model");
const handleError = require("../helpers/handleError");

const getAllTag = async (req, res) => {
  try {
    const data = await Tag.find().populate("category_id").populate("topic_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneTag = async (req, res) => {
  try {
    const data = await Tag.findById(req.params.id)
      .populate("category_id")
      .populate("topic_id");
    if (!data)
      return res.status(400).json({ message: "Bunday Tag mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addTag = async (req, res) => {
  try {
    const { category_id, topic_id } = req.body;
    if (!category_id || !topic_id) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new Tag({ category_id, topic_id });
    await newData.save();
    return res.status(201).json({
      message: "Tag is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putTag = async (req, res) => {
  try {
    const oldData = await Tag.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday Tag bazada mavjud emas." });
    const updatedData = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        category_id: req.body.category_id || oldData.category_id,
        topic_id: req.body.topic_id || oldData.topic_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Tag is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteTag = async (req, res) => {
  try {
    const delData = await Tag.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday Tag bazada mavjud emas." });
    return res.status(200).json({
      message: "Tag is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllTag,
  getOneTag,
  addTag,
  putTag,
  deleteTag,
};
