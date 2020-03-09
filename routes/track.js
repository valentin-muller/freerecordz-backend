const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Track = require("../models/track");
const parser = require('../config/cloudinary');

// GET '/user/track:id'
router.get('/', (req, res, next)=> {

    Track.find()
        .then((allTracks) => {
           res.json(allTracks) 
        }).catch((err) => {
            res.json(err)
        });
})
// POST '/user/track:id'
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) 
      .json({ message: 'Specified id is not valid'})
    return;
  }

  Track.findById( id )
    .then( (oneTrack) => {
      res.status(200).json(oneTrack);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});


// DELETE '/user/track:id'




//CLOUDINARY UPLOAD
//   router.post('/upload', parser.single('url'), async (req, res, next) => {
 
//     const url = req.file.secure_url 
//     // console.log('url', url);
//     const { title, desc, bpm, countryOfOrigin, language, releaseYear, budget, recordingEnviroment, genre, instrumentsIncl, mood} = req.body;
 

// try{
//       const newTrack = await Track.create({ url, title, desc, bpm, countryOfOrigin, language, releaseYear, budget, recordingEnviroment, user: req.session.currentUser._id, genre, instrumentsIncl, mood });
//       res
//         .status(201)  //  Created
//         .json(newTrack);
//    }
// catch (error) {
//     next(createError(error));
//   }
// })
router.post('/upload/url', parser.single('url'), (req, res, next) => {
  console.log('file upload');
  console.log('req.file :', req.file);
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  const imageUrl = req.file.secure_url;
  res.json(imageUrl).status(200);
  console.log('imageUrl :', imageUrl);
});



module.exports = router;