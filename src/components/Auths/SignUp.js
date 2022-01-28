import React, { useState } from 'react'

//import { RegionDropdown, CountryDropdown } from 'react-country-region-selector'

import { useFirebase } from 'react-redux-firebase'

import { registerAction } from './Action'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../body/Footer'

import { Link, useHistory } from 'react-router-dom'
import { Form, InputGroup } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons'
import Swal from 'sweetalert2'

import withReactContent from 'sweetalert2-react-content'
import { makeStyles, Snackbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
}))
const MySwal = withReactContent(Swal)

function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const { push } = useHistory()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [photo, setPhoto] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const signupError = useSelector((state) => state.authReducer.signupError)

  const [showPassword, setShowPassword] = useState(false)

  const userData = {
    lastname,
    password,
    firstname,
    email,
    phone,
    photo,
    country,
    isSubmitting,
  }

  const setUserData = {
    setEmail,
    setPassword,
    setPhone,
    setLastname,
    setFirstname,
    setPhoto,
    setCountry,
    setIsSubmitting,
  }
  const [openPopUp, setOpenPopUp] = useState({
    error: false,
    success: false,
  })

  const emptyOptions = {
    title: <p>Required</p>,
    text: 'Please all inputs are required',
    icon: 'info',
    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const lengthOptions = {
    title: <p>Invalid</p>,
    text: 'Password Must be greater or equal to 5 characters long',
    icon: 'info',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (
      password === '' ||
      email === '' ||
      phone === '' ||
      photo === '' ||
      country === '' ||
      lastname === '' ||
      firstname === ''
    ) {
      setIsSubmitting(false)
      return MySwal.fire(emptyOptions)
    }
    if (password.length < 5) {
      setIsSubmitting(false)
      return MySwal.fire(lengthOptions)
    }

    registerAction(
      userData,
      firebase,
      dispatch,
      setUserData,
      push,
      openPopUp,
      setOpenPopUp,
    )
  }

  return (
    <>
      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">Register</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        onClose={() => setOpenPopUp({ ...openPopUp, error: false })}
        open={openPopUp.error}
        message={signupError}
        autoHideDuration={9000}
        ContentProps={{ className: classes.content }}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      />
      <div className="account-pages site-bg height-100vh">
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5 ">
                  <div className="card wow fadeInUp">
                    <div className="card-body p-4 ">
                      <div className="text-center mb-4">
                        <h4 className="text-uppercase mt-0 userTextColor">
                          Register for membership
                        </h4>
                      </div>

                      <Form
                        noValidate
                        className="login-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group mb-4">
                          <label htmlFor="firstname " className="text-dark">
                            First Name
                          </label>
                          <Form.Control
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            required
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="lastname" className="text-dark">
                            Last Name
                          </label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            id="lastname"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="emailaddress" className="text-dark">
                            Email address
                          </label>
                          <Form.Control
                            type="email"
                            name="email"
                            id="emailaddress"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className=" mb-4 form-group">
                          <label htmlFor="password" className="text-dark">
                            Password
                          </label>
                          <InputGroup>
                            <Form.Control
                              name="password"
                              className="form-control"
                              type={showPassword ? 'text' : 'password'}
                              security="true"
                              id="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputGroup.Prepend style={{ cursor: 'pointer' }}>
                              <InputGroup.Text>
                                {showPassword ? (
                                  <Icons.EyeSlash
                                    size="20px"
                                    onClick={() => setShowPassword(false)}
                                  />
                                ) : (
                                  <Icons.Eye
                                    size="20px"
                                    onClick={() => setShowPassword(true)}
                                  />
                                )}
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                          </InputGroup>
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="country" className="text-dark">
                            Country
                          </label>
                          <Form.Control
                            name="country"
                            type="text"
                            id="country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="phone" className="text-dark">
                            Number
                          </label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label htmlFor="photo" className="text-dark">
                            Photo
                          </label>
                          <Form.Control
                            type="file"
                            name="photo"
                            id="photo"
                            required
                            onChange={(e) => setPhoto(e.target.files[0])}
                          />
                        </div>

                        <div className="form-group mb-4">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkbox-signin"
                            />
                            <label
                              className="custom-control-label text-dark"
                              htmlFor="checkbox-signin"
                            >
                              I accept{' '}
                              <Link to="/signup" className="text-primary">
                                Terms and Conditions
                              </Link>
                            </label>
                          </div>
                        </div>

                        <div className="form-group mb-0 text-center">
                          <button
                            className="btn w-100 history-info"
                            type="submit"
                            disabled={userData.isSubmitting}
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 text-center link-resize">
                        <p className="text-white">
                          Already have account?{' '}
                          <a href="/login" className="text-white ml-1">
                            <b>Sign In</b>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
