const { Schema, model } = require("mongoose");

const descqaSchema = Schema({
  qa_id: {
    type: Schema.Types.ObjectId,
    ref: "question_answer",
  },
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "description",
  },
});

module.exports = model("descQA", descqaSchema);
