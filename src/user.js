const mongoose = require('mongoose')
const readonlyPlugin = require('./readonlyPlugin')

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    readonly: true,
  },
  lastName: String,
  email: {
    type: String,
    readonly: true,
  },
})

userSchema.plugin(readonlyPlugin, { silent: true })

mongoose.model('User', userSchema)
