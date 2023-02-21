const Dictionary = require("../models/Dictionary_model");
const handleError = require("../helpers/handleError");

const getAllDict = async (req, res) => {
  try {
    const data = await Dictionary.find();
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getAllDictByLetter = async (req, res) => {
  try {
    // How to make for one letter
  } catch (err) {
    handleError(res, err);
  }
};

const addDict = async (req, res) => {
  try {
    const { term } = req.body;
    const oldTerm = await Dictionary.findOne({
      term: { $regex: term, $options: "i" },
    });
    if (oldTerm)
      return res.status(400).json({ message: "Bunday atama bazada mavjud." });
    const newTerm = new Dictionary({
      term,
      letter: term[0],
    });
    await newTerm.save();
    return res
      .status(200)
      .json({ message: "Term is saved successfully", data: newTerm });
  } catch (err) {
    handleError(res, err);
  }
};

const putDict = async (req, res) => {
  try {
    const oldTerm = await Dictionary.findById(req.params.id);
    if (!oldTerm)
      return res
        .status(400)
        .json({ message: "Bunday atama bazada mavjud emas." });
    const updatedTerm = await Dictionary.findByIdAndUpdate(
      req.params.id,
      {
        term: req.body.term || oldTerm.term,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Termin is updated successfully", data: updatedTerm });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteDict = async (req, res) => {
  try {
    const delTerm = await Dictionary.findByIdAndDelete(req.params.id);
    if (!delTerm)
      return res
        .status(400)
        .json({ message: "Bunday atama bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "Termin is deleted successfully", data: delTerm });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllDict,
  addDict,
  putDict,
  deleteDict,
};
