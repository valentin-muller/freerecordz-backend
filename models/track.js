const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({

  url: { type: String, required: true },

  title: { type: String, required: true },

  desc: { type: String },

  bpm: { $range: [ 0, 165, 1 ] },

//   genre: {
// ​    type: String,
// ​    required: true,
// ​    enum: ["Alternative", "Ambient", "Blues", "Cinematic", "Classical", "Country", "Electronic", "Folk", "Hip Hop", "Indie", "Jazz", "Pop", "Post Rock", "R&B", "Rock", "Singer-Songwriter", "Soul", "Spoken Word", "Vintage", "World"]
//   },

  countryOfOrigin: {type: String, required: true},

  language: {type: String, required: true},

//   instrumentsIncl: {
// ​    type: Array,
// ​    required: true,
// ​    enum: ["Acoustic Guitar", "Ambient Sounds", "Banjo", "Bass", "Bells", "Cello", "Claps", "Clav", "Drums", "Electric Guitar", "Harmonica", "Harp", "Harpsichord", "Horns", "Hummig", "Kazoo", "Mandolin", "Nature Sounds", "Organ", "Precussion", "Piano", "Rhodes", "Saxophone", "Snaps", "Sound FX", "Steel Guitar", "Stomps", "String Bass", "Strings", "Synth", "Turntable", "Ukulele", "Viola", "Violin", "Vocals", "Vocoder", "Whistling", "Woodwinds", "Wurlitzer"]
//   },

  releaseYear: {type: Number, required: true},

  mood: {type: String, required: true, enum: ["Angry", "Carefree", "Chill", "Contemplative", "Ecstatic", "Eerie", "Happy", "Love", "Peaceful", "Sad", "Serious", "Somber", "Tense", "Uplifting"]},

  budget: {
      type: String, 
      enum: ["Low", "Medium", "High"]},

  recordingEnviroment: {
      type: String, 
      enum: ["Bedroom studio", "Home studio", "Professional Studio", "State of the are studio", "Other"]},
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  });

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;