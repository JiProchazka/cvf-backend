const Verification = require("../models/verification");

exports.upload = async (req, res) => {
  const file = { ...req.file, ...{ fileType: req.params.fileType } };
  await Verification.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { "template.files": file } }
  );
  return res.json({ filename: file.filename });
};

exports.get = (req, res) => {
  const file = `${process.env.UPLOAD_FOLDER}/${req.params.file}`;
  return res.sendFile(file);
};
