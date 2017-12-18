var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Connect to Mongoose
mongoose.connect('mongodb://nick:keeling@ds137256.mlab.com:37256/study-room-reservations');

// Mongoose model config
var eventSchema = new mongoose.Schema({
  title: String,
  _id: String,
  occupants: String,
  roomNumber: String,
  color: String,
  allDay: String,
  editable: String,
  start: String,
  end: String
});

var event = mongoose.model("event", eventSchema);

app.get('/', function(req, res) {
  event.find({}, function(err, allevents){
    if (err) {
      console.log(err);
    } else {
      console.log(allevents);
      res.render('index', {events: allevents});
    }
  })
});

app.listen(5000, function(){
  console.log('Server running');
});