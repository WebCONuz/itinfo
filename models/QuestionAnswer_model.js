const { Schema, model } = require("mongoose");

const qaSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
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
  expert_id: {
    type: Schema.Types.ObjectId,
    ref: "author",
  },
});

module.exports = model("question_answer", qaSchema);
