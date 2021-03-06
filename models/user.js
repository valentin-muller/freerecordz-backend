const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String },
  savedMusicArr: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
  }
)

const User = mongoose.model('User', userSchema);

module.exports = User;