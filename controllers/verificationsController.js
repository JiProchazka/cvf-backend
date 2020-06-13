const template = require("../data/template");
const Verification = require("../models/verification");
const mail = require("../lib/mail");

exports.create = async (req, res) => {
  template.template.companyName = req.body.companyName;
  template.template.identificator = req.body.identificator;

  var item = new Verification(template);
  const result = await item.save();

  mail.link({ to: req.body.email, id: result.id });

  return res.json({ id: result.id });
};

exports.get = async (req, res) => {
  const data = await Verification.findById(req.params.id);
  return res.json(data.toObject());
};

exports.update = async (req, res) => {
  await Verification.findOneAndUpdate(req.params.id, req.body);
  return res.json(req.body);
};
