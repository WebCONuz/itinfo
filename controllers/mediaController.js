const Media = require("../models/Media_model");
const handleError = require("../helpers/handleError");

const getAllMedia = async (req, res) => {
  try {
    const data = await Media.find();
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneMedia = async (req, res) => {
  try {
    const data = await Media.findById(req.params.id);
    if (!data)
      return res.status(400).json({ message: "Bunday Media mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addMedia = async (req, res) => {
  try {
    const { name, file, table_name, table_id } = req.body;
    if (!table_id || !name || !file || !table_name) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new Media({ name, file, table_name, table_id });
    await newData.save();
    return res.status(201).json({
      message: "Media is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putMedia = async (req, res) => {
  try {
    const oldData = await Media.findById(req.params.id);
    if (!oldData)
      return res
        .status(400)
        .json({ message: "Bunday Media bazada mavjud emas." });
    const updatedData = await Media.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || oldData.name,
        file: req.body.file || oldData.file,
        table_name: req.body.table_name || oldData.table_name,
        table_id: req.body.table_id || oldData.table_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Media is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const delData = await Media.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday Media bazada mavjud emas." });
    return res.status(200).json({
      message: "Media is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllMedia,
  getOneMedia,
  addMedia,
  putMedia,
  deleteMedia,
};
