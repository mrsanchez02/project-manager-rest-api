const {Schema, model} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Project = require('./Project')
require('dotenv').config()

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: [6, 'Password must be at least 6 characters'],
    validate(value) {
      if(value.includes('123456')){
        throw new Error('Insecure passwords are not allowed')
      }
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email invalid')
      }
    }
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  record: {
    type: Date,
    default: Date.now()
  },
  tokens:[{
    token:{
      type: String,
      required: true
    }
  }]
})

// Virtual Property
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'owner'
})

// To generate auth Token
userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET)

  user.tokens = user.tokens.concat({token})

  await user.save()

  return token
}

// To search user and validate credentials
userSchema.statics.findByCredentials = async ( username, password ) => {
  const user = await User.findOne({ username })
  const isMatch = await bcrypt.compare(password, user.password)

  if(!user || !isMatch) {
    throw new Error('Login error!')
  }

  return user

}

// Before saving, validate if password is modified or not.
userSchema.pre('save', async function(next) {
  const user = this
  
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// Before delete user, remove the projects
userSchema.pre('remove', async function(next) {
  const user = this
  await Project.deleteMany({owner: user._id})

  next()
})

const User = model('User', userSchema)

module.exports = User