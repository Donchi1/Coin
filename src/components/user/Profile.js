import React, { useState, useEffect } from 'react'

import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'

import { passwordUpdate, updateProfileAction } from '../Auths/Action'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import UserNav1 from './UserNav1'
import { Button, Form } from 'react-bootstrap'
import img1 from '../../assets/avater.png'
import Ufooter from './Ufooter'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function Profile() {
  useFirestoreConnect([
    {
      collection: 'users',
      doc: localStorage.getItem('userId'),
    },
  ])
  const userProfile = useSelector((state) => state.firebase.profile)
  const profileUpdateInfo = useSelector((state) => state.authReducer)

  const firebase = useFirebase()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstname: userProfile.firstname,
    lastname: userProfile.lastname,
    phone: userProfile.phone,
    country: userProfile.country,
    img: '',
    email: '',
    password: '',
    oldPassword: '',
    isSubmitting: false,
  })

  const [userPassword, setUserPassword] = useState({
    password: '',
    password1: '',
    isSubmitting: false,
  })

  const { firstname, lastname, phone, country, isSubmitting } = userData

  const profileOptions = {
    title: <p>Profile Update</p>,
    html: (
      <span className="text-success">{profileUpdateInfo.profileMessage}</span>
    ),
    icon: 'success',
    closeButtonColor: 'red',
    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const passwordOptions = {
    title: <p>Password Update</p>,
    html: (
      <span className="text-success">{profileUpdateInfo.passwordMessage}</span>
    ),
    icon: 'success',
    closeButtonColor: 'red',
    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const requiredOption = {
    title: <p>Required</p>,
    text: 'All fields are required',
    icon: 'error',
    color: 'red',
    closeButtonColor: 'red',
    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const matchOption = {
    title: <p>Must Match</p>,
    text: 'Password Must Match',
    icon: 'error',
    color: 'red',
    closeButtonColor: 'red',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({ ...userData, isSubmitting: true })
    if ((firstname, lastname, phone, country)) {
      return updateProfileAction(userData, firebase, dispatch, setUserData)
    } else {
      setUserData({ ...userData, isSubmitting: false })
      return MySwal.fire(requiredOption)
    }
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setUserPassword({ ...userPassword, isSubmitting: true })
    if (userPassword.password === '' || userPassword.password1 === '') {
      setUserPassword({ ...userPassword, isSubmitting: false })
      return MySwal.fire(requiredOption)
    }
    if (userPassword.password !== userPassword.password1) {
      setUserPassword({ ...userPassword, isSubmitting: false })
      return MySwal.fire(matchOption)
    }

    passwordUpdate(userPassword, setUserPassword, dispatch, firebase, firstname)
  }

  if (profileUpdateInfo.profileUploadMessage) {
    MySwal.fire(profileOptions).then(() => {
      dispatch({ type: 'PROFILE_UPLOAD_SUCCESS', message: '' })
    })
  }
  if (profileUpdateInfo.passwordUpdateSuccess) {
    MySwal.fire(passwordOptions).then(() => {
      dispatch({ type: 'PASSWORD_UPLOAD_SUCCESS', message: '' })
    })
  }
  if (profileUpdateInfo.passwordUpdateError) {
    MySwal.fire(passwordOptions).then(() => {
      dispatch({ type: 'PASSWORD_UPLOAD_ERROR', message: '' })
    })
  }
  return (
    <div id="main-wrapper" className="show">
      <UserNav1 />
      <div className="content-body " style={{ minHeight: '780px' }}>
        <div className="container-fluid">
          <div className="row page-titles mx-0 ">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Hi, welcome back!</h4>
                <p className="mb-0">Your Profile Information</p>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#">Profile</Link>
                </li>
              </ol>
            </div>
          </div>

          <div className="row ">
            <div className="col-lg-6 col-sm-12 ">
              <div className="profile card card-body px-3  pb-0">
                <div className="profile-head ">
                  <div className="photo-content">
                    <div className="profile-photo">
                      <img
                        src={userProfile.photo || img1}
                        className="img-fluid rounded "
                        alt=""
                        width="300px"
                        height="400px"
                      />
                    </div>
                  </div>

                  <div className="profile-info">
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="text-primary mb-0">
                          Welcome {userProfile.firstname || 'John Deo'}
                        </h4>
                        <p>Investor And User</p>
                      </div>
                      <div className="profile-email px-2 pt-2">
                        <h4 className="text-muted mb-0">
                          {userProfile.email || 'pchidi250@gmail.com'}
                        </h4>
                        <p>Email</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-sm-2">
                    <a
                      className="btn btn-secondary  mr-1 px-3 "
                      data-toggle="modal"
                      href="#cameraModal"
                    >
                      Update Profile
                    </a>
                  </div>
                </div>
                <div className="modal fade" id="cameraModal">
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Upload Profile</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          <span>×</span>
                        </button>
                      </div>
                      <Form noValidate onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Upload</span>
                            </div>
                            <div className="custom-file ">
                              <input
                                type="file"
                                name="img"
                                id="img"
                                placeholder=" update profile "
                                className="custom-file-input"
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    img: e.target.files[0],
                                  })
                                }
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                            <div className="form-group col-md-12 mt-4 animation">
                              <Form.Control
                                type="text"
                                name="firstname"
                                id="name"
                                size="sm"
                                placeholder="Enter firstname"
                                value={firstname}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    firstname: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form-group col-md-12 animation">
                              <Form.Control
                                type="text"
                                name="lastname"
                                id="lastname"
                                size="sm"
                                placeholder="Enter lastname "
                                value={lastname}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    lastname: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="form-group col-md-12 animation">
                              <Form.Control
                                type="tel"
                                name="phone"
                                id="phone"
                                size="sm"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="form-group col-md-12 wow">
                              <Form.Control
                                type="text"
                                name="country"
                                id="country"
                                placeholder="Enter country"
                                value={country}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    country: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="form-group col-md-12 text-center ">
                              <Button
                                type="submit"
                                disabled={userData.isSubmitting}
                              >
                                Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="card">
                <div className="card-body mt-lg-5 mt-sm-0 items-center">
                  <div className="profile-statistics">
                    <div className="text-center">
                      <div className="row">
                        <div className="col">
                          <h3 className="m-b-0">
                            ${userProfile.totalBalance || '0000'}
                          </h3>
                          <span>Total Balance</span>
                        </div>
                        <div className="col">
                          <h3 className="m-b-0">
                            ${userProfile.bonus || '0000'}
                          </h3>
                          <span>Bonus</span>
                        </div>
                        <div className="col">
                          <h3 className="m-b-0">45%</h3>
                          <span>Reviews</span>
                        </div>
                      </div>
                      <div className="mt-lg-4 mt-sm-0"></div>
                      <div className="mt-4">
                        <Link
                          to="/user/history"
                          className="btn btn-primary mb-1 mr-1"
                        >
                          All Transactions
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="profile-tab">
                    <div className="custom-tab-1">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#about-me"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            About Me
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#profile-settings"
                            data-toggle="tab"
                            className="nav-link active"
                          >
                            Setting
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="about-me" className="tab-pane fade">
                          <div className="profile-personal-info">
                            <h4 className="text-primary mb-4">
                              Personal Information
                            </h4>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  firstName{' '}
                                  <span className="pull-right">:</span>
                                </h5>
                              </div>

                              <div className="col-sm-9 col-7">
                                <span>{userProfile.firstname}</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  lastName <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-sm-9 col-7">
                                <span>{userProfile.lastname}</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  Email <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-sm-9 col-7">
                                <span>{userProfile.email}</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  Phone <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-sm-9 col-7">
                                <span>{userProfile.phone}</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  Country <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-sm-9 col-7">
                                <span>{userProfile.country}</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-3 col-5">
                                <h5 className="f-w-500">
                                  Location <span className="pull-right">:</span>
                                </h5>
                              </div>
                              <div className="col-sm-9 col-7">
                                <span>{userProfile.country}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          id="profile-settings"
                          className="tab-pane fade active show"
                        >
                          <div className="pt-3">
                            <div className="settings-form">
                              <h4 className="text-primary">Account Setting</h4>
                              <Form noValidate onSubmit={handlePasswordUpdate}>
                                <div className="form-row">
                                  <div className="form-group col-sm-12 col-lg-6">
                                    <label>New Password</label>
                                    <Form.Control
                                      type="password"
                                      name="password1"
                                      id="password"
                                      size="sm"
                                      title="password must be 6 characters or more and contain at least 1 lower case letter"
                                      value={userPassword.password}
                                      onChange={(e) =>
                                        setUserPassword({
                                          ...userPassword,
                                          password: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-sm-12 col-lg-6">
                                    <label>Repeat Password</label>

                                    <Form.Control
                                      type="password"
                                      name="password"
                                      id="password"
                                      value={userPassword.password1}
                                      onChange={(e) =>
                                        setUserPassword({
                                          ...userPassword,
                                          password1: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-12 text-center ">
                                  <Button
                                    disabled={userPassword.isSubmitting}
                                    type="submit"
                                  >
                                    Update
                                  </Button>
                                </div>
                              </Form>
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
        </div>
      </div>
      <Ufooter />
    </div>
  )
}

export default Profile
