let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
);


let Images = module.exports = mongoose.model('images',imageSchema)
