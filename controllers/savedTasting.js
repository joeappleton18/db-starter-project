const User = require("../models/User");

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({"_id": user.id}).populate('saved_tastings');
      res.render('saved-tastings', {tastings: userRef.saved_tastings});
    } catch (e) {
      console.log(e);
      res.json({result: 'could not find user faves'}); 
    }
}