const Tasting = require("../models/Tasting");
const Country = require("../models/Country");
const Taster = require("../models/Taster");
const Region = require("../models/Region");
const Province = require("../models/Province");
const bodyParser = require("body-parser");
const { findById } = require("../models/Country");


exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; // Make sure to parse the limit to number
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;


  try {
    const tastings = await Tasting.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Tasting.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);

    res.render("tastings", {
      tastings: tastings,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send({ message: "could not list tastings" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const countries = await Country.find({});
    const tasters = await Taster.find({});
    const regions = await Region.find({});
    const tasting = await Tasting.findById(id);
    if (!tasting) throw Error('cant find tasting');
    res.render('update-tasting', {
      regions: regions,
      tasting: tasting,
      countries: countries,
      tasters: tasters,
      id: id,
      errors: {}
    });
  } catch (e) {
    console.log(e)
    if (e.errors) {
      res.render('create-tasting', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `could find taster ${id}`,
    });
  }
};

exports.create = async (req, res) => {
  try {

    const taster = await Taster.findById(req.body.taster_id);
    await Tasting.create({
      title: req.body.title,
      taster_name: taster.name,
      taster_twitter_handle: taster.twitter_handle,
      points: parseInt(req.body.points),
      taster_id: req.body.taster_id,
      regions: req.body.regions
    })

    res.redirect('/tastings/?message=tasting has been created')
  } catch (e) {
    if (e.errors) {
      res.render('create-tasting', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.createView = async (req, res) => {
  try {
    const countries = await Country.find({});
    const tasters = await Taster.find({});
    const regions = await Region.find({});
    res.render("create-tasting", {
      countries: countries,
      tasters: tasters,
      regions: regions,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Tasting.findByIdAndRemove(id);
    res.redirect("/tastings");
  } catch (e) {
    res.status(404).send({
      message: `could not delete  record ${id}.`,
    });
  }
};

