const mongoose = require('mongoose')
const mongourl = 'your mongo db url'

var mongoServer = async () => {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to Database')
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = mongoServer
