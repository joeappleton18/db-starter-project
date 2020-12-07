const User = require("../../models/User");

exports.create = async (req, res) => {
      const tastingId = req.body.id;
      console.log(tastingId);
      if (  !tastingId || req.session.userID) {
        res.json({result: 'error'});
      }
      try {
        await User.update({"_id": req.session.userID}, {$push:{saved_tastings: tastingId}})
      } catch (e) {
        res.json({result: 'error could not create a favourite'}); 
      }
  }






  