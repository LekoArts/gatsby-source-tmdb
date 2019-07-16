const crypto = require('crypto')

const digest = input =>
  crypto
    .createHash('md5')
    .update(JSON.stringify(input))
    .digest('hex')

exports.digest = digest

const capitalize = input => input[0].toUpperCase() + input.slice(1)

exports.capitalize = capitalize
