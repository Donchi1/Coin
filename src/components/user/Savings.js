import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { savingAction } from '../Auths/Action'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import UserNav from './UserNav1'
import Compressor from 'compressorjs'
import Ufooter from './Ufooter'

const MySwal = withReactContent(Swal)

function Savings() {
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { push } = useHistory()

  const userInfo = useSelector((state) => state.firebase.profile)

  const [savingInfo, setSavingInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    accountNumber: '',
    dateOfBirth: '',
    accountReason: '',
    idNumber: '',
    occupation: '',
    amount: '',
    prove: '',
    nFirstname: '',
    nLastname: '',
    nEmail: '',
    nPhone: '',
    PWC: '',
    isSubmitting: false,
  })
  const [idCardPhoto, setIdCardPhoto] = useState('')

  const handleImageComp = (img) => {
    new Compressor(img, {
      quality: 0.8,
      success: (file) => {
        setIdCardPhoto(file)
      },
    })
  }

  const emptyOptions = {
    title: <p>Required</p>,
    text: 'Please all inputs are required',
    icon: 'info',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const handleChange = (e) => {
    const { value, files } = e.target

    setSavingInfo({ ...savingInfo, [e.target.name]: files ? files[0] : value })
  }

  const {
    firstname,
    lastname,
    email,
    phone,
    country,
    state,
    accountNumber,
    dateOfBirth,
    accountReason,
    idNumber,
    occupation,
    nFirstname,
    nLastname,
    nEmail,
    nPhone,
  } = savingInfo

  const handleSubmit = (e) => {
    e.preventDefault()
    setSavingInfo({ ...savingInfo, isSubmitting: true })
    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      phone === '' ||
      country === '' ||
      state === '' ||
      accountNumber === '' ||
      dateOfBirth === '' ||
      accountReason === '' ||
      occupation === '' ||
      idNumber === '' ||
      idCardPhoto === '' ||
      nFirstname === '' ||
      nLastname === '' ||
      nEmail === '' ||
      nPhone === ''
    ) {
      setSavingInfo({ ...savingInfo, isSubmitting: false })
      return MySwal.fire(emptyOptions)
    }

    return savingAction(
      firebase,
      dispatch,

      savingInfo,
      push,
      setSavingInfo,
      idCardPhoto,
      setIdCardPhoto,
    )
  }

  return (
    <div className="main-wrapper">
      <UserNav />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0 ">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Savings Account Registration</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/user">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#">Register</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="mt-4 col-12 mb-4">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="mb-0 text-black fs-20">
                Create Your Saving Account Now
              </h4>
            </div>
            <div className=" card-body ">
              <Form onSubmit={handleSubmit} className="mb-4" noValidate>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.firstname}
                      name="firstname"
                      placeholder="Your Firstname"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.lastname}
                      name="lastname"
                      placeholder="Your Lastname"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="email"
                      value={savingInfo.email}
                      name="email"
                      placeholder="Your Email"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.phone}
                      name="phone"
                      placeholder="Your Number"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.country}
                      name="country"
                      placeholder="Your Country"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.state}
                      name="state"
                      onChange={handleChange}
                      placeholder="Your State"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4 " sm={12} lg={6}>
                    <Form.Control
                      required
                      type="date"
                      value={savingInfo.dateOfBirth}
                      name="dateOfBirth"
                      placeholder="Your Birthdate"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4" sm={12} lg={6}>
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.accountNumber}
                      name="accountNumber"
                      placeholder="Account Number"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.idNumber}
                      name="idNumber"
                      placeholder="Your id Number"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.occupation}
                      name="occupation"
                      placeholder="Your Occupation"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <h6 className="text-center mt-2">Next Of Kings</h6>
                <Row>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.nFirstname}
                      name="nFirstname"
                      placeholder="nFirstname"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.nLastname}
                      name="nLastname"
                      placeholder="nLastname"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="text"
                      value={savingInfo.nPhone}
                      name="nPhone"
                      placeholder="nPhone"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      required
                      type="email"
                      value={savingInfo.nEmail}
                      name="nEmail"
                      placeholder="nEmail"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <label htmlFor="idcard">Upload id Photo</label>
                    <Form.Control
                      required
                      type="file"
                      id="idcard"
                      name="idCardPhoto"
                      onChange={(e) => handleImageComp(e.target.files[0])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-4">
                    <Form.Control
                      as="textarea"
                      required
                      type="text"
                      value={savingInfo.accountReason}
                      name="accountReason"
                      resize="false"
                      placeholder="Why Do you want to open this account"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="my-4 ">
                  <Button
                    type="submit"
                    className="w-75 mx-auto"
                    disabled={savingInfo.isSubmitting}
                  >
                    Submit
                  </Button>
                </Row>
              </Form>
              {userInfo.savingsAccount && (
                <>
                  <p style={{ textAlign: 'center' }}>
                    Already have account login
                  </p>
                  <Row className="my-4 ">
                    <Button
                      onClick={() =>
                        window.location.assign('/savings/dashboard')
                      }
                      type="submit"
                      className="w-75 mx-auto bg-secondary"
                    >
                      Sdashboard
                    </Button>
                  </Row>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div>
            <div className="card ">
              <div className="card-header border-0">
                <h4 className="mb-0 text-black fs-20">Contact Us</h4>
              </div>

              <div className="card-body ">
                <section className="mt-5">
                  <div>
                    <div className="row align-items-center">
                      <div className="col-lg-9">
                        <div className="action-content res_md_mb_20">
                          <h3 className="wow">
                            Let Us Help You to Find a Solution That Meets Your
                            Needs
                          </h3>
                          <p className="m-0 wow">
                            contact our team for any issue on your savings
                            account
                          </p>
                          <p className="m-0 wow"></p>
                        </div>
                      </div>
                      <div className="col-lg-3 text-lg-right">
                        <ul className="portofolio-social">
                          <li>
                            <a href="https://wa.me/+447775303036">
                              <i className="fa fa-whatsapp"></i>
                            </a>
                          </li>
                          <li>
                            <a href="mailto:ultimatesavig@outlook.com">
                              <i className="fa fa-envelope-o"></i>
                            </a>
                          </li>
                          <li>
                            <a href="tel:+447775303036">
                              <i className="fa fa-phone"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Ufooter />
    </div>
  )
}

export default Savings
