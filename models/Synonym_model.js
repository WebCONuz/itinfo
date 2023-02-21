const { Schema, model } = require("mongoose");

const synonymSchema = Schema({
  desc_id: {
    type: Schema.Types.ObjectId,
    ref: "description",
  },
  dict_id: {
    type: Schema.Types.ObjectId,
    ref: "dictionary",
  },
});

module.exports = model("synonym", synonymSchema);
