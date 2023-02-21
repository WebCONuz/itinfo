const { Schema, model } = require("mongoose");

const authorSchema = Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Maximum firstName length: 3"],
    maxLength: [30, "Minimum firstName length: 30"],
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Minimum lastName length: 3"],
    maxLength: [30, "Maximum lastName length: 30"],
  },
  nickname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Iltimos emailni to'g'ri kiriting",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Minimum password length: 6"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2}-\d{3}-\d{2}-\d{2}/.test(v);
      },
      message: (props) =>
        `${props.value} - Telefon raqam mos emas (namuna: 97-123-45-67)`,
    },
    maxLength: 12,
    required: true,
    index: true,
  },
  info: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  expert: {
    type: Boolean,
  },
});

module.exports = model("author", authorSchema);
