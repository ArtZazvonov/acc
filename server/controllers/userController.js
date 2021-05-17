const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.model')

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    res.status(409).json({ message: 'Логин уже сужествует' })
  } else {
    const solt = bcrypt.genSaltSync(10)
    const newUser = new User({
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, solt),
      role: req.body.role
    })
    await newUser.save()
    res.status(201).json(newUser)
  }
}

module.exports.listUser = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getUser = (req, res) => {
  console.log('getUser')
}

module.exports.updateUser = (req, res) => {
  console.log('updateUser')
}

module.exports.removeUser = (req, res) => {
  console.log('removeUser')
}
