const Question = require("../models/QuestionAnswer_model");
const handleError = require("../helpers/handleError");

const getAllQA = async (req, res) => {
  try {
    const data = await Question.find().populate("expert_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneQA = async (req, res) => {
  try {
    const data = await Question.findById(req.params.id).populate("expert_id");
    if (!data)
      return res.status(400).json({ message: "Bunday Question mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addQA = async (req, res) => {
  try {
    const {
      question,
      answer,
      created_date,
      updated_date,
      is_checked,
      expert_id,
    } = req.body;
    if (
      !question ||
      !answer ||
      !created_date ||
      !updated_date ||
      !is_checked ||
      !expert_id
    ) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new Question({
      question,
      answer,
      created_date,
      updated_date,
      is_checked,
      expert_id,
    });
    await newData.save();
    return res.status(201).json({
      message: "Question is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putQA = async (req, res) => {
  try {
    const oldData = await Question.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday Question bazada mavjud emas." });
    const updatedData = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question: req.body.question || oldData.question,
        answer: req.body.answer || oldData.answer,
        created_date: req.body.created_date || oldData.created_date,
        updated_date: req.body.updated_date || oldData.updated_date,
        is_checked: req.body.is_checked || oldData.is_checked,
        expert_id: req.body.expert_id || oldData.expert_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Question is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteQA = async (req, res) => {
  try {
    const delData = await Question.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday Question bazada mavjud emas." });
    return res.status(200).json({
      message: "Question is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllQA,
  getOneQA,
  addQA,
  putQA,
  deleteQA,
};
