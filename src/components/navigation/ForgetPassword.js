import React, { useState } from 'react'
import { forgetAction } from '../Auths/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import NavBar from './NavBar'
import Footer from '../body/Footer'
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

function ForgetPassword() {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const classes = useStyles()

  const resetError = useSelector((state) => state.authReducer.passResetError)
  const resetSuccess = useSelector((state) => state.authReducer.passResetSuccss)
  const [resetEmail, setResetEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openPopUp, setOpenPopUp] = useState({
    error: false,
    success: false,
  })

  const handleReset = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (resetEmail === '') {
      setIsSubmitting(false)
      return MySwal.fire(emptyOptions).then()
    }

    forgetAction(
      dispatch,
      firebase,
      resetEmail,
      setResetEmail,
      setIsSubmitting,
      openPopUp,
      setOpenPopUp,
    )
  }

  const successOptions = {
    title: <p>Reset Success</p>,
    html: <span className="text-success"> {resetSuccess} </span>,
    icon: 'success',
    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const errorOptions = {
    title: <p>Reset Error</p>,
    text: resetError,
    color: 'red',
    icon: 'error',
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

  if (resetSuccess) {
    MySwal.fire(successOptions).then(() => {
      return dispatch({
        type: 'PASSRESET_SUCCESS',
        message: '',
      })
    })
  }
  if (resetError) {
    MySwal.fire(errorOptions).then(() => {
      return dispatch({ type: 'PASSRESET_ERROR', error: '' })
    })
  }

  return (
    <>
      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">
                  Recover Password
                </h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Password Reset</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        onClose={() => setOpenPopUp({ ...openPopUp, error: false })}
        open={openPopUp.error}
        message={resetError}
        autoHideDuration={9000}
        ContentProps={{ className: classes.content }}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      />
      <div className=" height-100vh site-bg">
        <div>
          <div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5 pt-2 ">
                  <div className="card ">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h4 className="text-uppercase mt-0 userTextColor">
                          Input your password reset email
                        </h4>
                      </div>
                      <form onSubmit={handleReset} noValidate>
                        <div className="form-group form-focus mb-4">
                          <label
                            htmlFor="emailaddress "
                            className="text-dark text-bold"
                          >
                            Email address
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="emailaddress"
                            required
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group mb-0 text-center">
                          <button
                            disabled={isSubmitting}
                            className="btn history-info btn-round btn-block"
                            type="submit"
                          >
                            {' '}
                            Submit{' '}
                          </button>
                        </div>
                      </form>
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

export default ForgetPassword
