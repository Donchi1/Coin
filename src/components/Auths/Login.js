import React, { useState } from 'react'
import { Form, Button, Navbar } from 'react-bootstrap'
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom'
import { backgroundcolor, itemColor } from '../navigation/NavBar'
import { isLoaded, isEmpty, useFirebase } from 'react-redux-firebase'
import { useSelector, useDispatch } from 'react-redux'
import { logginAction, forgetAction } from './Action'
import { Modal } from 'react-bootstrap'

function Login() {
  const [userData, setuserData] = useState({
    password: '',
    email: '',
    validity: false,
  })

  const [openModal, setOpenModal] = useState(false)

  const firebase = useFirebase()
  const dispatch = useDispatch()

  const { push } = useHistory()

  const authState = useSelector((state) => state.firebase.auth)
  const auth = useSelector((state) => state.firebase.auth.isEmpty)
  const emailVerified = useSelector(
    (state) => state.firebase.auth.emailVerified,
  )
  const authError = useSelector((state) => state.authReducer.loginError)

  const handleSubmit = (e) => {
    e.preventDefault()

    logginAction(userData, firebase, dispatch)

    setuserData(() => {
      return { ...userData, email: '', password: '' }
    })

    if (isLoaded(authState) && !isEmpty(authState) && emailVerified) {
      return push('/user')
    } else {
      return <Redirect to="/login" />
    }
  }

  const handleReset = () => {
    if (auth) {
      return
    } else {
      setOpenModal(true)
      forgetAction(dispatch, firebase)
    }
  }

  return (
    <div style={{ backgroundColor: backgroundcolor, minHeight: '100vh' }}>
      <div className="container py-3 ">
        <h4 className="text-center p-4 text-light text-uppercase  ">
          <span className="text-primary">Login</span> form
        </h4>
        <h3
          className="text-light text-center mb-3 "
          style={{ fontStyle: 'italic' }}
        >
          Login now to plus your coins
        </h3>
        <form
          className="container  pb-4 pt-3"
          onSubmit={handleSubmit}
          style={{ borderRadius: '1.5rem', backgroundColor: itemColor }}
        >
          <div className="text-center">
            <img
              src={require('../../assets/avater.png')}
              alt="avater"
              width="180"
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className=" form-group">
            <label
              htmlFor="email"
              style={{ fontSize: '1.4rem' }}
              className="text-light"
            >
              Enter your email
            </label>

            <input
              type="email"
              id="email"
              size="sm"
              placeholder="Email"
              aria-describedby="inputemail"
              required
              className="formstyle text-light form-control"
              onChange={(e) =>
                setuserData({ ...userData, email: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks Nice
            </Form.Control.Feedback>
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              style={{ fontSize: '1.4rem' }}
              className="text-light"
            >
              Enter your password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              aria-describedby="inputpassword"
              required
              security="true"
              minLength="6"
              title="password must be greater than 6 characters one uppercase"
              size="sm"
              autoComplete="true"
              className="formstyle text-light form-control"
              onChange={(e) => {
                const userpass = e.target.value
                setuserData({ ...userData, password: userpass.trim() })
              }}
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
              Looks Nice
            </Form.Control.Feedback>
          </div>

          <Button
            type="submit"
            className="text-light bg-primary"
            style={{
              width: '100%',
              textTransform: 'uppercase',

              borderRadius: '1.2rem',
            }}
            size="sm"
          >
            Submit Message
          </Button>
          <p className="text-center text-danger">{authError && authError}</p>
          <p className="text-uppercase text-center mt-4 text-light">
            Don't have an account? <Link to="/signup">register now</Link>
          </p>
          <div className="text-primary" style={{ cursor: 'pointer' }}>
            <h5 onClick={handleReset}>Forgot Password</h5>
          </div>
          <div className="text-center text-light pt-3">
            <span>©copywrite CoinPlus 2020 all right reserved</span>
            <Navbar.Brand
              className="text-uppercase ml-5 mt-4 font-weight-bold"
              style={{
                fontSize: '2rem',
                alignItems: 'center',
              }}
            >
              Crypto<span className="text-primary">genus</span>
            </Navbar.Brand>
          </div>
        </form>
      </div>
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Header>
          <h3 className="text-center text-danger">Password Reset Email</h3>
        </Modal.Header>
        <Modal.Body>
          A password reset email was sent to you, check it out and continue
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Login
