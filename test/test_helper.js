const mongoose = require('mongoose')
require('../src/user')

mongoose.Promise = global.Promise

before(done => {
  mongoose.connect('mongodb://localhost/sendit')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err))
})

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase()
})
