const { model, Schema } = require('mongoose')

const options = { toJSON: { virtuals: true } }
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    default: ''
  },
  patronymic: {
    type: String,
    default: ''
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  phone: {
    type: Number
  },
  image: {
    type: String
  },
  role: {
    name: {
      type: String,
      default: 'Менеджер'
    },
    typeNumber: {
      type: Number,
      default: 0
    }
  },
  tickets: [
    {
      ref: 'User',
      type: Schema.Types.ObjectId
    }
  ]
}, options)

userSchema.virtual('fullName')
  .get(function () { return `${this.firstName} ${this.lastName}` })
  .set(function (v) {
    const firstName = v.substring(0, v.indexOf(' '))
    const lastName = v.substring(v.indexOf(' ') + 1)
    this.set({ firstName, lastName })
  })
userSchema.virtual('familyInitials')
  .get(function () {
    const f = this.patronymic !== '' ? this.patronymic.substring(0, 1).toUpperCase() : false
    const n = this.firstName !== '' ? this.firstName.substring(0, 1).toUpperCase() : false
    if (!f || !n) {
      return false
    } else {
      return `${this.lastName} ${n}.${f}`
    }
  })
module.exports = model('User', userSchema)
