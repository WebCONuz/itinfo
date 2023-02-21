const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Maximum firstName length: 3"],
      maxLength: [30, "Minimum firstName length: 30"],
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
    info: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    user_is_active: {
      type: Boolean,
      default: false,
    },
    user_activation_link: {
      type: String,
    },
    user_token: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
