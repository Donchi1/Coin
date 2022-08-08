import React, { useState } from 'react'

import { useFirebase } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import { logginAction } from './Action'

import Footer from '../body/Footer'

import { Form, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import * as Icons from 'react-bootstrap-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { makeStyles, Snackbar } from '@material-ui/core'

const MySwal = withReactContent(Swal)

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
}))

function Login() {
  const classes = useStyles()

  const [openPopUp, setOpenPopUp] = useState({
    error: false,
    success: false,
  })
  const [userData, setUserData] = useState({
    password: '',
    email: '',
    remember: '',
    isSubmitting: false,
    openError: false,
    openSuccess: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { push } = useHistory()

  const { loginError, loginSuccess } = useSelector((state) => state.authReducer)

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
    setUserData({ ...userData, isSubmitting: true })
    const { email, password } = userData
    if (email === '' || password === '') {
      e.stopPropagation()
      setUserData({ ...userData, isSubmitting: false })
      return MySwal.fire(emptyOptions)
    }
    if (password.length < 5) {
      e.stopPropagation()
      setUserData({ ...userData, isSubmitting: false })
      return MySwal.fire(lengthOptions)
    }
    logginAction(
      userData,
      firebase,
      dispatch,
      setUserData,
      push,
      openPopUp,
      setOpenPopUp,
    )
  }

  if (openPopUp.success) {
    MySwal.fire({
      title: <p>Success</p>,
      html: <span className="text-success">{loginSuccess}</span>,
      icon: 'success',
      timer: 7000,
      showCloseButton: true,
      closeButtonText: 'OK',
    }).then(() => {
      setOpenPopUp({ ...openPopUp, success: false })
      return push('/user/dashboard')
    })
  }
  if (openPopUp.error) {
    MySwal.fire({
      title: <p>Error</p>,
      text: loginError,
      color: 'red',
      icon: 'error',
      timer: 7000,
      showCloseButton: true,
      closeButtonText: 'OK',
    }).then(() => {
      return setOpenPopUp({ ...openPopUp, error: false })
    })
  }

  return (
    <>
      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">Login</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="authentication-bg site-bg ">
        <div className=" height-100vh ">
          <div>
            <div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-5 pt-2 ">
                    <div className="card ">
                      <div className="card-body p-4">
                        <div className="text-center mb-4">
                          <h4 className="text-uppercase mt-0 userTextColor">
                            Login to get started
                          </h4>
                        </div>

                        <Form onSubmit={handleSubmit} noValidate>
                          <div className="form-group form-focus mb-4">
                            <label
                              htmlFor="emailaddress "
                              className="text-dark text-bold"
                            >
                              Email address
                            </label>
                            <Form.Control
                              type="email"
                              id="emailaddress"
                              name="email"
                              value={userData.email}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group mb-4">
                            <label htmlFor="password " className="text-dark ">
                              Password
                            </label>
                            <InputGroup>
                              <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                security="true"
                                id="password"
                                minLength={5}
                                maxLength={30}
                                value={userData.password}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    password: e.target.value,
                                  })
                                }
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

                          <div className="form-group mb-0 text-center">
                            <button
                              className="btn  history-info w-100"
                              type="submit"
                              disabled={userData.isSubmitting}
                            >
                              {' '}
                              Log In{' '}
                            </button>
                          </div>
                        </Form>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12 text-center link-resize pb-2 pt-2 ">
                          <p>
                            {' '}
                            <a href="/passReset" className="text-primary ml-1">
                              <i className="fa fa-lock mr-1"></i>Forgot your
                              password?
                            </a>
                          </p>
                          <p>
                            Don't have an account?{' '}
                            <a href="/signup" className=" ml-1">
                              <b className="text-primary">Sign Up</b>
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
      </div>
    </>
  )
}

export default Login
