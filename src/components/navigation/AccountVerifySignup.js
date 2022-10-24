import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function AccountVerifySignup() {
  const userDataState = useSelector((state) => state.firebase.profile)

  useFirestoreConnect([
    {
      collection: 'users',
      doc: userDataState.uid,
    },
  ])
  const [userData, setUserData] = useState({
    isSubmitting: false,
    code: '',
  })

  const firebase = useFirebase()
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.firebase.auth)
  const { push } = useHistory()

  const errorOptions = {
    title: <p>Code Error</p>,
    text: 'Incorrect or Wrong Verification Code',
    icon: 'error',
    showCloseButton: true,
    closeButtonText: 'OK',
    timer: 7000,
  }
  const successOptionsSignup = {
    title: <p>Success</p>,
    html: <span className="text-success">Signup Successful !!</span>,
    icon: 'success',
    timer: 7000,
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const emptyOptions = {
    title: <p>Required</p>,
    text: 'Please all inputs are required',
    icon: 'error',
    color: 'red',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const processData = () => {
    if (userData.code === userDataState?.verificationCode) {
      return firebase
        .firestore()
        .collection('notifications')
        .doc(userDataState.uid)
        .collection('notificationDatas')
        .add({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          message: 'Welcome to Ultimatecoins. Trade with ease.',
          id: userDataState.uid,
          user: userDataState.firstname,
        })
        .then(() => {
          firebase
            .firestore()
            .collection('users')
            .doc(userDataState.uid)
            .update({
              verified: true,
            })
            .then(() => {
              dispatch({ type: 'SIGNUP_SUCCESS' })
              MySwal.fire(successOptionsSignup).then(() => {
                setUserData({ ...userData, code: '', isSubmitting: false })
                return push('/user/dashboard')
                // return axios
                //   .post(
                //     `${process.env.REACT_APP_APIURL}/api/welcome`,
                //     userDataState,
                //   )
                //   .then(() => {
                //     return push('/user/dashboard')
                //   })
                //   .catch((err) => {
                //     return push('/user/dashboard')
                //   })
              })
            })
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
      e.stopPropagation()
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
        return window.location.assign('/')
      })
  }

  return (
    <>
    

      <div className="vh-100">
      <div className="authentication h-100  ">
        <div className=" h-100 ">
          <div className="container">
            <div className="row justify-content-center vh-100 align-items-center">
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
                              type="submit"
                              disabled={userData.isSubmitting}
                              className="btn  history-info w-100"
                            >
                              {' '}
                              Verify{' '}
                            </button>
                          </div>
                        </Form>

                        <div className="form-group mb-0 mt-4 text-center">
                          <button
                            onClick={handleLogout}
                            className="btn  history-info w-100"
                            type="submit"
                          >
                            Logout
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
      
      
    </>
  )
}

export default AccountVerifySignup
