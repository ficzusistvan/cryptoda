module.exports = {
  dev: {
  "default-src": ["'self'"],
  "style-src": ["'self'"]
  },
  prod: {
  "default-src": "'self'",  // can be either a string or an array.
  "style-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://dev-9z71xtiv.eu.auth0.com"
  ]
  }
}