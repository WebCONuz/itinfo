const bcrypt = require("bcrypt");
const jwt = require("../services/JwtService");
const Author = require("../models/Author_model");
const handleError = require("../helpers/handleError");
const authorValidation = require("../validations/authorValidate");

const generateAccsessToken = (id, expert, roles) => {
  const payload = { id, expert, roles };
  return jwt.sign(payload);
};

const getAllAuthor = async (req, res) => {
  try {
    const data = await Author.find();
    return res.ok(200, { message: "Request is finished successfully", data });
  } catch (err) {
    handleError(res, err);
  }
};

const getOneAuthor = async (req, res) => {
  try {
    const oneAuthor = await Author.findById(req.params.id);
    if (!oneAuthor)
      return res.status(400).json({ message: "Bunday Author mavjud emas" });

    res.status(200).json({ message: "OK", data: oneAuthor });
  } catch (err) {
    handleError(res, err);
  }
};

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      firstname,
      lastname,
      nickname,
      email,
      password,
      phone,
      info,
      position,
      photo,
      expert,
    } = value;

    const hasAuthor = await Author.findOne({ email });
    if (hasAuthor)
      return res.status(400).json({ message: "Bunday email bazada mavjud." });

    const salt = bcrypt.genSaltSync(7);
    const authorHashedPassword = await bcrypt.hash(password, salt);

    const newAuthor = new Author({
      firstname,
      lastname,
      nickname: nickname || "",
      email,
      password: authorHashedPassword,
      phone,
      info,
      position,
      photo,
      expert: expert || false,
    });
    await newAuthor.save();
    return res
      .status(201)
      .json({ message: "Author is saved successfully", data: newAuthor });
  } catch (err) {
    handleError(res, err);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Ma'lumot to'liq emas." });

    const oldAuthor = await Author.findOne({ email });
    if (!oldAuthor)
      return res.status(400).json({ message: "Email yoki parol xato." });

    const validPassword = await bcrypt.compare(password, oldAuthor.password);
    if (!validPassword)
      return res.status(400).json({ message: "Email yoki parol xato." });

    const token = generateAccsessToken(oldAuthor._id, oldAuthor.expert, [
      "READ",
      "WRITE",
    ]);

    return res
      .status(201)
      .json({ message: "Login is finished successfully", token });
  } catch (err) {
    handleError(res, err);
  }
};

const putAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.details[0].message });
    }
    const oldAuthor = await Author.findById(req.params.id);
    if (!oldAuthor)
      return res
        .status(400)
        .json({ message: "Bunday media bazada mavjud emas." });

    const authorHashedPassword = "";
    if (value.password) {
      const salt = bcrypt.genSaltSync(7);
      authorHashedPassword = await bcrypt.hash(value.password, salt);
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        firstname: value.firstname || oldAuthor.firstname,
        lastname: value.lastname || oldAuthor.lastname,
        nickname: value.nickname || oldAuthor.nickname,
        email: value.email || oldAuthor.email,
        password: authorHashedPassword || oldAuthor.password,
        phone: value.phone || oldAuthor.phone,
        info: value.info || oldAuthor.info,
        position: value.position || oldAuthor.position,
        photo: value.photo || oldAuthor.photo,
        expert: value.expert || oldAuthor.expert,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Author is updated successfully", data: updatedAuthor });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const delAuAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!delAuAuthor)
      return res
        .status(400)
        .json({ message: "Bunday author bazada mavjud emas." });
    return res
      .status(200)
      .json({ message: "Author is deleted successfully", data: delAuAuthor });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAllAuthor,
  addAuthor,
  putAuthor,
  deleteAuthor,
  getOneAuthor,
  loginAuthor,
};
