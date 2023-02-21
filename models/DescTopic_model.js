const { Schema, model } = require("mongoose");

const descrTopicSchema = Schema({
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "description",
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "topic",
  },
});

module.exports = model("descr_topic", descrTopicSchema);
