const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.modal')

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    res.status(409).json({ message: 'Логин уже сужествует' })
  } else {
    const solt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, solt),
      role: req.body.role
    })
    await user.save()
    res.status(201).json(user)
  }
}
