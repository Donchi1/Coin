import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AccountVerifyLogin() {
  const [userData, setUserData] = useState({
    isSubmitting: false,
    code: '',
  })

  const firebase = useFirebase()
  const dispatch = useDispatch()
  const userDataState = useSelector((state) => state.firebase.profile)

  const errorOptions = {
    title: <p>Code Error</p>,
    text: 'Incorrect or Wrong Verification Code',
    icon: 'error',
    showCloseButton: true,
    closeButtonText: 'OK',
    timer: '5000',
  }
  const successOptionsLogin = {
    title: <p>Success</p>,
    text: 'Login Successful',
    icon: 'success',
    timer: '5000',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const emptyOptions = {
    title: <p>Required</p>,
    text: 'Please all inputs are required',
    icon: 'info',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const processData = () => {
    if (userData.code === userDataState.verificationCode) {
      dispatch({ type: 'LOGIN_SUCCESS' })
      setUserData({ ...userData, code: '', isSubmitting: false })
      return MySwal.fire(successOptionsLogin).then(() => {
        return window.location.assign('/user/dashboard')
      })
    }

    setUserData({ ...userData, code: '', isSubmitting: false })
    return MySwal.fire(errorOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({ ...userData, isSubmitting: true })
    const { code } = userData
    if (code === '') {
      setUserData({ ...userData, isSubmitting: false })
      return MySwal.fire(emptyOptions)
    }

    return processData()
  }

  const handleLogout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('userId')
        return window.location.assign('/')
      })
  }
  const handleDelete = () => {
    return firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        return firebase
          .firestore()
          .collection('users')
          .doc(
            userDataState.uid
              ? userDataState.uid
              : localStorage.getItem('userId'),
          )
          .delete()
          .then(() => {
            localStorage.removeItem('userId')
            return window.location.assign('/')
          })
      })
  }

  return (
    <>
      <section className="sub-page-banner h-50 site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">Verification</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="authentication-bg site-bg pb-5">
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
                            Verify Your Account To Continue
                          </h4>
                          <p>Please Do Not Recreate Your Account</p>
                        </div>

                        <Form onSubmit={handleSubmit} noValidate>
                          <div className="form-group form-focus mb-4">
                            <label
                              htmlFor="code "
                              className="text-dark text-bold"
                            >
                              Enter Code
                            </label>
                            <Form.Control
                              type="text"
                              id="code"
                              name="code"
                              placeholder="Enter verification Code"
                              value={userData.code}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  code: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group mb-0 text-center">
                            <button
                              className="btn  history-info w-100"
                              type="submit"
                              disabled={userData.isSubmitting}
                            >
                              {' '}
                              Verify{' '}
                            </button>
                          </div>
                        </Form>
                        <div className="form-group mb-0 mt-4 text-center">
                          <button
                            onClick={handleDelete}
                            className="btn  history-info w-100"
                            type="submit"
                          >
                            Delete Account
                          </button>
                        </div>
                        <div className="form-group mb-0 mt-4 text-center">
                          <button
                            onClick={handleLogout}
                            className="btn  history-info w-100"
                            type="submit"
                          >
                            logout
                          </button>
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

export default AccountVerifyLogin
