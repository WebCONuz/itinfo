const bcrypt = require("bcrypt");
const Admin = require("../models/Admin_model");
const handleError = require("../helpers/handleError");
const adminValidation = require("../validations/adminValidate");
const jwt = require("../services/JwtService");
const config = require("config");

const getAllAdmin = async (req, res) => {
  try {
    const data = await Admin.find();
    return res
      .status(200)
      .json({ message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const data = await Admin.findById(req.params.id);
    if (!data)
      return res.status(400).json({ message: "Bunday Admin mavjud emas" });

    res.status(200).json({ message: "OK", data: data });
  } catch (err) {
    handleError(res, err);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password, isActive, isCreator } = value;
    const hasAdmin = await Admin.findOne({ email });
    if (hasAdmin)
      return res.status(400).json({ message: "Bunday email bazada mavjud." });

    const salt = bcrypt.genSaltSync(7);
    const adminHashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: adminHashedPassword,
      isActive,
      isCreator,
    });
    await newAdmin.save();
    return res
      .status(201)
      .json({ message: "Admin is saved successfully", data: newAdmin });
  } catch (err) {
    handleError(res, err);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Ma'lumot to'liq emas." });

    const oldAdmin = await Admin.findOne({ email });
    if (!oldAdmin)
      return res.status(400).json({ message: "Email yoki parol xato." });

    const validPassword = await bcrypt.compare(password, oldAdmin.password);
    if (!validPassword)
      return res.status(400).json({ message: "Email yoki parol xato." });

    const payload = {
      id: oldAdmin._id,
      isActive: oldAdmin.isActive,
      isCreator: oldAdmin.isCreator,
    };

    const tokens = jwt.generateTokens(payload);
    oldAdmin.admin_token = tokens.refreshToken;
    await oldAdmin.save();

    res.cookies("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    console.log("ishladi");
    return res.json({ message: "Login is finished successfully", tokens });
  } catch (err) {
    handleError(res, err);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let admin;
    if (!refreshToken) return res.json({ message: "Token topilmadi" });
    admin = await Admin.findOneAndUpdate(
      { admin_token: refreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) return res.json({ message: "Token topilmadi" });
    res.clearCookie("refreshToken");
    res.json({ message: "logut" });
  } catch (err) {
    handleError(res, err);
  }
};

const putAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const oldAdmin = await Admin.findById(req.params.id);
    if (!oldAdmin)
      return res
        .status(400)
        .json({ message: "Bunday Admin bazada mavjud emas." });

    const adminHashedPassword = "";
    if (value.password) {
      const salt = bcrypt.genSaltSync(7);
      adminHashedPassword = await bcrypt.hash(value.password, salt);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        name: value.name || oldAdmin.name,
        email: value.email || oldAdmin.email,
        password: adminHashedPassword || oldAdmin.password,
        isActive: value.isActive || oldAdmin.isActive,
        isCreator: value.isCreator || oldAdmin.isCreator,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Admin is updated successfully", data: updatedAdmin });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const delAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!delAdmin)
      return res
        .status(400)
        .json({ message: "Bunday Admin bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "Admin is deleted successfully", data: delAdmin });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllAdmin,
  addAdmin,
  putAdmin,
  deleteAdmin,
  getOneAdmin,
  loginAdmin,
  logoutAdmin,
};
