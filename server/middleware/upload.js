const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination (req, file, call) {
    call(null, path.resolve(__dirname, '../../', 'static/upload'))
  },
  filename (req, file, call) {
    call(null, `${file.originalname}-${moment().format('DDMMYYYY-HHmmss_SSS')}`)
  }
})
const fileFilter = (req, file, call) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    call(null, true)
  } else {
    call(null, false)
  }
}

module.exports = multer({
  storage, fileFilter, Limits: { fileSize: 1024 * 1024 * 5 }
})
