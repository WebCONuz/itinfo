const Category = require("../models/Category_model");
const handleError = require("../helpers/handleError");
const { categoryValidation } = require("../validations/categoryValidate");

const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find().populate("categoryName");
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const addCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, ref } = req.body;
    const oldCategory = await Category.findOne({
      categoryName: { $regex: name, $options: "i" },
    });
    if (oldCategory)
      return res
        .status(400)
        .json({ message: "Bunday categoriya bazada mavjud." });
    const newCategory = new Category({
      categoryName: name,
      parentCategoryId: ref,
    });
    await newCategory.save();
    return res
      .status(200)
      .json({ message: "Category is saved successfully", data: newCategory });
  } catch (err) {
    handleError(res, err);
  }
};

const putCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const oldCategory = await Category.findById(req.params.id);
    if (!oldCategory)
      return res
        .status(400)
        .json({ message: "Bunday categoriya bazada mavjud emas." });
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        categoryName: req.body.name || oldCategory.categoryName,
        parentCategoryId: req.body.ref || oldCategory.parentCategoryId,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Category is updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const delCategory = await Category.findByIdAndDelete(req.params.id);
    if (!delCategory)
      return res
        .status(400)
        .json({ message: "Bunday category bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "Category is deleted successfully", data: delCategory });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllCategory,
  addCategory,
  putCategory,
  deleteCategory,
};
