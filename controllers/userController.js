const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("config");
const User = require("../models/User_model");
const handleError = require("../helpers/handleError");
const userValidation = require("../validations/userValidate");
const mailService = require("../services/MailService");

const getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (!data)
      return res.status(400).json({ message: "Bunday User mavjud emas" });

    res.status(200).json({ message: "OK", data: data });
  } catch (err) {
    handleError(res, err);
  }
};

const addUser = async (req, res) => {
  try {
    console.log("Ishladi 1");
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password, info, photo } = value;
    const hasAdmin = await User.findOne({ email });
    if (hasAdmin)
      return res.status(400).json({ message: "Bunday email bazada mavjud." });

    const salt = bcrypt.genSaltSync(7);
    const userHashedPassword = await bcrypt.hash(password, salt);

    const user_activation_link = uuid.v4();

    const newUser = new User({
      name,
      email,
      password: userHashedPassword,
      info,
      photo,
      user_activation_link,
    });
    await newUser.save();
    await mailService.sendActivationMail(
      email,
      `${config.get("api_url")}/api/user/activate/${user_activation_link}`
    );
    // const payload = {
    //   id: newUser._id,
    //   user_is_active:  newUser.user_is_active
    // };
    // const tokens = jwt.generateTokens(payload);

    // newUser.user_token = tokens.refreshToken;
    // await newUser.save();
    // res.cookie("refreshToken", tokens.refreshToken, {
    //   maxAge: config.get("refresh_ms"),
    //   httpOnly: true
    // })
    // res.ok(200, {...tokens, user: payload});
    res
      .status(201)
      .json({ message: "User is saved successfully", data: newUser });
  } catch (err) {
    handleError(res, err);
  }
};

const activeUser = async (req, res) => {
  try {
    const user = await User.findOne({ user_activation_link: req.params.link });
    if (!user) {
      return res.status(400).json({ message: "User topilmadi" });
    }

    if (user.user_is_active) {
      return res.status(400).json({ message: "User allaqachon aktivlashgan" });
    }

    user.user_is_active = true;
    await user.save();
    res.status(200).json({ message: "User aktivlashdi" });
  } catch (err) {
    handleError(res, err);
  }
};

const changePass = async (req, res) => {
  try {
    const newPass = "Muxammadi0799";
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Bunday User topilmadi" });
    }

    await mailService.sendNewPass(email, newPass);

    const salt = bcrypt.genSaltSync(7);
    const userHashedPassword = await bcrypt.hash(newPass, salt);

    user.password = userHashedPassword;
    await user.save();
    res.status(200).json({ message: "yangi parol o'rnatildi" });
  } catch (err) {
    handleError(res, err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Ma'lumot to'liq emas." });

    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(400).json({ message: "Email yoki parol xato." });

    const validPassword = await bcrypt.compare(password, oldUser.password);
    if (!validPassword)
      return res.status(400).json({ message: "Email yoki parol xato." });

    return res.status(201).json({ message: "Login is finished successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

const putUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const oldUser = await User.findById(req.params.id);
    if (!oldUser)
      return res
        .status(400)
        .json({ message: "Bunday User bazada mavjud emas." });

    const userHashedPassword = "";
    if (value.password) {
      const salt = bcrypt.genSaltSync(7);
      userHashedPassword = await bcrypt.hash(value.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: value.name || oldUser.name,
        email: value.email || oldUser.email,
        password: userHashedPassword || oldUser.password,
        info: value.info || oldUser.info,
        photo: value.photo || oldUser.photo,
        reg_date: value.reg_date || oldUser.reg_date,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User is updated successfully", data: updatedUser });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const delUser = await User.findByIdAndDelete(req.params.id);
    if (!delUser)
      return res
        .status(400)
        .json({ message: "Bunday User bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "User is deleted successfully", data: delUser });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllUser,
  addUser,
  putUser,
  deleteUser,
  getOneUser,
  loginUser,
  activeUser,
  changePass,
};
