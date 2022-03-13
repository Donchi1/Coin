const router = require('express').Router()
const translate = require('translate-google')
const emailData = require('./EmailData')
const transporter = require('./tranporter')

router.post('/welcome', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.welcome(user))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/withdrawals', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.withdrawals(user))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/payments', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.payment(user.email))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/pwc', (req, res) => {
  const { user, pcw } = req.body

  return transporter
    .sendMail(emailData.pcw(user.email, pcw))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/accessCode', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.accessCode(user))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/accessCodeProve', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.accessCodeProve(user))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})

router.post('/passwordUpdate', (req, res) => {
  const { data } = req.body

  return transporter
    .sendMail(emailData.passwordUpdate(data))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/translate', (req, res) => {
  const data = req.body

  console.log(data)

  return translate(data.sourceText, { to: data.lang })
    .then((response) => {
      console.log(response)
      res.status(200).json({ message: response })
    })
    .catch((err) => {
      console.log(err)
      res.status(403).json({ message: err })
    })
})
router.post('/profileUpdate', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.profileUpdate(user))
    .then(() => {
      return res.status(200).json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(401).json({ message: err.message })
    })
})
router.post('/contact', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.contacts(user))
    .then(() => {
      transporter
        .sendMail(emailData.contactsForAdmin)
        .then(() => {
          return res.json({ message: 'Success' })
        })
        .catch((err) => {
          return res.status(403).json({ message: err })
        })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})
router.post('/newsLetter', (req, res) => {
  const { user } = req.body

  return transporter
    .sendMail(emailData.newsLetters(user))
    .then(() => {
      return res.json({ message: 'Success' })
    })
    .catch((err) => {
      return res.status(403).json({ message: err })
    })
})

module.exports = router
