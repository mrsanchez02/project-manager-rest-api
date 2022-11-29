const express  = require('express')
const User = require('../models/User')
const auth = require('../middlewares/Auth')

const router = new express.Router()

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    return res.status(201).send(user)
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {

})

router.get('/', async (req, res) => {
  try {
    const user = await User.find({})
    res.status(200).send(user)
    
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router