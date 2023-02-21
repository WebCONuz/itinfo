const { Schema, model } = require("mongoose");

const authSchema = Schema({
  social_link: {
    type: String,
    required: true,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  social_id: {
    type: Schema.Types.ObjectId,
    ref: "social",
    required: true,
  },
});

module.exports = model("authorsocial", authSchema);
