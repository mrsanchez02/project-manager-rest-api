const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const auth = ( async (req,res,next) => {
  try {
    const token = req.header('Authorization').replace('Bearer','')
    const decode = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token})

    if(!user) {
      throw Error()
    }

    req.user = user
    req.token = token

    next()

  } catch (error) {
    res.status(401).send({error: 'Auth Error!'})
  }
})

module.exports = auth