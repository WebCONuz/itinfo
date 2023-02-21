const DescQA = require("../models/DescQA_model");
const handleError = require("../helpers/handleError");

const getAllDescQA = async (req, res) => {
  try {
    const data = await DescQA.find().populate("qa_id").populate("desc_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneDescQA = async (req, res) => {
  try {
    const data = await DescQA.findById(req.params.id)
      .populate("qa_id")
      .populate("desc_id");
    if (!data)
      return res.status(400).json({ message: "Bunday DescQA mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addDescQA = async (req, res) => {
  try {
    const { desc_id, qa_id } = req.body;
    if (!desc_id || !qa_id) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new DescQA({ qa_id, desc_id });
    await newData.save();
    return res.status(201).json({
      message: "DescQA is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putDescQA = async (req, res) => {
  try {
    const oldData = await DescQA.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday DescQA bazada mavjud emas." });
    const updatedData = await DescQA.findByIdAndUpdate(
      req.params.id,
      {
        desc_id: req.body.desc_id || oldData.desc_id,
        qa_id: req.body.qa_id || oldData.qa_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "DescQA is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteDescQA = async (req, res) => {
  try {
    const delData = await DescQA.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday DescQA bazada mavjud emas." });
    return res.status(200).json({
      message: "DescQA is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllDescQA,
  getOneDescQA,
  addDescQA,
  putDescQA,
  deleteDescQA,
};
