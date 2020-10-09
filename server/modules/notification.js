let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let notificationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    required: false,
    default:false
  },
  deleted: {
    type: Boolean,
    required: false,
    default:false
  },
  sender: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  recipient: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
},
  {
    timestamps: true
  }
);


let Notification = module.exports = mongoose.model('notifications',notificationSchema)
