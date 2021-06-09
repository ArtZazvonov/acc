const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.model')

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    res.status(409).json({ message: 'Логин уже сужествует' })
  } else {
    const solt = bcrypt.genSaltSync(10)
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      patronymic: req.body.patronymic,
      login: req.body.login,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, solt),
      role: {
        name: req.body.role.name,
        typeNumber: req.body.role.typeNumber
      }
    })
    if (req.file) {
      newUser.image = `/${req.file.filename}`
    } else {
      newUser.image = ''
    }
    try {
      await newUser.save()
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports.listUser = async (req, res) => {
  try {
    const users = await User.find({}).select({ password: 0 })
    res.json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.getUser = async (req, res) => {
  try {
    await User.find({ _id: req.params.id }).select({ password: 0 }).exec((_error, user) => {
      res.json(user)
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.updateUser = async (req, res) => {
  const $set = req.body
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.removeUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.json({ message: 'Тикет удален' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.executorList = async (req, res) => {
  try {
    const executorList = await User.find({ role: 1 }).select({ password: 0 })
    res.json(executorList)
  } catch (error) {
    res.status(500).json(error)
  }
}
