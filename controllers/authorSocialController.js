const AuthorSocial = require("../models/AuthorSocial_model");
const handleError = require("../helpers/handleError");

const getAllAuthorSocial = async (req, res) => {
  try {
    const data = await AuthorSocial.find()
      .populate("author_id")
      .populate("social_id");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneAuthorSocial = async (req, res) => {
  try {
    const data = await AuthorSocial.findById(req.params.id)
      .populate("author_id")
      .populate("social_id");
    if (!data)
      return res.status(400).json({ message: "Bunday data mavjud emas." });
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addAuthorSocial = async (req, res) => {
  try {
    const { social_link, author_id, social_id } = req.body;
    if (!social_link || !author_id || !social_id) {
      return res
        .status(400)
        .json({ message: "Yuborilgan ma'lumotlar to'liq emas" });
    }
    const newData = new AuthorSocial({
      social_link,
      author_id,
      social_id,
    });
    await newData.save();
    return res.status(200).json({
      message: "Social link is saved successfully",
      data: newData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const putAuthorSocial = async (req, res) => {
  try {
    const olddata = await AuthorSocial.findById(req.params.id);
    if (!olddata)
      return res
        .status(400)
        .json({ message: "Bunday data bazada mavjud emas." });
    const updatedData = await AuthorSocial.findByIdAndUpdate(
      req.params.id,
      {
        social_link: req.body.social_link || olddata.social_link,
        author_id: req.body.author_id || olddata.author_id,
        social_id: req.body.social_id || olddata.social_id,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Media link is updated successfully",
      data: updatedData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteAuthorSocial = async (req, res) => {
  try {
    const delData = await AuthorSocial.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(400)
        .json({ message: "Bunday data bazada mavjud emas." });
    return res.status(200).json({
      message: "Data is deleted successfully",
      data: delData,
    });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllAuthorSocial,
  addAuthorSocial,
  putAuthorSocial,
  deleteAuthorSocial,
  getOneAuthorSocial,
};
