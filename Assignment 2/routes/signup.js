const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const router = express.Router()

var User = require('../model/user')
const senderMail = 'enteremail@gmail.com'
const senderPasswd = 'your password'
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderMail,
    pass: senderPasswd
  }
});

// Check the validity of the input credentials using express-validator
router.post('/signup',
  [
    check('fullname', 'Please Enter your Full name').not().isEmpty(),
    check('username', 'Please Enter a Username').not().isEmpty(),
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter a Valid Password').isLength({ min: 6
    })
  ],

  // Middleware for checking errors
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    // Store the credentials in an object
    const { fullname, username, email, password } = req.body

    try {
      console.log('signup halfway')
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          errMsg: 'User with this email already exists!'
        })
      }
      // Store the new user in the User Collection
      let today = new Date().toISOString().slice(0, 10)
      user = new User({
        fullname, username, email, password, today
      })
      // console.log(user)

      // Generate encrypted password using bcrypt
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      // async save the record in the collection
      await user.save()

      // Store userId cookie
      res.cookie('userId', user.id)
      res.cookie('email', user.email)
      console.log('userId in signup stored')

      // Parameters which can be extracted from the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          username: user.username, 
          email: user.email
        }
      }

      // Method for creating token
      jwt.sign(
        payload, 'itsasecret', { expiresIn: 10000 }, (err, token) => {
          if (err) throw err
          res.status(200).json({
            token
          }
          )
        }
      )
      // sending email
      
      var mailOptions = {
          from: 'enteremail@gmail.com',
          to: user.email,
          subject: 'Sending Email using Node.js',
          text: 'Assignment 2 Complete'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (err) {
            console.log(err);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        res.redirect('/home')

      // Throw exception
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Saving Error')
      console.log('Saving Error')
    }
  }
)

module.exports = router
