var mongoose =  require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {type: String, unique:true},
  password: String,
  highScore: {type: Number, default: 0},
  gamesPlayed: {type: Number, default: 0},
  pointsScored: {type: Number, default: 0},
  yahtzees: {type: Number, default: 0}

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);

