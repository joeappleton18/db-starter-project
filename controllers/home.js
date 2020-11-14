const Tasting = require('../models/Tasting');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        /**
         *
            db.tastings.aggregate([
                      {$match:  {taster_name: { $ne: null }}},
                      {$group: {_id: "$taster_name", total: { $sum: 1} }},
                      {$count: "number of tasters"}
                      ])
         */

        const totalTastings = await Tasting.find({}).count();
        const totalCountries = await Tasting.aggregate([
            { $group: { _id: "$country", total: { $sum: 1 } } },
            { $count: "total" }
        ])
        console.log(totalCountries)
        const tasterCountSummaryRef = await Tasting.aggregate(
            [
                { $match: { taster_name: { $ne: null } } },
                {
                    $group: {
                        _id: "$taster_name",
                        total: { $sum: 1 }
                    }
                }]);

        const tasterCountSummary = tasterCountSummaryRef.map(t => ({ name: t._id, total: t.total }));
        res.render("index", { tasterCountSummary: tasterCountSummary, totalTastings: totalTastings, totalTasters: tasterCountSummary.length, totalCountries: totalCountries[0].total });

    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}