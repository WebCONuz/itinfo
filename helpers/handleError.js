const handleError = (res, err) => {
  return res.status(500).json({ message: "Xatolik", error: err.message });
};

module.exports = handleError;
