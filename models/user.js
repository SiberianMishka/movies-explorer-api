const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email, {
          allow_utf8_local_part: false,
          require_tld: true,
        }),
        message: 'Некорректный "email"',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
    toJSON: { useProjection: true },
    toObject: { useProjection: true },
  },
);

module.exports = mongoose.model('user', userSchema);
