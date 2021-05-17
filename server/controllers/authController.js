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
        name: {
          first: candidate.name.first,
          last: candidate.name.last
        },
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
module.exports.adminLogin = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isPasswordCorrect) {
      const token = jwt.sign({
        name: {
          first: candidate.name.first,
          last: candidate.name.last
        },
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
