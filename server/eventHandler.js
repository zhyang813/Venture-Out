var Event = require('./eventModel.js');


module.exports = {

  addEvent: function(req, res){
    var newEvent = req.body;

    Event.create(newEvent, function(err, event){
      if (err) {
        console.log("New event created error", err);
        helper.sendError(err, req, res);
      } else {
        res.json(event);
      }
    });
  }

}