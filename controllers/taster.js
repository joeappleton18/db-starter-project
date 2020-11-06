const Taster = require("../models/Taster");

exports.list = async (req, res) => {
  try {
    const tasters = await Taster.find({});
    res.render("tasters", { tasters: tasters });
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
