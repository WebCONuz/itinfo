const descrTopic = require("../models/DescTopic_model");
const handleError = require("../helpers/handleError");

const getAllDescTopic = async (req, res) => {
  try {
    const data = await descrTopic
      .find()
      .populate("desc_id")
      .populate("topic_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneDescTopic = async (req, res) => {
  try {
    const data = await descrTopic
      .findById(req.params.id)
      .populate("desc_id")
      .populate("topic_id");
    if (!data)
      return res
        .status(400)
        .json({ message: "Bunday descrTopic mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addDescTopic = async (req, res) => {
  try {
    const { desc_id, topic_id } = req.body;
    if (!desc_id || !topic_id) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new descrTopic({ desc_id, topic_id });
    await newData.save();
    return res.status(201).json({
      message: "descrTopic is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putDescTopic = async (req, res) => {
  try {
    const oldData = await descrTopic.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday descrTopic bazada mavjud emas." });
    const updatedData = await descrTopic.findByIdAndUpdate(
      req.params.id,
      {
        desc_id: req.body.desc_id || oldData.desc_id,
        topic_id: req.body.topic_id || oldData.topic_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "descrTopic is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteDescTopic = async (req, res) => {
  try {
    const delData = await descrTopic.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday descrTopic bazada mavjud emas." });
    return res.status(200).json({
      message: "descrTopic is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllDescTopic,
  getOneDescTopic,
  addDescTopic,
  putDescTopic,
  deleteDescTopic,
};
