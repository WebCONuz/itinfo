const Synonym = require("../models/Synonym_model");
const handleError = require("../helpers/handleError");

const getAllSynonym = async (req, res) => {
  try {
    const data = await Synonym.find().populate("desc_id").populate("dict_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneSynonym = async (req, res) => {
  try {
    const data = await Synonym.findById(req.params.id)
      .populate("desc_id")
      .populate("dict_id");
    if (!data)
      return res.status(400).json({ message: "Bunday Synonym mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    if (!desc_id || !dict_id) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new Synonym({ desc_id, dict_id });
    await newData.save();
    return res.status(201).json({
      message: "Synonym is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putSynonym = async (req, res) => {
  try {
    const oldData = await Synonym.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday Synonym bazada mavjud emas." });
    const updatedData = await Synonym.findByIdAndUpdate(
      req.params.id,
      {
        desc_id: req.body.desc_id || oldData.desc_id,
        dict_id: req.body.dict_id || oldData.dict_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Synonym is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const delData = await Synonym.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday Synonym bazada mavjud emas." });
    return res.status(200).json({
      message: "Synonym is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllSynonym,
  getOneSynonym,
  addSynonym,
  putSynonym,
  deleteSynonym,
};
