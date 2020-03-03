const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/user");


// GET '/user'
router.get('/', (req, res, next) => {
    User.find()
        .then( (user) => {
            res.json(user);
        })
        .catch( (err) => {
            res.json(err);
        });
});

// GET '/user/:id'
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) 
      .json({ message: 'Specified id is not valid'})
    return;
  }

  User.findById( id ).populate("saveMusicArr").populate("ownTracksArr")
    .then( (oneUser) => {
      res.status(200).json(oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// PUT '/user/:id'
router.put('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndUpdate(req.params.id, {$set: req.body}) //.populate('team') 
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})



// DELETE '/user/:id'


module.exports = router;
