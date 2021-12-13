const mongoose = require('mongoose')
const mongourl = 'mongodb+srv://smit25:m3gw8Dyh@cluster0.jg5wa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

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
