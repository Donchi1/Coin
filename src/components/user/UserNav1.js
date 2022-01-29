import React, { useEffect, useState } from 'react'
import jQuery from 'jquery'

import { LogoutAction } from '../Auths/Action'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import img from '../../assets/avater.png'
import { Modal, Button, Form } from 'react-bootstrap'
import * as Icons from '@material-ui/icons'
import JWT from 'jsonwebtoken'
import img1 from '../../assets/qrcode.jpg'
import moment from 'moment'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

const MySwal = withReactContent(Swal)

function UserNav1() {
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [openSlider, setOpenSlider] = useState(false)

  const accessCodeData = useSelector((state) => state.projectReducer)
  const notificationInDatabase = useSelector(
    (state) => state.projectReducer.notifications,
  )

  const userProfile = useSelector((state) => state.firebase.profile)

  useFirestoreConnect([
    {
      collection: 'users',
      doc: userProfile.uid,
    },

    {
      collection: 'savings',
      doc: userProfile.uid,
    },
  ])

  const handleLogoutRoute = () => window.location.assign('/')
  const handleLogout = () => {
    LogoutAction(firebase, dispatch, handleLogoutRoute)
  }

  const [accessCodeInfo, setAccessCodeInfo] = useState({
    open: false,
    accessCode: '',
    isSubmitting: false,
  })
  const [accessCodeProve, setAccessCodeProve] = useState({
    open: false,
    price: '',
    isSubmitting: false,
  })

  const [accessCodeSchema, setAccessCodeSchema] = useState({
    accessCode: '',
    accessProve: '',
  })

  const handleSubmit1 = (e) => {
    e.preventDefault()
    if (accessCodeSchema.accessProve === '') {
      return
    }
    return accessCodeCheck(accessCodeSchema, setAccessCodeSchema)
  }
  const handleSubmit2 = (e) => {
    e.preventDefault()
    if (accessCodeSchema.accessCode === '') {
      return
    }

    return accessCodeProveAction(accessCodeSchema, setAccessCodeSchema)
  }

  const withdrawalCheck = () => {
    if (!userProfile.totalBalance) {
      return MySwal.fire({
        title: <p>No Balance</p>,
        text: 'No or Low balance for withdrawal',
        icon: 'error',
        showCloseButton: true,
        closeButtonText: 'Ok',
      })
    }
    if (!userProfile.accessCode) {
      return MySwal.fire({
        title: <p>No Access Code</p>,
        text: 'No access code found for withdrawal',
        icon: 'error',
        showCloseButton: true,
        closeButtonText: 'Ok',
      })
    }

    return setAccessCodeInfo({ ...accessCodeInfo, open: true })
  }

  useEffect(() => {
    var handleThemeMode = function () {
      jQuery('.dz-theme-mode').on('click', function () {
        jQuery(this).toggleClass('active')

        if (jQuery(this).hasClass('active')) {
          jQuery('body').attr('data-theme-version', 'dark')
        } else {
          jQuery('body').attr('data-theme-version', 'dark')
        }
      })
    }
    var handleDzFullScreen = function () {
      jQuery('.dz-fullscreen').on('click', function (e) {
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          /* Enter fullscreen */
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen() /* IE/Edge */
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen() /* Firefox */
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen() /* Chrome, Safari & Opera */
          }
        } else {
          /* exit fullscreen */
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen()
          }
        }
      })
    }
    handleDzFullScreen()
    return handleThemeMode()
  }, [])

  useEffect(() => {
    firebase
      .firestore()
      .collection('notifications')
      .doc(userProfile.uid ? userProfile.uid : localStorage.getItem('userId'))
      .collection('notificationDatas')
      .limit(10)
      .orderBy('date')
      .onSnapshot((qsnapshot) => {
        qsnapshot.docs.map((each) => {
          return dispatch({
            type: 'NOTIFICATION_SUCCESS',
            data: each.data(),
          })
        })
      })
  }, [])
  useEffect(() => {
    if (userProfile.accessCode === 'weekly') {
      const weeklyToken = JWT.sign(
        'weeklyJwt',
        process.env.REACT_APP_JWT_TOKEN,
        {
          expiresIn: '7d',
        },
      )
      setAccessCodeInfo({
        ...accessCodeInfo,
        accessCode: weeklyToken,
        open: false,
      })
    }
    if (userProfile.accessCode === 'monthly') {
      const monthlyToken = JWT.sign(
        'monthlyJwt',
        process.env.REACT_APP_JWT_TOKEN,
        { expiresIn: '30d' },
      )
      setAccessCodeInfo({
        ...accessCodeInfo,
        accessCode: monthlyToken,
        open: false,
      })
    }
    if (userProfile.accessCode === 'yearly') {
      const yearlyToken = JWT.sign(
        'yearlyJwt',
        process.env.REACT_APP_JWT_TOKEN,
        {
          expiresIn: '365d',
        },
      )
      setAccessCodeInfo({
        ...accessCodeInfo,
        accessCode: yearlyToken,
        open: false,
      })
    }
  }, [])

  const accessAction = (values, setValues, status) => {
    if (status === 'notVerified') {
      return new Promise((resolve, reject) => {
        setTimeout(reject('Expired or Invalid Access Code'), 2000)
      }).catch((e) => {
        dispatch({ type: 'ACCESS_ERROR', message: e })
        setValues({ ...values, accessCode: '' })
      })
    }
    if (status === 'verified') {
      return new Promise((resolve, reject) => {
        setTimeout(resolve('Access Code Success'), 2000)
      }).then((message) => {
        dispatch({ type: 'ACCESS_SUCCESS', message })
        setValues({ ...values, accessCode: '' })
        push('/user/withdrawal')
      })
    }
  }

  const accessCodeCheck = async (value, setValues) => {
    const verified = await JWT.verify(
      accessCodeInfo.accessCode,
      process.env.REACT_APP_JWT_TOKEN,
    )
    if (!verified) {
      return accessAction(value, setValues, 'notVerified')
    }
    return accessAction(value, setValues, 'verified')
  }

  const errorOptions = {
    title: <p>Access Code Error</p>,
    text: accessCodeData.accessCodeError,
    icon: 'error',
    showCloseButton: true,
    closeButtonText: 'Ok',
  }
  const successOptions = {
    title: <p>Access Success</p>,
    text: accessCodeData.accessCodeSuccess,
    icon: 'success',
    timer: 3000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }
  const accessProveSuccessOptions = {
    title: <p>Access prove</p>,
    text: accessCodeData.accessCodeProveSuccess,
    icon: 'success',
    timer: 3000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }
  const accessProveErrorOptions = {
    title: <p>Access prove Error</p>,
    text: accessCodeData.accessCodeProveError,
    icon: 'error',
    timer: 3000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }

  const accessCodeProveAction = (values, setFormData) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        accessCodeProve: values.accessProve,
      })
      .then(() => {
        setFormData({ ...values, accessCodeProve: '' })
        return dispatch({
          type: 'PROVE_SUCCESS',
          message:
            'Your access code prove has been sent successfully. Wait for less than 24hours while we verify your prove..',
        })
      })
      .catch((err) => {
        setFormData({ ...values, accessCodeProve: '' })
        return dispatch({ type: 'PROVE_ERROR', message: err })
      })
  }

  return (
    <>
      <>
        {accessCodeData.accessCodeError && MySwal.fire(errorOptions)}
        {accessCodeData.accessCodeSuccess && MySwal.fire(successOptions)}
        {accessCodeData.accessCodeProveSuccess &&
          MySwal.fire(accessProveSuccessOptions)}
        {accessCodeData.accessCodeProveError &&
          MySwal.fire(accessProveErrorOptions)}

        <Modal
          show={accessCodeInfo.open}
          centered
          onHide={() => setAccessCodeInfo({ ...accessCodeInfo, open: false })}
          backdrop="static"
        >
          <Form onSubmit={handleSubmit1}>
            <Modal.Header closeButton>
              <Modal.Title className="userTextColor">Access Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Access code is a personal withdrawal authorization code, to
                secure your withdrawal against scammers.
              </p>
              <Form.Control
                type="text"
                name="accessCode"
                required
                placeholder="Enter Access Code"
                onChange={(e) =>
                  setAccessCodeSchema({
                    ...accessCodeSchema,
                    accessCode: e.target.value,
                  })
                }
                value={accessCodeSchema.accessCode}
              />

              <h6 className="text-dark text-center py-4">Access Code Prices</h6>

              <Button
                block
                className="history-info"
                onClick={() => setAccessCodeProve({ open: true, price: '570' })}
              >
                Weekly: $570
              </Button>
              <Button
                block
                className="history-info"
                onClick={() =>
                  setAccessCodeProve({ open: true, price: '1250' })
                }
              >
                Monthly: $1250
              </Button>
              <Button
                block
                className="history-info"
                onClick={() =>
                  setAccessCodeProve({ open: true, price: '1950' })
                }
              >
                Yearly: $1950
              </Button>
              <Divider />
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={accessCodeInfo.isSubmitting}
                type="submit"
                className="history-info"
              >
                Submit
              </Button>
              <Button
                onClick={() =>
                  setAccessCodeInfo({ ...accessCodeInfo, open: false })
                }
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
      <Modal
        show={accessCodeProve.open}
        onHide={() => setAccessCodeProve({ open: false })}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="userTextColor">Access Code Prove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="userTextColor">
            Access code for ${accessCodeProve.price}
          </h4>
          <h6 className="text-dark">
            Make payment with the above btc wallet and upload Prove
          </h6>
          <div>
            <img src={img1} width="300px" alt="Code" />
            <p className="userTextColor">31keT3WdcgNwo5cThrMW9s9e4jQbGTqpTh</p>
          </div>

          <Form onSubmit={handleSubmit2}>
            <Form.Group>
              <Form.Control
                type="file"
                name="accessProve"
                required
                onChange={(e) =>
                  setAccessCodeSchema({
                    ...accessCodeSchema,
                    accessProve: e.target.files[0],
                  })
                }
              />
            </Form.Group>
            <Button
              type="submit"
              className="history-info"
              block
              disabled={accessCodeProve.isSubmitting}
            >
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="nav-header">
        <a href="/user" className="brand-logo">
          <svg
            className="logo-abbr"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="svg-logo-rect"
              width="50"
              height="50"
              rx="6"
              fill="#EB8153"
            />
            <path
              className="svg-logo-path"
              d="M17.5158 25.8619L19.8088 25.2475L14.8746 11.1774C14.5189 9.84988 15.8701 9.0998 16.8205 9.75055L33.0924 22.2055C33.7045 22.5589 33.8512 24.0717 32.6444 24.3951L30.3514 25.0095L35.2856 39.0796C35.6973 40.1334 34.4431 41.2455 33.3397 40.5064L17.0678 28.0515C16.2057 27.2477 16.5504 26.1205 17.5158 25.8619ZM18.685 14.2955L22.2224 24.6007L29.4633 22.6605L18.685 14.2955ZM31.4751 35.9615L27.8171 25.6886L20.5762 27.6288L31.4751 35.9615Z"
              fill="white"
            />
          </svg>
          <span className="brand-title text-primary">Ultimatecoins</span>
        </a>

        <div
          style={{
            fontSize: '40px',
            cursor: 'pointer',
            position: 'absolute',
            top: '5px ',
            left: '90px',
          }}
          onClick={() => setOpenSlider((prev) => !prev)}
          className="d-sm-block d-lg-none"
        >
          <Icons.MenuOutlined
            fontSize="inherit"
            className="text-primary text-xl"
          />
        </div>
      </div>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left"></div>
              <ul className="navbar-nav header-right main-notification">
                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link bell dz-theme-mode "
                    href="#"
                    style={{ display: 'block' }}
                  >
                    <i id="icon-light" className="fa fa-sun-o"></i>
                    <i id="icon-dark" className="fa fa-moon-o"></i>
                  </a>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <a className="nav-link bell dz-fullscreen" href="#">
                    <svg
                      id="icon-full"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="css-i6dzq1"
                    >
                      <path
                        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                        style={{
                          strokeDasharray: '37 57',
                          strokeDashoffset: 0,
                        }}
                      ></path>
                    </svg>
                    <svg
                      id="icon-minimize"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-minimize"
                    >
                      <path
                        d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                        style={{
                          strokeDasharray: '37 57',
                          strokeDashoffset: 0,
                        }}
                      ></path>
                    </svg>
                  </a>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link  ai-icon"
                    href="#note1"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <svg
                      className="bell-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z"
                        fill="#EB8153"
                      />
                    </svg>
                    <div className="pulse-css"></div>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right" id="note1">
                    <div
                      id="dlab_W_Notification1"
                      className="widget-media dz-scroll p-3 "
                    >
                      <ul className="timeline">
                        {notificationInDatabase &&
                          notificationInDatabase.map((each) => (
                            <li key={each.date}>
                              <div className="timeline-panel">
                                <div className="media mr-2">
                                  <svg
                                    width="50"
                                    height="50"
                                    viewBox="0 0 63 63"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="63"
                                      height="63"
                                      rx="14"
                                      fill="#71B945"
                                    />
                                    <path
                                      d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z"
                                      fill="white"
                                      stroke="white"
                                    />
                                  </svg>
                                </div>
                                <div className="media-body">
                                  <h6 className="mb-1">{each.message}</h6>
                                  <small className="d-block">
                                    {moment(each.date.toDate()).calendar()}
                                  </small>
                                </div>
                              </div>
                            </li>
                          ))}
                        {notificationInDatabase &&
                          notificationInDatabase.length === 0 && (
                            <li>
                              <div className="timeline-panel">
                                <div className="media mr-2"></div>
                                <div className="media-body">
                                  <h6 className="mb-1">No notification Yet</h6>
                                </div>
                              </div>
                            </li>
                          )}
                      </ul>
                    </div>
                    <a className="all-notification" href="/user/history">
                      See all notifications <i className="ti-arrow-right"></i>
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown notification_dropdown d-none">
                  <a className="nav-link bell bell-link" href="#">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.4605 3.84888H5.31688C4.64748 3.84961 4.00571 4.11586 3.53237 4.58919C3.05903 5.06253 2.79279 5.7043 2.79205 6.3737V18.1562C2.79279 18.8256 3.05903 19.4674 3.53237 19.9407C4.00571 20.4141 4.64748 20.6803 5.31688 20.6811C5.54005 20.6812 5.75404 20.7699 5.91184 20.9277C6.06964 21.0855 6.15836 21.2995 6.15849 21.5227V23.3168C6.15849 23.6215 6.24118 23.9204 6.39774 24.1818C6.5543 24.4431 6.77886 24.6571 7.04747 24.8009C7.31608 24.9446 7.61867 25.0128 7.92298 24.9981C8.22729 24.9834 8.52189 24.8863 8.77539 24.7173L14.6173 20.8224C14.7554 20.7299 14.918 20.6807 15.0842 20.6811H19.187C19.7383 20.68 20.2743 20.4994 20.7137 20.1664C21.1531 19.8335 21.4721 19.3664 21.6222 18.8359L24.8966 7.05011C24.9999 6.67481 25.0152 6.28074 24.9414 5.89856C24.8675 5.51637 24.7064 5.15639 24.4707 4.84663C24.235 4.53687 23.931 4.28568 23.5823 4.11263C23.2336 3.93957 22.8497 3.84931 22.4605 3.84888ZM23.2733 6.60304L20.0006 18.3847C19.95 18.5614 19.8432 18.7168 19.6964 18.8275C19.5496 18.9381 19.3708 18.9979 19.187 18.9978H15.0842C14.5856 18.9972 14.0981 19.1448 13.6837 19.4219L7.84171 23.3168V21.5227C7.84097 20.8533 7.57473 20.2115 7.10139 19.7382C6.62805 19.2648 5.98628 18.9986 5.31688 18.9978C5.09371 18.9977 4.87972 18.909 4.72192 18.7512C4.56412 18.5934 4.4754 18.3794 4.47527 18.1562V6.3737C4.4754 6.15054 4.56412 5.93655 4.72192 5.77874C4.87972 5.62094 5.09371 5.53223 5.31688 5.5321H22.4605C22.5905 5.53243 22.7188 5.56277 22.8353 5.62076C22.9517 5.67875 23.0532 5.76283 23.1318 5.86646C23.2105 5.97008 23.2642 6.09045 23.2887 6.21821C23.3132 6.34597 23.308 6.47766 23.2733 6.60304Z"
                        fill="#EB8153"
                      />
                      <path
                        d="M7.84173 11.4233H12.0498C12.273 11.4233 12.4871 11.3347 12.6449 11.1768C12.8027 11.019 12.8914 10.8049 12.8914 10.5817C12.8914 10.3585 12.8027 10.1444 12.6449 9.98661C12.4871 9.82878 12.273 9.74011 12.0498 9.74011H7.84173C7.61852 9.74011 7.40446 9.82878 7.24662 9.98661C7.08879 10.1444 7.00012 10.3585 7.00012 10.5817C7.00012 10.8049 7.08879 11.019 7.24662 11.1768C7.40446 11.3347 7.61852 11.4233 7.84173 11.4233Z"
                        fill="#EB8153"
                      />
                      <path
                        d="M15.4162 13.1066H7.84173C7.61852 13.1066 7.40446 13.1952 7.24662 13.3531C7.08879 13.5109 7.00012 13.725 7.00012 13.9482C7.00012 14.1714 7.08879 14.3855 7.24662 14.5433C7.40446 14.7011 7.61852 14.7898 7.84173 14.7898H15.4162C15.6394 14.7898 15.8535 14.7011 16.0113 14.5433C16.1692 14.3855 16.2578 14.1714 16.2578 13.9482C16.2578 13.725 16.1692 13.5109 16.0113 13.3531C15.8535 13.1952 15.6394 13.1066 15.4162 13.1066Z"
                        fill="#EB8153"
                      />
                    </svg>
                  </a>
                </li>

                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    href="#profile"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <img src={userProfile?.photo || img} width="20" alt="" />
                    <div className="header-info">
                      <span>{userProfile?.firstname}</span>
                      <small>User</small>
                    </div>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    id="profile"
                  >
                    <a href="/user/profile" className="dropdown-item ai-icon">
                      <svg
                        id="icon-user1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span className="ml-2">Profile </span>
                    </a>

                    <a
                      href="#"
                      onClick={() => LogoutAction()}
                      className="dropdown-item ai-icon"
                    >
                      <svg
                        id="icon-logout"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-danger"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span className="ml-2">Logout </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="sub-header">
            <div className="d-flex align-items-center flex-wrap mr-auto">
              <h5 className="dashboard_bar">
                <a href="/user/dashboard" className="btn btn-xs btn-primary">
                  Dashboard
                </a>
              </h5>
            </div>
            <div className="d-flex align-items-center">
              <a href="#" className="btn btn-xs btn-primary light mr-1">
                {new Date().toDateString()}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Drawer open={openSlider} onClose={() => setOpenSlider(false)}>
        <List>
          <div className="text-center " style={{ position: 'relative' }}>
            <div className="main-profile">
              <div className="image-bx">
                <img
                  src={userProfile?.photo || img}
                  alt="profile"
                  width="100px"
                  className="rounded"
                />
                <a href="user/profile">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </a>
              </div>

              <div
                className="nav-control"
                style={{ right: 0, top: 20, position: 'absolute' }}
                onClick={() => setOpenSlider(false)}
              >
                <div className="hamburger">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
              </div>
              <h5 className="name">
                <span className="font-w400">Hello,</span>{' '}
                {userProfile?.firstname || 'John Doe'}
              </h5>
              <p className="email">
                {userProfile?.email || 'marquezzzz@mail.com'}
              </p>
              <p className="email">${userProfile?.totalBalance || '0000'}</p>
            </div>
          </div>
          <Divider />
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
          </ul>
          <ListItem
            button
            component="a"
            href="/user/dashboard"
            className="side-bar-item"
          >
            <ListItemIcon>
              <Icons.Home className="text-new" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/user/investments"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Money className="text-new" />
            </ListItemIcon>
            <ListItemText>Investments</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/user/payments"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Payment className="text-new" />
            </ListItemIcon>
            <ListItemText>Payments</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="#"
            onClick={withdrawalCheck}
            className="side-bar-item"
          >
            <ListItemIcon>
              <Icons.Assessment className="text-new" />
            </ListItemIcon>
            <ListItemText>Withdrawals</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/user/history"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Notifications className="text-new" />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/user/savings"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Storage className="text-new" />
            </ListItemIcon>
            <ListItemText>Savings</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/user/chats"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Chat className="text-new" />
            </ListItemIcon>
            <ListItemText>Chat</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <ListItem
            button
            component="a"
            href="#"
            onClick={handleLogout}
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.ExitToAppOutlined className="text-new" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
            <ListItemIcon>
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
        </List>

        <List>
          <div className="copyright">
            <p>
              <strong>Ultimatecoins Dashboard</strong> ©{' '}
              {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="fs-12">
              Make the <span className="heart"></span> best out of your little
            </p>
          </div>
        </List>
      </Drawer>

      <div className="deznav">
        <div className="deznav-scroll">
          <div className="main-profile">
            <div className="image-bx">
              <img src={userProfile?.photo || img} alt="profile" />
              <a href="user/profile">
                <i className="fa fa-cog" aria-hidden="true"></i>
              </a>
            </div>

            <h5 className="name">
              <span className="font-w400">Hello,</span>{' '}
              {userProfile?.firstname || 'John Doe'}
            </h5>
            <p className="email">
              {userProfile?.email || 'marquezzzz@mail.com'}
            </p>
            <p className="email">${userProfile?.totalBalance || '0000'}</p>
          </div>
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="/user"
                aria-expanded="false"
              >
                <Icons.Home />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="/user/profile"
                aria-expanded="false"
              >
                <Icons.AccountBox />
                <span className="nav-text">Profile</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="/user/payments"
                aria-expanded="false"
              >
                <Icons.Payment />
                <span className="nav-text">Payment</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="/user/investments"
                aria-expanded="false"
              >
                <Icons.Money />
                <span className="nav-text">Investment</span>
              </a>
            </li>

            <li>
              <Link
                className="has-arrow ai-icon"
                to="#"
                onClick={withdrawalCheck}
                aria-expanded="false"
              >
                <Icons.Assessment />
                <span className="nav-text">withdrawal</span>
              </Link>
            </li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="user/savings"
                aria-expanded="false"
              >
                <Icons.Storage />
                <span className="nav-text">Saving</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow ai-icon"
                href="/user/chats"
                aria-expanded="false"
              >
                <Icons.Chat />
                <span className="nav-text">Chat</span>
              </a>
            </li>

            <li className="mt-5">
              <Link
                className="has-arrow ai-icon"
                to="#"
                aria-expanded="false"
                onClick={handleLogout}
              >
                <Icons.ExitToAppOutlined />
                <span className="nav-text">LogOut</span>
              </Link>
            </li>
          </ul>
          <div className="copyright">
            <p>
              <strong>Ultimatecoins Dashboard</strong> ©{' '}
              {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="fs-12">
              Make the <span className="heart"></span> best out of your little
            </p>
          </div>
        </div>
      </div>

      <div className="chatbox">
        <div className="chatbox-close"></div>
        <div className="custom-tab-1">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#chat">
                Chat
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="chat"
              role="tabpanel"
            >
              <div className="card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box">
                <div className="card-header chat-list-header text-center">
                  <a href="/user/chats">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns={{ xlink: 'http://www.w3.org/1999/xlink' }}
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect
                          fill="#000000"
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                      </g>
                    </svg>
                  </a>
                  <div>
                    <h6 className="mb-1">Chat List</h6>
                  </div>
                </div>
                <div
                  className="card-body contacts_body p-0 dz-scroll  "
                  id="DZ_W_Contacts_Body"
                  style={{ overflowY: 'auto' }}
                >
                  <ul className="contacts">
                    <li className="name-first-letter">1</li>
                    <li className="active dz-chat-user">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="images/avatar/1.jpg"
                            className="rounded-circle user_img"
                            alt=""
                          />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>Archie Parker</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card chat dz-chat-history-box d-none">
                <div className="card-header chat-list-header text-center">
                  <a href="#" className="dz-chat-history-back">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns={{ xlink: 'http://www.w3.org/1999/xlink' }}
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                          x="14"
                          y="7"
                          width="2"
                          height="10"
                          rx="1"
                        />
                        <path
                          d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                        />
                      </g>
                    </svg>
                  </a>
                  <div>
                    <h6 className="mb-1">Chat with Khelesh</h6>
                    <p className="mb-0 text-success">Online</p>
                  </div>
                  <div className="dropdown">
                    <a href="#" data-toggle="dropdown" aria-expanded="false">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns={{ xlink: 'http://www.w3.org/1999/xlink' }}
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle fill="#000000" cx="5" cy="12" r="2" />
                          <circle fill="#000000" cx="12" cy="12" r="2" />
                          <circle fill="#000000" cx="19" cy="12" r="2" />
                        </g>
                      </svg>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li className="dropdown-item">
                        <i className="fa fa-user-circle text-primary mr-2"></i>{' '}
                        View profile
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="card-body msg_card_body dz-scroll"
                  id="DZ_W_Contacts_Body3"
                >
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Hi, how are you samim?
                      <span className="msg_time">8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Hi Khalid i am good tnx how about you?
                      <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am good too, thank you for your chat template
                      <span className="msg_time">9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      You are welcome
                      <span className="msg_time_send">9:05 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am looking for your next templates
                      <span className="msg_time">9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Ok, thank you have a good day
                      <span className="msg_time_send">9:10 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Bye, see you
                      <span className="msg_time">9:12 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Hi, how are you samim?
                      <span className="msg_time">8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Hi Khalid i am good tnx how about you?
                      <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am good too, thank you for your chat template
                      <span className="msg_time">9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      You are welcome
                      <span className="msg_time_send">9:05 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am looking for your next templates
                      <span className="msg_time">9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Ok, thank you have a good day
                      <span className="msg_time_send">9:10 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Bye, see you
                      <span className="msg_time">9:12 AM, Today</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer type_msg">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      placeholder="Type your message..."
                    ></textarea>
                    <div className="input-group-append">
                      <button type="button" className="btn btn-primary">
                        <i className="fa fa-location-arrow"></i>
                      </button>
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

export default UserNav1
