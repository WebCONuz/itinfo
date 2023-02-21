const { Schema, model } = require("mongoose");

const tagSchema = Schema({
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "topic",
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

module.exports = model("tag", tagSchema);
