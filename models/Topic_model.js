const { Schema, model } = require("mongoose");

const topicSchema = Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "author",
  },
  topic_title: {
    type: String,
    required: true,
  },
  topic_text: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  updated_date: {
    type: Date,
    required: true,
  },
  is_checked: {
    type: Boolean,
    required: true,
  },
  is_approwed: {
    type: Boolean,
    required: true,
  },
  expert_id: {
    type: Schema.Types.ObjectId,
    ref: "author",
  },
});

module.exports = model("topic", topicSchema);
