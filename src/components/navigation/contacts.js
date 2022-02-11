import React, { useState } from 'react'
import Footer from '../body/Footer'

import NavBar from './NavBar'
import { contactAction } from '../Auths/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { Snackbar } from '@material-ui/core'

function Contacts() {
  const [userData, setuserData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
    phone: '',
  })
  const contactSuccess = useSelector(
    (state) => state.projectReducer.contactMessageSuccess,
  )
  const contactError = useSelector(
    (state) => state.projectReducer.contactMessageError,
  )
  const [openSnack, setopenSnack] = useState(false)
  const [openSnackError, setopenSnackError] = useState(false)

  const dispatch = useDispatch()
  const firebase = useFirebase()

  const handleSubmit = (e) => {
    e.preventDefault()
    contactAction(
      userData,
      firebase,
      dispatch,
      setuserData,
      setopenSnack,
      setopenSnackError,
    )
  }

  return (
    <>
      <NavBar />
      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">Contact</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        onClose={() => setopenSnack(false)}
        open={openSnack}
        message={contactSuccess}
        className="text-light text-warning"
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      ></Snackbar>
      <Snackbar
        onClose={() => setopenSnack(false)}
        open={openSnackError}
        message={contactError}
        className="text-light text-warning"
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      ></Snackbar>

      <section className="contact-form site-bg ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6 wow fadeInLeft">
              <div className="section-heading">
                <h2 className="heading-title-2 pb-20 userTextColor">
                  Contact Us
                </h2>
                <p className="heading-des">
                  We standout firm and strong to reach out to our
                  clients.Contact us if you have any issue,complain or confusion
                </p>
              </div>
              <ul className="contact-detail">
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                  <a href="tel:+1(453)945-8896">+1(453)945-8896</a>
                </li>
                <li>
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>{' '}
                  <span>+1(876)285-4050</span>
                </li>
                <li>
                  <i className="fa fa-envelope" aria-hidden="true"></i>{' '}
                  <a href="mailto:support@ultimatecoins.info">
                    support@ultimatecoins.info
                  </a>
                </li>
                <li>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{' '}
                  <span>
                    Headley Ln, Dorking RH5 6DF, US 7M7P+96 Taxes, United States
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 wow fadeInRight">
              <h3 className="blog-comment-heading userTextColor">
                Leave a message here
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name*"
                        onChange={(e) =>
                          setuserData({ ...userData, name: e.target.value })
                        }
                        value={userData.name}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email*"
                        required
                        onChange={(e) =>
                          setuserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject*"
                        required
                        onChange={(e) =>
                          setuserData({ ...userData, subject: e.target.value })
                        }
                        value={userData.subject}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone*"
                        onChange={(e) =>
                          setuserData({ ...userData, phone: e.target.value })
                        }
                        value={userData.phone}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Massage*"
                        onChange={(e) =>
                          setuserData({ ...userData, message: e.target.value })
                        }
                        value={userData.message}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="btn history-info">submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row pt-100">
            <div className="col-md-12 wow fadeInUp">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.1812836849363!2d144.95343106869794!3d-37.81739907631358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a05d97%3A0x3e64f855a564844d!2s121+King+St%2C+Melbourne+VIC+3000%2C+Australia!5e0!3m2!1sen!2sin!4v1562916623921!5m2!1sen!2sin"
                  height="500"
                  style={{ border: '0', width: '100%' }}
                  title="Ultimate Location"
                  allowFullScreen=""
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Contacts
