let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category_id: [{
    type: Schema.Types.ObjectId,
    ref: 'event_categorys'
  }],
  tags: {
    type: Array,
    required: true
  },
  comments_id: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  preview_image: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
);


let Event = module.exports = mongoose.model('events',eventSchema)
