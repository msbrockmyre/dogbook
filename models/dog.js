var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

var DogSchema = new Schema({
    name:          { type: String },
    views:          { type: Number, 'default': 0 },
    images:    { type: Array }
});


module.exports = mongoose.model('Dog', DogSchema);
