const Taster = require("../models/Taster");

exports.list = async (req, res) => {
  try {
    const message = req.query.message;
    console.log(message);
    const tasters = await Taster.find({});
    res.render("tasters", { tasters: tasters, message: message });
  } catch (e) {
    res.status(404).send({ message: "could not list tasters" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {

    await Taster.findByIdAndRemove(id);
    res.redirect("/tasters");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

exports.create = async (req, res) => {

  if (!req.body.name || !req.body.twitter) {
    return res.status(400).send({
      message: "Oi! Required fields can not be empty go back and fix this 😠",
    });
  }

  var taster = new Taster({ name: req.body.name, twitter: req.body.twitter });
  try {
    await taster.save();
    res.redirect('/tasters/?message=taster has been created')

  } catch (error) {
    console.log("could not save taster");
  }

  console.log(req);
}


exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const taster = await Taster.findById(id);
    res.render('update-taster', { taster: taster, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  console.log('running');
  const id = req.params.id;

  if (!req.body.name || !req.body.twitter) {
    return res.status(400).send({
      message: "Oi! Required fields can not be empty go back and fix this 😠",
    });
  }

  try {
    const taster = await Taster.updateOne({ _id: id }, req.body);
    res.redirect('/tasters/?message=taster has been updated');
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
};