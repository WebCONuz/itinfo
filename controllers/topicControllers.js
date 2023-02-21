const Topic = require("../models/Topic_model");
const handleError = require("../helpers/handleError");

const getAllTopic = async (req, res) => {
  try {
    const data = await Topic.find()
      .populate("author_id", "firstname lastname position -_id")
      .populate("expert_id", "firstname lastname position -_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneTopic = async (req, res) => {
  try {
    const data = await Topic.findById(req.params.id)
      .populate("author_id", "firstname lastname position -_id")
      .populate("expert_id", "firstname lastname position -_id");
    if (!data)
      return res.status(400).json({ message: "Bunday topic mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addTopic = async (req, res) => {
  try {
    const {
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_checked,
      is_approwed,
      expert_id,
    } = req.body;
    if (
      !author_id ||
      !topic_title ||
      !topic_text ||
      !created_date ||
      !updated_date ||
      !is_checked ||
      !is_approwed ||
      !expert_id
    ) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new Topic({
      author_id,
      topic_title,
      topic_text,
      created_date,
      updated_date,
      is_checked,
      is_approwed,
      expert_id,
    });
    await newData.save();
    return res.status(201).json({
      message: "Topic is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putTopic = async (req, res) => {
  try {
    const oldData = await Topic.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday topic bazada mavjud emas." });
    const updatedData = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        author_id: req.body.author_id || oldData.author_id,
        topic_title: req.body.topic_title || oldData.topic_title,
        topic_text: req.body.topic_text || oldData.topic_text,
        created_date: req.body.created_date || oldData.created_date,
        updated_date: req.body.updated_date || oldData.updated_date,
        is_checked: req.body.is_checked || oldData.is_checked,
        is_approwed: req.body.is_approwed || oldData.is_approwed,
        expert_id: req.body.expert_id || oldData.expert_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Topic is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const delData = await Topic.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday topic bazada mavjud emas." });
    return res.status(200).json({
      message: "Topic is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllTopic,
  addTopic,
  putTopic,
  deleteTopic,
  getOneTopic,
};
