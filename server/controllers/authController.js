const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isPasswordCorrect) {
      const token = jwt.sign({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        login: candidate.login,
        role: candidate.role,
        userId: candidate._id
      }, keys.JWT, { expiresIn: 60 * 120 })
      res.json({ token })
    } else {
      res.status(401).json({
        messege: 'Пароль не верен'
      })
    }
  } else {
    res.status(404).json({
      messege: 'Пользователь не найден'
    })
  }
}
module.exports.authorizedUser = async (req, res) => {
  try {
    await User.findOne({ _id: req.params.id }).select({ password: 0, __v: 0 }).exec((_error, user) => {
      res.json(user)
    })
  } catch (error) {
    res.status(404).json({
      messege: 'Пользователь не найден'
    })
  }
}
