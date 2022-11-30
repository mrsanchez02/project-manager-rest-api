const User = require('../models/User')

const userRegister = async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    return res.status(201).send(user)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    return res.status(200).send({user, token})
  } catch (error) {
    return res.status(401).send({msg: 'Login error.'})
  }
}

const userLogout = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter( token => {
      return token.token !== req.token
    })

    await req.user.save()
    return res.send({msg:'Logout success'})

  } catch (error) {
    return res.send(500).send({msg: 'Logout error'})
  }
}

const userInfo = async (req, res) => {
  res.status(200).send(req.user)
}

const userDelete = async (req, res) => {
  try {
    await req.user.remove()
    return res.send(req.user)
  } catch (error) {
    return res.status(500).send()
  }
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  userInfo,
  userDelete
}