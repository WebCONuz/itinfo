const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

module.exports = model("category", categorySchema);
