const emailData = {
  pcw: (email, pcw) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Personal Wthdrawal Code',
    html: `<h1>Your personal withdrawal code has been successfully created </h1>
                    <p>${pcw} copy and past for your saving account withdrawal</p>
                    <br/>
                    <p>This email contains sensitive informations</p>
                    <p>${process.env.CLIENT_URL}</p>
             `,
  }),

  accessCodeProve: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'Access Code Prove',
    html: `<h1>Your access code prove has been sent successfully. We will get back to you in less than 24 hour time </h1>
                  
                    <br/>
                   
                     <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info"> Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  accessCode: (data) => ({
    from: process.env.EMAIL_SENDER,
    to: data.user.email,
    subject: 'Access Code',
    html: `<h1>Hello ${data.user.firstname} your ${
      data.user.accessCode
    } access code has been successfully created . Now you can successfully use it to access your withdrawals. Code:${
      data.code
    } </h1>
    <br/>
    <p>Please this is a very sensitive information, do not disclose to a third party. Happy trading</p>
                   
                     <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info"> Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  //accessCode: (user, code) => ({
  //  from: process.env.EMAIL_SENDER,
  //  to: user.email,
  //  subject: 'Access Code',
  //  html: `<h1>Your access code has been successfully created </h1>
  //                  <p>${code} happy trading</p>
  //                  <br/>
  //                  <p>this email contains sensitive informations</p>
  //                   <small> © ${new Date().getFullYear()}
  //                <a href="https://ultimatecoins.info"> Ultimatecoins</a> All Rights
  //                Reserved</small>
  //           `,
  //}),
  payment: (email) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'payment prove ',
    html: `<h1>Your payment prove was sent successfully wait for less than 24 hours while we confirm your payment.</h1>
    <p>Thank.</p>
              
                    <br/>
                  <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info"> Ultimatecoinsd</a> All Rights
                  Reserved</small>
             `,
  }),

  welcome: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'Welcome',
    html: `<h1>Hi ${user.firstname} you are welcome to ultimatecoins</h1>
                    <p>We are happy to see you</p>
                    <p>Make your life changing investment and enjoy while sit at home</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info">Ultimatecoins</a> All Rights
                  Reserved</small>
                  
             `,
  }),

  passwordUpdate: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'password Update',
    html: `<h1>${
      user.firstname
    } your password has been successfully changed</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info">Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  profileUpdate: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'profile Update',
    html: `<h1>${user.firstname} you have updated your profile</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info">Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  withdrawals: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'Withdrawal Information',
    html: `<h1>${
      user.firstname
    } your withdrawal has been placed successfully</h1>
                    <p>We will get back to you in less than 24 hours</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info">Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  contacts: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'Contact Notification',
    html: `<h1>${user.firstname} thank you for contacting us</h1>
                    <p>We will get back to you soon</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info"> Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  contactsForAdmin: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: 'support@ultimatecoins.info',
    subject: 'Contact Notification',
    html: `<h1>${user.firstname} just contacted you</h1>
                    <p>Login now and check it out</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info"> Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
  newsLetters: (user) => ({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: 'Newsletter',
    html: `<h1>Thank you for subscribing for our newsletter</h1>
                    <p>We will reach out to you if there is any information</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://ultimatecoins.info">Ultimatecoins</a> All Rights
                  Reserved</small>
             `,
  }),
}

module.exports = emailData
