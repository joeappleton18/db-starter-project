const Taster = require("../models/Taster");

exports.list = async (req, res) => {
  try {
    console.log(req.query)
    const message = req.query.message;
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

  try {
    const taster = new Taster({ name: req.body.name, twitter: req.body.twitter });
    await taster.save();
    res.redirect('/tasters/?message=taster has been created')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('create-taster', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
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
  const id = req.params.id;
  try {
    const taster = await Taster.updateOne({ _id: id }, req.body);
    res.redirect('/tasters/?message=taster has been updated');
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
};