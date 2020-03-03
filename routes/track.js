const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Track = require("../models/track");
const parser = require('../config/cloudinary');

// GET '/user/track:id'
router.get('/', (req, res, next)=> {

    Track.find()
        .then((oneTrack) => {
           res.json(oneTrack) 
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
router.post('/upload', parser.single('video'), (req, res, next) =>{
 
const image_url = req.file.secure_url
 
})


module.exports = router;