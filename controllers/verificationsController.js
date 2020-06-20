const template = require("../data/template");
const Verification = require("../models/verification");
const mail = require("../lib/mail");

exports.create = async (req, res) => {
  template.template.property = req.body.property;
  template.template.identificator = req.body.identificator;
  template.template.email = req.body.email;

  var item = new Verification(template);
  const result = await item.save();

  mail.link({ to: req.body.email, id: result.id });

  return res.json(result);
};

exports.get = async (req, res) => {
  try {
    const data = await Verification.findById(req.params.id);
    return res.json(data.toObject());
  } catch {
    return res.status(404).send(`${req.params.id} not found!`);
  }
};

exports.update = async (req, res) => {
  delete req.body._id;
  await Verification.findOneAndUpdate({ _id: req.params.id }, req.body);
  return res.status(200).send();
};
