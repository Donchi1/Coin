import React, { useState } from 'react'

import { useFirebase } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import { logginAction } from './Action'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import * as yup from 'yup'
import adminAuth from './adminAuthProvider'

const MySwal = withReactContent(Swal)

function AdminLogin() {
  const [userData, setuserData] = useState({
    password: '',
    email: '',
    remember: '',
    validity: false,
  })

  const firebase = useFirebase()
  const dispatch = useDispatch()

  const authError = useSelector((state) => state.authReducer.loginError)
  const [openSnack, setopenSnack] = useState(false)

  const checkAuth = () => setopenSnack(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    logginAction(userData, firebase, dispatch, checkAuth, setuserData)
  }

  const options = {
    title: <p>Error</p>,
    text: { authError },
    icon: 'error',
    timer: 4000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }

  const schema = yup.object({
    email: yup.string().email().required('Please this field is requird'),
    password: yup
      .string()
      .required('Please this field is requird')
      .min(5, 'password most be greater than 5'),
  })
  return (
    <>
      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">Admin</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Welcome Admin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="authentication-bg site-bg ">
        <div className="home-btn d-none d-sm-block">
          <a href="/">
            <i className="mdi mdi-home h2 text-white"></i>
          </a>
        </div>

        {openSnack && MySwal.fire(options)}
        <div className=" height-100vh ">
          <div>
            <div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6 col-xl-5 pt-2 ">
                    <div className="card wow fadeInUp">
                      <div className="card-body p-4">
                        <div className="text-center mb-4">
                          <h4 className="text-uppercase mt-0 userTextColor">
                            Login to get started
                          </h4>
                        </div>
                        <Formik
                          initialValues={{ email: '', password: '' }}
                          validationSchema={schema}
                          onSubmit={(values, props) =>
                            adminAuth('AUTH_LOGIN', values, props.resetForm)
                          }
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,

                            isSubmitting,
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                              <Form.Group className="form-group form-focus mb-4">
                                <label
                                  htmlFor="emailaddress "
                                  className="text-dark text-bold"
                                >
                                  Email address
                                </label>
                                <Form.Control
                                  className="form-control"
                                  type="email"
                                  id="emailaddress"
                                  required
                                  placeholder="Enter your email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  isInvalid={touched.email && !!touched.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="form-group mb-4">
                                <label
                                  htmlFor="password "
                                  className="text-dark "
                                >
                                  Password
                                </label>
                                <Form.Control
                                  className="form-control"
                                  type="password"
                                  required
                                  security="true"
                                  id="password"
                                  value={values.password}
                                  placeholder="Enter your password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="form-group mb-4">
                                <div className="custom-control custom-checkbox">
                                  <Form.Control
                                    as="checkbox"
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="checkbox-signin"
                                    checked={userData.remember}
                                    onChange={() =>
                                      setuserData({
                                        ...userData,
                                        remember: !userData.remember,
                                      })
                                    }
                                  />
                                  <label
                                    className="custom-control-label text-dark"
                                    htmlFor="checkbox-signin"
                                  >
                                    Remember me
                                  </label>
                                </div>
                              </Form.Group>

                              <div className="form-group mb-0 text-center">
                                <button
                                  className="btn  history-info w-100"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  {' '}
                                  Log In{' '}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
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

export default AdminLogin
