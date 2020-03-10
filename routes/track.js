const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Track = require("../models/track");

const multer  = require('multer') //use multer to upload blob data
const upload = multer(); // setup the multer
const cloudinaryConfig = require('./../config/cloudinary');
const fs = require('fs'); //use the file system to save the files on the server

const SIZE_10_MB = 10485760;
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
// -------------------------------
// function middle(req, res, next) {
//   console.log(req.body);
//   next();
  
// }

// router.post('/upload/url', middle, parser.single('file'), (req, res, next) => {

//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//   };
//   const imageUrl = req.file.secure_url;
//   console.log('req.file :', req.file);
//   res.status(200).json({imageUrl: imageUrl})
// });


// server
// routes/track.js


// POST track/upload/url.   -  Upload mp3 files to the clodudinary.
router.post('/upload/url', upload.single('file'), (req, res, next) => {
  console.log('req.file :', req.file) 
  if(req.file ) {
    if (req.file.size > SIZE_10_MB) {
        next(createError(400, `File is bigger than 10MB.`))
      // res.status(400).send({error: 'File is bigger than 10MB.'})
        return;
    }
      
  }
  // upload.single('file') is the multer setup which reads the incoming "mulipart/form-data"
  // parses it and adds it to the req.file with all the information and the Buffer (req.file.buffer).

  // absolute path where to save the temporary file. Includes the file name and extension
  // In order for the below writeFileSync operation to work properly, create additional directory named uploads
  // in the routes directory, as '/routes/uploads'
  let uploadLocation = __dirname + '/uploads/' + req.file.originalname;

  // write the BLOB to the server as a file
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)) );

  cloudinaryConfig.v2.uploader.upload(
    uploadLocation, 
    { resource_type: "video", folder: `audiofiles/`, overwrite: true },
    (error, result) => {
      if (error) res.status(500).json(error);
      else {
        // Delete the temporary file from the server
        fs.unlink(uploadLocation, (deleteErr) => {
          if (deleteErr) res.status(500).send(deleteErr);
          
          console.log('temp file was deleted');
          res.status(200).json({fileUrl: result.secure_url});
        });
        
      }
    }
  );  
});



module.exports = router;