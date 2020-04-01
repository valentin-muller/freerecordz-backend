const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require('mongoose')

const User = require("../models/user");




// GET '/user/:id'
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) 
      .json({ message: 'Specified id is not valid'})
    return;
  }

  User.findById( id )//.populate("saveMusicArr").populate("ownTracksArr")
    .then( (oneUser) => {
      res.status(200).json(oneUser);
      console.log('oneUser :', oneUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

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









/* EDIT AND DELETE ARE NOt WORKING FOR NOW */

// POST - edit
router.post('/edit', (req, res, next) => {
    const { id } = req.params;
    const {email, firstName, lastName, username, password} = req.params;

    User.updateOne(
      {_id: id },
      {email, firstName, lastName, username, password},
      { new: true}
    )
    .then( () => {
      res.redirect("/private")
    })
    .catch( (err) => console.log('err', err));
  });
/* POST edit profile form . */
router.post('/edit-profile/:id', (req, res, next) => {
  const { _id } = req.query;
  const newEmail = req.body.email;
  const newFirstName = req.body.firstName;
  const newLasttName = req.body.lastName;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;

  // if (newFirstName === '' || newLasttName === '' || newEmail === '' || currentPassword === '') {
  //   User.findById(_id)
  //     .then((user) => {
  //       req.flash('message-name', 'Please, enter your first name, last name, email and password');
  //       res.redirect('/edit-profile');
  //     })
  //     .catch((err) => next(err));
  // }

  User.findOne({ 'email': newEmail })
    .then((user) => {
      if (user.email !== req.session.currentUser.email && user.email !== null) {
        req.flash('message-name', 'Email already taken');
        return res.redirect('/edit-profile');
      }
    })
    .catch((err) => next(err));

  User.findById(_id)
    .then((user) => {
      const passwordCorrect = bcrypt.compareSync(currentPassword, req.session.currentUser.password);

      if (passwordCorrect) {
        if (newPassword !== '') {
          const salt = bcrypt.genSaltSync(saltRounds);
          const newHashedPassword = bcrypt.hashSync(newPassword, salt);
          return User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail, password: newHashedPassword } })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }

        if (newPassword === '') {
          User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail } }, { new: true })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }
      } else {
        req.flash('message-name', 'Password incorrect');
        res.redirect('/edit-profile');
      }
    })
    .catch((err) => next(err));
});
// GET - edit
router.get("/edit", (req, res, next) => {
  res.render("private/edit-user", {
    user: req.session.currentUser
  });
});
// DELETE '/user/:id'
router.get("/delete/:id", (req, res, next) => {
 User.findOne({
    _id: req.params.id
  })
    .then(user => {
      const pr1 = Track.deleteMany({ author: req.params.id });
      const pr2 = user.remove();

      Promise.all([pr1, pr2])
        .then(() => req.session.destroy())
        .then(() => res.redirect("/signup"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});





module.exports = router;
