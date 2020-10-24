const Tasting = require("../models/Tasting");

exports.list = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const skip = parseInt(req.query.skip) || 0;

  try {
    const tastings = await Tasting.find({}).skip(skip).limit(limit);
    res.render("tastings", { tastings: tastings });
  } catch (e) {
    res.status(404).send({ message: "could not list tastings" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Tasting.findByIdAndRemove(id);
    res.redirect("/tasting");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};
