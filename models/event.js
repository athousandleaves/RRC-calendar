var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: String,
  _id: String,
  occupants: Number,
  roomNumber: String,
  color: String,
  allDay: Boolean,
  editable: Boolean,
  start: String,
  end: String
});

var event = mongoose.model("event", eventSchema);

module.exports = event;