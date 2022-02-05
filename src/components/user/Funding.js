import React, { useEffect, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import * as Icons from '@material-ui/icons'

import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'

import UserNav1 from './UserNav1'
import { fundingAction } from '../Auths/Action'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import img1 from '../../assets/qrcode.jpg'
import img from '../../assets/avater.png'
import axios from 'axios'
import moment from 'moment'
import Compressor from 'compressorjs'
import Ufooter from './Ufooter'

const MySwal = withReactContent(Swal)

function Funding() {
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const { push } = useHistory()
  const userData = useSelector((state) => state.firebase.profile)

  useFirestoreConnect({
    collection: 'savings',
    doc: userData.uid || localStorage.getItem('userId'),
  })

  const { fundingData, savingWithdrawalData } = useSelector(
    (state) => state.projectReducer,
  )
  const dataHistory = useSelector((state) => state.projectReducer)
  const reducerData = useSelector((state) => state.projectReducer)
  const savings = useSelector((state) => state.firestore.ordered.savings)

  const KEY = '18704fddee12def29f6ce4cc2ae8b8247c6612b36e716e47e54f315152bfa806'

  const [emptyBal, setEmptyBal] = useState(false)
  const savingsData = savings && savings.map((each) => each)

  useEffect(() => {
    firebase
      .firestore()
      .collection('savings')
      .doc(userData.uid ? userData.uid : localStorage.getItem('userId'))
      .collection('savingWithdrawals')
      .limit(8)
      .orderBy('date')
      .onSnapshot((qsnapshot) => {
        qsnapshot.docs.map((each) => {
          return dispatch({
            type: 'SAVING_WITHDRAWAL_DATA',
            data: each.data(),
          })
        })
      })
  }, [])
  useEffect(() => {
    firebase
      .firestore()
      .collection('savings')
      .doc(userData.uid ? userData.uid : localStorage.getItem('userId'))
      .collection('savingsFundings')
      .orderBy('date')
      .limit(8)
      .onSnapshot((qsnapshot) => {
        qsnapshot.docs.map((each) =>
          dispatch({
            type: 'FUNDING_DATA',
            data: each.data(),
          }),
        )
      })
  }, [])

  const sumTotal =
    Number(savingsData && savingsData[0].initialAmount) +
    Number(savingsData && savingsData[0].profit)

  const [openPWC, setOpenPWC] = useState(false)

  //const janData = savingsData.reduce((acc, {date}, idx) => {
  //    const month = new Date(date).getMonth()
  //
  //    const each
  //
  //}, 0)

  const [PWC, setPWC] = useState({
    isSubmitting: false,
    value: savingsData ? savingsData[0].personalWithdrawalCode : '',
  })
  const [investInfo, setInvestInfo] = useState({
    amount: '',
    prove: '',
    method: '',
    isSubmitting: false,
  })

  const pwcAction = (e) => {
    e.preventDefault()
    setPWC({ ...PWC, isSubmitting: true })
    return new Promise((resolve, reject) => {
      if (savingsData && savingsData[0].personalWithdrawalCode !== PWC.value) {
        return setTimeout(reject('Invalid Personal Withdrawal Code'), 2000)
      } else {
        return setTimeout(resolve('Personal Withdrawal Code Success'), 2000)
      }
    })
      .then((e) => {
        dispatch({ type: 'PWC_SUCCESS', message: e, openSuccess: true })
        return setPWC({ ...PWC, isSubmitting: false })
      })
      .catch((e) => {
        dispatch({ type: 'PWC_ERROR', message: e, openError: true })
        return setPWC({ ...PWC, isSubmitting: false })
      })
  }
  const emptyOptions = {
    title: <p>Required</p>,
    text: 'Please all inputs are required',
    icon: 'info',
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const errorOptions = {
    title: <p>Personal Withdrawal Error</p>,
    text: reducerData.pwcError,
    icon: 'error',
    showCloseButton: true,
    color: 'orange',
    closeButtonText: 'OK',
  }
  const successOptions = {
    title: <p>Personal Withdrawal Success</p>,
    html: <span className="text-success">{reducerData.pwcSuccess}</span>,
    icon: 'success',

    showCloseButton: true,

    closeButtonText: 'OK',
  }
  const fundingProveOptions = {
    title: <p>Funding Success</p>,
    html: (
      <span className="text-success">{reducerData.fundingProveSuccess}</span>
    ),
    icon: 'success',

    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const fireEmpty = () => {
    return setEmptyBal(true)
  }
  if (emptyBal) {
    MySwal.fire({
      title: <p>No Balance</p>,
      text: 'No or Low balance for withdrawal',
      icon: 'error',
      color: 'orange',
      showCloseButton: true,
      closeButtonText: 'Ok',
    }).then(() => {
      setEmptyBal(false)
    })
  }

  if (reducerData.openError) {
    MySwal.fire(errorOptions).then(() => {
      dispatch({ type: 'PWC_ERROR', openError: false })
    })
  }
  if (reducerData.openSuccess) {
    MySwal.fire(successOptions).then(() => {
      dispatch({ type: 'PWC_SUCCESS', openSuccess: false })
      window.location.assign('/savings/withdrawals')
    })
  }
  if (reducerData.openFundingSuccess) {
    MySwal.fire(fundingProveOptions).then(() => {
      dispatch({ type: 'FUNDING_SUCCESS', open: false })
    })
  }

  const handleSubmitInvest = (e) => {
    e.preventDefault()
    setInvestInfo({ ...investInfo, isSubmitting: true })
    if (
      investInfo.amount === '' ||
      investInfo.prove === '' ||
      investInfo.method === ''
    ) {
      setInvestInfo({ ...investInfo, isSubmitting: false })
      return MySwal.fire(emptyOptions)
    }
    return fundingAction(
      firebase,
      dispatch,
      investInfo,
      setInvestInfo,
      userData.firstname,
    )
  }

  const [balanceInCrypto, setBalanceInCryto] = useState({
    btc: '0000',
    eth: '0000',
    ltc: '0000',
    mov: '0000',
  })

  const initialDCheck = () => {
    const initialNumber = Number(savingsData && savingsData[0]?.total)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }

  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=BTC,ETH,ZEC,LTC,USD,${KEY}`,
      )
      .then((res) => {
        const { BTC, ETH, ZEC, LTC } = res.data
        const { total } = savingsData[0]
        const btc = Number(total ? total : '0') * BTC
        const eth = Number(total ? total : '0') * ETH
        const ltc = Number(total ? total : '0') * LTC
        const mov = Number(total ? total : '0') * ZEC
        setBalanceInCryto({
          ...balanceInCrypto,
          btc,
          mov,
          eth,
          ltc,
        })
      })

      .catch((err) => {})
  }, [savingsData && savingsData[0]?.total])

  const savingsDCheck = () => {
    const initialNumber = Number(savingsData && savingsData[0]?.total)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber < 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }
  const totalDCheck = () => {
    const initialNumber = Number(savingsData && savingsData[0].total)
    if (initialNumber === 200) {
      return 10
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70
    }
    if (initialNumber >= 1000) {
      return 100
    }
    return 0
  }

  const handleCompressor = (img) => {
    new Compressor(img, {
      quality: 0.8,
      success: (file) => setInvestInfo({ ...investInfo, prove: file }),
    })
  }

  if (dataHistory.withdrawalAccessPopUp) {
    MySwal.fire({
      title: <p>No Balance Or Access</p>,
      text: 'No Access or Low balance for withdrawal',
      icon: 'error',
      showCloseButton: true,
      closeButtonText: 'Ok',
    })
  }

  return (
    <div className="main-wrapper">
      <UserNav1 />
      <div className="content-body" style={{ minHeight: '780px' }}>
        <div className="container-fluid">
          <div className="form-head mb-sm-5 mb-3 d-flex flex-wrap align-items-center">
            <h2 className="font-w600 title mb-2 mr-auto text-primary">
              SDashboard
            </h2>
          </div>
          <div className="row">
            <div className="col-xl-9 col-xxl-8">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h4 className="mb-0 fs-20 text-black">crypto</h4>
                    </div>
                    <div className="card-body">
                      <div className="bg-success coin-holding flex-wrap">
                        <div className="mb-2 coin-bx">
                          <div className="d-flex align-items-center">
                            <div>
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.5437 0.00501883C13.9681 -0.294993 0.305031 12.893 0.00501883 29.4562C-0.294993 46.0194 12.893 59.6949 29.4562 59.9949C46.0194 60.2949 59.6949 47.1069 59.9949 30.5312C60.2949 13.9681 47.1069 0.29253 30.5437 0.00501883ZM29.5562 54.3697C16.1182 54.1197 5.38023 42.9942 5.63024 29.5562C5.86775 16.1182 16.9932 5.38023 30.4312 5.61774C43.8818 5.86775 54.6072 16.9932 54.3697 30.4312C54.1322 43.8693 42.9942 54.6072 29.5562 54.3697Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M30.3962 8.12284C18.3333 7.91034 8.34535 17.5482 8.13284 29.6112C7.90784 41.6617 17.5457 51.6496 29.6087 51.8746C41.6717 52.0871 51.6596 42.4492 51.8721 30.3987C52.0846 18.3358 42.4592 8.34785 30.3962 8.12284ZM30.0025 14.3581L36.954 26.7598L30.61 23.2297C30.2312 23.0197 29.7725 23.0197 29.3937 23.2297L23.0497 26.7598L30.0025 14.3581ZM30.0025 45.6381L23.0497 33.2364L29.3937 36.7665C29.5825 36.8715 29.7925 36.924 30.0012 36.924C30.21 36.924 30.42 36.8715 30.6087 36.7665L36.9528 33.2364L30.0025 45.6381ZM30.0025 34.2426L22.3722 29.9975L30.0025 25.7523L37.6315 29.9975L30.0025 34.2426Z"
                                  fill="white"
                                ></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="coin-font font-w600 mb-0 text-white">
                                Ethereum
                              </h4>
                              <p className="mb-0 text-white op-6">ETH</p>
                              <h5 className="coin-font font-w600 mb-0 text-white">
                                {balanceInCrypto.eth.toString().slice(0, 10)}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            <div className="coin-bx-one">
                              <svg
                                width="33"
                                height="35"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="4.71425"
                                  height="34.5712"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 33 0)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="25.1427"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 23.5713 9.42853)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="10.9999"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 14.1436 23.5713)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="5.31864"
                                  height="21.2746"
                                  rx="2.65932"
                                  transform="matrix(-1 0 0 1 5.31836 13.2966)"
                                  fill="white"
                                ></rect>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h2 className="mb-0 text-white coin-font-1">
                                $
                                {(savingsData && savingsData[0].total) ||
                                  '0000'}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            {totalDCheck() >= 50 ? (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d2)">
                                  <path
                                    d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4"
                                    stroke="#2BC155"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d2"
                                    x="-3.05176e-05"
                                    y="-6.10352e-05"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            ) : (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d4)">
                                  <path
                                    d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16"
                                    stroke="#FF2E2E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d4"
                                    x="-3.05176e-05"
                                    y="0"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            )}
                            <p
                              className={`${
                                totalDCheck() >= 50
                                  ? 'text-success'
                                  : 'text-danger'
                              } mb-0 ml-2 mr-1`}
                            >
                              {initialDCheck()}%
                            </p>
                            <p className="mb-0 ml-2 font-w400 text-white">
                              This Week
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary coin-holding mt-4 flex-wrap">
                        <div className="mb-2 coin-bx">
                          <div className="d-flex align-items-center">
                            <div>
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.5437 0.00501883C13.9681 -0.294993 0.305031 12.893 0.00501883 29.4562C-0.294993 46.0194 12.893 59.6949 29.4562 59.9949C46.0194 60.2949 59.6949 47.1069 59.9949 30.5312C60.2949 13.9681 47.1069 0.29253 30.5437 0.00501883ZM29.5562 54.3697C16.1182 54.1197 5.38023 42.9942 5.63024 29.5562C5.86775 16.1182 16.9932 5.38023 30.4312 5.61774C43.8818 5.86775 54.6072 16.9932 54.3697 30.4312C54.1322 43.8693 42.9942 54.6072 29.5562 54.3697Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M30.3962 8.12284C18.3333 7.91034 8.34535 17.5482 8.13284 29.6112C7.90784 41.6617 17.5457 51.6496 29.6087 51.8746C41.6717 52.0871 51.6596 42.4492 51.8721 30.3987C52.0846 18.3358 42.4592 8.34785 30.3962 8.12284ZM39.4091 42.6992H19.5083L21.9459 29.2112L19.1208 29.7987V27.4986L22.3709 26.8111L24.4835 15.2106H32.4213L30.6212 25.086L33.3964 24.4985V26.7986L30.1962 27.4611L28.3462 37.6615H40.8842L39.4091 42.6992Z"
                                  fill="white"
                                ></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="coin-font font-w600 mb-0 text-white">
                                LiteCoin
                              </h4>
                              <p className="mb-0 text-white">LTC</p>
                              <h5 className="coin-font font-w600 mb-0 text-white">
                                ${balanceInCrypto.ltc.toString().slice(0, 9)}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            <div className="coin-bx-one">
                              <svg
                                width="33"
                                height="35"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="4.71425"
                                  height="34.5712"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 33 0)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="25.1427"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 23.5713 9.42853)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="10.9999"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 14.1436 23.5713)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="5.31864"
                                  height="21.2746"
                                  rx="2.65932"
                                  transform="matrix(-1 0 0 1 5.31836 13.2966)"
                                  fill="white"
                                ></rect>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h2 className="mb-0 text-white coin-font-1">
                                $
                                {(savingsData && savingsData[0].total) ||
                                  '0000'}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            {totalDCheck() >= 50 ? (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d2)">
                                  <path
                                    d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4"
                                    stroke="#2BC155"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d2"
                                    x="-3.05176e-05"
                                    y="-6.10352e-05"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            ) : (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d4)">
                                  <path
                                    d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16"
                                    stroke="#FF2E2E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d4"
                                    x="-3.05176e-05"
                                    y="0"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            )}
                            <p
                              className={`${
                                totalDCheck() >= 50
                                  ? 'text-success'
                                  : 'text-danger'
                              } mb-0 ml-2 mr-1`}
                            >
                              {initialDCheck()}%
                            </p>
                            <p className="mb-0 ml-2 font-w400 text-white">
                              This Week
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-warning coin-holding mt-4 flex-wrap">
                        <div className="mb-2 coin-bx">
                          <div className="d-flex align-items-center">
                            <div>
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30 0C13.4312 0 0 13.4312 0 30C0 46.5688 13.4312 60 30 60C46.5688 60 60 46.5688 60 30C60 13.4312 46.5688 0 30 0ZM30 54.375C16.5587 54.375 5.625 43.44 5.625 30C5.625 16.56 16.5587 5.625 30 5.625C43.4413 5.625 54.375 16.5587 54.375 30C54.375 43.4413 43.44 54.375 30 54.375Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M31.5488 30.9737H27.61V36.825H31.5488C32.3438 36.825 33.0813 36.5025 33.5988 35.9612C34.14 35.4425 34.4625 34.7062 34.4625 33.8875C34.4638 32.2862 33.15 30.9737 31.5488 30.9737Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M30 8.12496C17.9375 8.12496 8.125 17.9375 8.125 30C8.125 42.0625 17.9375 51.875 30 51.875C42.0625 51.875 51.875 42.0612 51.875 30C51.875 17.9387 42.0612 8.12496 30 8.12496ZM34.4512 40.13H31.8712V44.185H29.165V40.13H27.6787V44.185H24.96V40.13H20.18V37.585H22.8175V22.335H20.18V19.79H24.96V15.8162H27.6787V19.79H29.165V15.8162H31.8712V19.79H34.2212C35.5337 19.79 36.7437 20.3312 37.6075 21.195C38.4712 22.0587 39.0125 23.2687 39.0125 24.5812C39.0125 27.15 36.985 29.2462 34.4512 29.3612C37.4225 29.3612 39.8187 31.78 39.8187 34.7512C39.8187 37.7112 37.4237 40.13 34.4512 40.13Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M33.2888 27.38C33.7613 26.9075 34.0488 26.2737 34.0488 25.56C34.0488 24.1437 32.8975 22.9912 31.48 22.9912H27.61V28.14H31.48C32.1825 28.14 32.8275 27.84 33.2888 27.38Z"
                                  fill="white"
                                ></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="coin-font font-w600 mb-0 text-white">
                                BitCoin
                              </h4>
                              <p className="mb-0 text-white">BTH</p>
                              <h5 className="coin-font font-w600 mb-0 text-white">
                                {balanceInCrypto.btc.toString().slice(0, 9)}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            <div className="coin-bx-one">
                              <svg
                                width="33"
                                height="35"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="4.71425"
                                  height="34.5712"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 33 0)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="25.1427"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 23.5713 9.42853)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="10.9999"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 14.1436 23.5713)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="5.31864"
                                  height="21.2746"
                                  rx="2.65932"
                                  transform="matrix(-1 0 0 1 5.31836 13.2966)"
                                  fill="white"
                                ></rect>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h2 className="mb-0 text-white coin-font-1">
                                $
                                {(savingsData && savingsData[0].total) ||
                                  '0000'}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            {totalDCheck() >= 50 ? (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d2)">
                                  <path
                                    d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4"
                                    stroke="#2BC155"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d2"
                                    x="-3.05176e-05"
                                    y="-6.10352e-05"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            ) : (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d4)">
                                  <path
                                    d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16"
                                    stroke="#FF2E2E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d4"
                                    x="-3.05176e-05"
                                    y="0"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            )}
                            <p
                              className={`${
                                totalDCheck() >= 50
                                  ? 'text-success'
                                  : 'text-danger'
                              } mb-0 ml-2 mr-1`}
                            >
                              {initialDCheck()}%
                            </p>
                            <p className="mb-0 ml-2 font-w400 text-white">
                              This Week
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary coin-holding mt-4 flex-wrap">
                        <div className="mb-2 coin-bx">
                          <div className="d-flex align-items-center">
                            <div>
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.5438 0.00501884C13.9681 -0.294993 0.305031 12.893 0.00501884 29.4562C-0.294993 46.0194 12.893 59.695 29.4562 59.995C46.0194 60.295 59.695 47.107 59.995 30.5313C60.295 13.9681 47.107 0.292531 30.5438 0.00501884ZM29.5562 54.3698C16.1182 54.1197 5.38024 42.9943 5.63025 29.5562C5.86776 16.1182 16.9932 5.38024 30.4313 5.61775C43.8818 5.86776 54.6073 16.9932 54.3698 30.4313C54.1322 43.8693 42.9943 54.6073 29.5562 54.3698Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M30.3938 8.11785C18.3308 7.90534 8.34286 17.5432 8.13035 29.6062C8.0591 33.4014 8.97039 36.9903 10.623 40.1354H17.4995V18.602C17.4995 17.2857 19.2883 16.867 19.8696 18.0483L30 38.5629L40.1304 18.0495C40.7117 16.867 42.5005 17.2857 42.5005 18.602V40.1354H49.3558C50.8934 37.2128 51.8084 33.9127 51.8696 30.3938C52.0822 18.3308 42.4568 8.34286 30.3938 8.11785Z"
                                  fill="white"
                                ></path>
                                <path
                                  d="M40.0004 41.3855V23.9573L31.12 41.9392C30.7 42.793 29.2987 42.793 28.8787 41.9392L19.9996 23.9573V41.3855C19.9996 42.0755 19.4408 42.6355 18.7495 42.6355H12.1855C16.0744 48.0995 22.3972 51.7346 29.6062 51.8696C37.1028 52.0022 43.7931 48.327 47.8395 42.6355H41.2505C40.5592 42.6355 40.0004 42.0755 40.0004 41.3855Z"
                                  fill="white"
                                ></path>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h4 className="coin-font font-w600 mb-0 text-white">
                                Monero
                              </h4>
                              <p className="mb-0 text-white">XMR</p>
                              <h5 className="coin-font font-w600 mb-0 text-white">
                                {balanceInCrypto.mov.toString().slice(0, 9)}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            <div className="coin-bx-one">
                              <svg
                                width="33"
                                height="35"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="4.71425"
                                  height="34.5712"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 33 0)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="25.1427"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 23.5713 9.42853)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="4.71425"
                                  height="10.9999"
                                  rx="2.35713"
                                  transform="matrix(-1 0 0 1 14.1436 23.5713)"
                                  fill="white"
                                ></rect>
                                <rect
                                  width="5.31864"
                                  height="21.2746"
                                  rx="2.65932"
                                  transform="matrix(-1 0 0 1 5.31836 13.2966)"
                                  fill="white"
                                ></rect>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h2 className="mb-0 text-white coin-font-1">
                                $
                                {(savingsData && savingsData[0]?.total) ||
                                  '0000'}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            {totalDCheck() >= 50 ? (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d2)">
                                  <path
                                    d="M5 16C5.91797 14.9157 8.89728 11.7277 10.5 10L16.5 13L23.5 4"
                                    stroke="#2BC155"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d2"
                                    x="-3.05176e-05"
                                    y="-6.10352e-05"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0.172549 0 0 0 0 0.72549 0 0 0 0 0.337255 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            ) : (
                              <svg
                                width="29"
                                height="22"
                                viewBox="0 0 29 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g filter="url(#filter0_d4)">
                                  <path
                                    d="M5 4C5.91797 5.08433 8.89728 8.27228 10.5 10L16.5 7L23.5 16"
                                    stroke="#FF2E2E"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d4"
                                    x="-3.05176e-05"
                                    y="0"
                                    width="28.5001"
                                    height="22.0001"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    />
                                    <feOffset dy="1" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 1 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.61 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow"
                                      result="shape"
                                    />
                                  </filter>
                                </defs>
                              </svg>
                            )}
                            <p
                              className={`${
                                totalDCheck() >= 50
                                  ? 'text-success'
                                  : 'text-danger'
                              } mb-0 ml-2 mr-1`}
                            >
                              {initialDCheck()}%
                            </p>
                            <p className="mb-0 ml-2 font-w400 text-white">
                              This Week
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-xxl-12">
                  <div className="card">
                    <div className="card-header pb-2 d-block d-sm-flex flex-wrap border-0">
                      <div className="mb-3">
                        <h4 className="fs-20 text-black">My Activity</h4>
                        <p className="mb-0 fs-13">
                          View All Saving Account Activities
                        </p>
                      </div>
                      <div className="card-action card-tabs mb-3 style-1">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#monthly"
                            >
                              Savings
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#Weekly"
                            >
                              Withdrawals
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body tab-content p-0">
                      <div className="tab-pane active show fade" id="monthly">
                        <div className="table-responsive">
                          <table className="table shadow-hover card-table border-no tbl-btn short-one">
                            <tbody>
                              {fundingData &&
                                fundingData.map((each) => (
                                  <tr key={each.date}>
                                    <td>
                                      <span>
                                        {each.statusSuccess && (
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
                                        )}
                                        {each.statusPending && (
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
                                              fill="#747474"
                                            />
                                            <path
                                              d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                              fill="white"
                                              stroke="white"
                                            />
                                          </svg>
                                        )}
                                        {each.statusFailed && (
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
                                              fill="#FF5757"
                                            />
                                            <path
                                              d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                              fill="white"
                                              stroke="white"
                                            />
                                          </svg>
                                        )}
                                      </span>
                                    </td>
                                    <td className="wspace-no">
                                      {each.paymentMethod == 'Bitcoin' && (
                                        <svg
                                          className="mr-2"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z"
                                            fill="#FFAB2D"
                                          />
                                          <path
                                            d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z"
                                            fill="#FFAB2D"
                                          />
                                          <path
                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z"
                                            fill="#FFAB2D"
                                          />
                                        </svg>
                                      )}
                                      {each.paymentMethod == 'Litecoin' ||
                                        'litcoins' ||
                                        ('litcoin' && (
                                          <svg
                                            className="mr-1"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z"
                                              fill="#5F5F5F"
                                            />
                                          </svg>
                                        ))}
                                      {each.paymentMethod == 'Ethereum' && (
                                        <svg
                                          className="mr-1"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M12.3182 13.6531C12.1139 13.7348 11.8863 13.7348 11.682 13.6531L9.48944 12.7761L12.0001 17.7974L14.5107 12.7761L12.3182 13.6531Z"
                                            fill="#DC3CCC"
                                          />
                                          <path
                                            d="M12.0001 11.9341L15.0156 10.7279L12.0001 5.90308L8.98456 10.7279L12.0001 11.9341Z"
                                            fill="#DC3CCC"
                                          />
                                          <path
                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z"
                                            fill="#DC3CCC"
                                          />
                                        </svg>
                                      )}
                                      {each.paymentMethod == 'Bank' && (
                                        <Icons.Money />
                                      )}
                                      <span className="font-w600 text-black">
                                        {each.paymentMethod}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-black">
                                        {moment(each.date.toDate()).calendar()}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="font-w600 text-black">
                                        ${each.paymentAmount}
                                      </span>
                                    </td>
                                    <td>
                                      {each.statusSuccess && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Completed
                                        </a>
                                      )}

                                      {each.statusFailed && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Failed
                                        </a>
                                      )}
                                      {each.statusPending && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Failed
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              {fundingData.length === 0 && (
                                <tr className="text-center text-warning row-span-4">
                                  <td colSpan={6}>No Transaction Yet</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="Weekly">
                        <div className="table-responsive">
                          <table className="table shadow-hover card-table border-no tbl-btn short-one">
                            <tbody>
                              {savingWithdrawalData &&
                                savingWithdrawalData.map((each) => (
                                  <tr key={each.date}>
                                    <td>
                                      <span>
                                        {each.statusSuccess && (
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
                                        )}
                                        {each.statusPending && (
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
                                              fill="#747474"
                                            />
                                            <path
                                              d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                              fill="white"
                                              stroke="white"
                                            />
                                          </svg>
                                        )}
                                        {each.statusFailed && (
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
                                              fill="#FF5757"
                                            />
                                            <path
                                              d="M22.1318 30.9043L22.1318 30.9043L22.1151 23.9961C22.1151 23.9922 22.1151 23.9887 22.1152 23.9854M22.1318 30.9043L22.6152 23.9909L22.1152 23.99C22.1152 23.9769 22.1157 23.9667 22.116 23.9623L22.1161 23.9608C22.1159 23.9641 22.1154 23.973 22.1152 23.9843C22.1152 23.9847 22.1152 23.985 22.1152 23.9854M22.1318 30.9043C22.1338 31.6982 22.7788 32.3403 23.5728 32.3384C24.3667 32.3365 25.0088 31.6914 25.0069 30.8975L25.0069 30.8975L24.9986 27.4687M22.1318 30.9043L24.9986 27.4687M22.1152 23.9854C22.1176 23.1968 22.7574 22.5545 23.5488 22.5524C23.5504 22.5524 23.5522 22.5523 23.554 22.5523L23.5561 22.5523L23.5732 22.5524L30.4671 22.569L30.4658 23.069L30.4671 22.569C31.2608 22.571 31.903 23.2159 31.9011 24.01C31.8992 24.8039 31.2541 25.446 30.4602 25.4441L30.4602 25.4441L27.0315 25.4358L40.2141 38.6184C40.7755 39.1798 40.7755 40.0899 40.2141 40.6513C39.6527 41.2127 38.7426 41.2127 38.1812 40.6513L24.9986 27.4687M22.1152 23.9854C22.1152 23.9874 22.1152 23.9894 22.1152 23.9914L24.9986 27.4687M23.5541 22.5524C23.5547 22.5524 23.5554 22.5524 23.5561 22.5524L23.5541 22.5524Z"
                                              fill="white"
                                              stroke="white"
                                            />
                                          </svg>
                                        )}
                                      </span>
                                    </td>
                                    <td className="wspace-no">
                                      {each.paymentMethod == 'Bitcoin' && (
                                        <svg
                                          className="mr-2"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M16 9.50011C15.9992 8.67201 15.216 8.00092 14.2501 8H9V11H14.2501C15.216 10.9993 15.9992 10.328 16 9.50011Z"
                                            fill="#FFAB2D"
                                          />
                                          <path
                                            d="M9 16H14.2501C15.2165 16 16 15.3285 16 14.5001C16 13.6715 15.2165 13 14.2501 13H9V16Z"
                                            fill="#FFAB2D"
                                          />
                                          <path
                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM18.0001 14.5713C17.9978 16.4641 16.4641 17.9978 14.5716 17.9999V18.8571C14.5716 19.3305 14.1876 19.7143 13.7144 19.7143C13.2409 19.7143 12.8572 19.3305 12.8572 18.8571V17.9999H11.1431V18.8571C11.1431 19.3305 10.7591 19.7143 10.2859 19.7143C9.8124 19.7143 9.42866 19.3305 9.42866 18.8571V17.9999H6.85733C6.38387 17.9999 6.00013 17.6161 6.00013 17.1429C6.00013 16.6695 6.38387 16.2857 6.85733 16.2857H7.71427V7.71427H6.85733C6.38387 7.71427 6.00013 7.33053 6.00013 6.85707C6.00013 6.38361 6.38387 5.99987 6.85733 5.99987H9.42866V5.14293C9.42866 4.66947 9.8124 4.28573 10.2859 4.28573C10.7593 4.28573 11.1431 4.66947 11.1431 5.14293V5.99987H12.8572V5.14293C12.8572 4.66947 13.2409 4.28573 13.7144 4.28573C14.1879 4.28573 14.5716 4.66947 14.5716 5.14293V5.99987C16.4571 5.99202 17.992 7.5139 18.0001 9.39937C18.0043 10.3978 17.5714 11.3481 16.8152 12C17.5643 12.6445 17.9967 13.5828 18.0001 14.5713Z"
                                            fill="#FFAB2D"
                                          />
                                        </svg>
                                      )}
                                      {each.paymentMethod == 'Paypal' && (
                                        <svg
                                          className="mr-1"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9924 5.37574 18.6243 0.00758581 12 0ZM16.2857 18.0001H9.42866C8.9552 18.0001 8.57147 17.6164 8.57147 17.1429C8.57147 17.1024 8.57434 17.0618 8.5801 17.0216L9.22515 12.5054L7.92222 12.8313C7.85421 12.8486 7.78437 12.8572 7.71427 12.8572C7.24081 12.8567 6.85759 12.4727 6.85785 11.9992C6.85838 11.6063 7.12571 11.2642 7.50683 11.1684L9.48674 10.6735L10.2942 5.0213C10.3612 4.55254 10.7954 4.22714 11.2642 4.2941C11.7329 4.36107 12.0583 4.79529 11.9914 5.26404L11.2825 10.2247L14.3636 9.4543C14.8222 9.33737 15.2886 9.61439 15.4053 10.0729C15.5222 10.5315 15.2452 10.9979 14.7866 11.1148C14.784 11.1153 14.7814 11.1161 14.7788 11.1166L11.0204 12.0562L10.4164 16.2857H16.2857C16.7592 16.2857 17.1429 16.6695 17.1429 17.1429C17.1429 17.6161 16.7592 18.0001 16.2857 18.0001Z"
                                            fill="#5F5F5F"
                                          />
                                        </svg>
                                      )}
                                      {each.paymentMethod == 'Ethereum' && (
                                        <svg
                                          className="mr-1"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M12.3182 13.6531C12.1139 13.7348 11.8863 13.7348 11.682 13.6531L9.48944 12.7761L12.0001 17.7974L14.5107 12.7761L12.3182 13.6531Z"
                                            fill="#DC3CCC"
                                          />
                                          <path
                                            d="M12.0001 11.9341L15.0156 10.7279L12.0001 5.90308L8.98456 10.7279L12.0001 11.9341Z"
                                            fill="#DC3CCC"
                                          />
                                          <path
                                            d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6274 5.3726 24 12 24C18.6274 24 24 18.6274 24 12C23.9927 5.37574 18.6243 0.00732425 12 0ZM17.0524 11.5263L12.7667 20.0977C12.5551 20.5212 12.04 20.6928 11.6168 20.4812C11.4507 20.3983 11.3162 20.2638 11.2333 20.0977L6.94757 11.5263C6.81443 11.2589 6.8296 10.9416 6.9876 10.6882L11.2733 3.83111C11.5582 3.42984 12.114 3.33515 12.5153 3.62001C12.5972 3.67808 12.6686 3.74923 12.7267 3.83111L17.0121 10.6882C17.1704 10.9416 17.1856 11.2589 17.0524 11.5263Z"
                                            fill="#DC3CCC"
                                          />
                                        </svg>
                                      )}
                                      {each.paymentMethod == 'Bank' && (
                                        <Icons.Money />
                                      )}
                                      <span className="font-w600 text-black">
                                        {each.paymentMethod}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-black">
                                        {moment(each.date.toDate()).calendar()}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="font-w600 text-black">
                                        ${each.paymentAmount}
                                      </span>
                                    </td>
                                    <td>
                                      {each.statusSuccess && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Completed
                                        </a>
                                      )}

                                      {each.statusFailed && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Failed
                                        </a>
                                      )}
                                      {each.statusPending && (
                                        <a
                                          className="btn btn-outline-success float-right"
                                          href="javascript:void(0);"
                                        >
                                          Failed
                                        </a>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              {fundingData.length === 0 && (
                                <tr className="text-center text-warning row-span-4">
                                  <td colSpan={6}>No Transaction Yet</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-xxl-12">
                  <div className="row">
                    <div className="col-xl-12 m-t25">
                      <div className="card">
                        <div className="card-header border-0">
                          <h4 className="mb-0 fs-20">Fund Your Account</h4>
                        </div>
                        <div className="card-body">
                          <h4>
                            Make payment with the above btc wallet and upload
                            Prove
                          </h4>
                          <div className="text-lg-left text-sm-center">
                            <img src={img1} width="240px" alt="Code" />
                            <p className="text-primary text-lg pb-2">
                              31keT3WdcgNwo5cThrMW9s9e4jQbGTqpTh
                            </p>
                          </div>

                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4">
              <div className="row">
                <div className="col-xl-12 col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="mb-0 text-black fs-20">My Profile</h4>
                      <div className="dropdown custom-dropdown mb-0 tbl-orders-style">
                        <div
                          className="btn sharp tp-btn"
                          data-toggle="dropdown"
                          aria-expanded="false"
                          role="button"
                        >
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.0049 13C12.5572 13 13.0049 12.5523 13.0049 12C13.0049 11.4477 12.5572 11 12.0049 11C11.4526 11 11.0049 11.4477 11.0049 12C11.0049 12.5523 11.4526 13 12.0049 13Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.0049 6C12.5572 6 13.0049 5.55228 13.0049 5C13.0049 4.44772 12.5572 4 12.0049 4C11.4526 4 11.0049 4.44772 11.0049 5C11.0049 5.55228 11.4526 6 12.0049 6Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.0049 20C12.5572 20 13.0049 19.5523 13.0049 19C13.0049 18.4477 12.5572 18 12.0049 18C11.4526 18 11.0049 18.4477 11.0049 19C11.0049 19.5523 11.4526 20 12.0049 20Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="/user/profile">
                            Details
                          </a>
                          <Link className="dropdown-item text-danger" to="#">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <div className="my-profile">
                          <img
                            src={userData?.photo || img}
                            alt="profile"
                            className="rounded"
                          />
                          /{' '}
                          <Link to="user/profile">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </Link>
                        </div>
                        <h4 className="mt-3 font-w600 text-black mb-0 name-text">
                          {savingsData && savingsData[0].firstname}
                        </h4>
                        <span>{savingsData && savingsData[0].email}</span>
                        <p className="mb-0 mt-2">
                          {moment(
                            savingsData && savingsData[0].date.toDate(),
                          ).calendar()}
                        </p>
                      </div>
                      <ul className="portofolio-social">
                        <li>
                          <a
                            href={`tel:${savingsData && savingsData[0].phone}`}
                          >
                            <i className="fa fa-phone"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${
                              savingsData && savingsData[0].email
                            }`}
                          >
                            <i className="fa fa-envelope-o"></i>
                          </a>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-facebook"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="mb-0 text-black fs-20">Current Graph</h4>
                    </div>

                    <div className="card-body text-center">
                      <svg
                        width="300"
                        height="400"
                        viewBox="0 0 33 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="4.71425"
                          height="34.5712"
                          rx="2.35713"
                          transform="matrix(-1 0 0 1 33 0)"
                          fill="red"
                        ></rect>
                        <rect
                          width="4.71425"
                          height="25.1427"
                          rx="2.35713"
                          transform="matrix(-1 0 0 1 23.5713 9.42853)"
                          fill="orange"
                        ></rect>
                        <rect
                          width="4.71425"
                          height="8.9999"
                          rx="2.35713"
                          transform="matrix(-1 0 0 1 14.1436 23.5713)"
                          fill="yellow"
                        ></rect>
                        <rect
                          width="4.71425"
                          height="11.9999"
                          rx="2.35713"
                          transform="matrix(-1 0 0 1 14.1436 23.5713)"
                          fill="orange"
                        ></rect>
                        <rect
                          width="4.71425"
                          height="12.9999"
                          rx="2.35713"
                          transform="matrix(-1 0 0 1 14.1436 23.5713)"
                          fill="blue"
                        ></rect>
                        <rect
                          width="5.31864"
                          height="21.2746"
                          rx="2.65932"
                          transform="matrix(-1 0 0 1 5.31836 13.2966)"
                          fill="green"
                        ></rect>
                      </svg>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between">
                        <h6> Total Deposite</h6>{' '}
                        <p>
                          {' '}
                          $
                          {(savingsData && savingsData[0].initialAmount) ||
                            '0000'}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h6> Total Income</h6>{' '}
                        <p>
                          {' '}
                          ${(savingsData && savingsData[0]?.income) || '0000'}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h6> Total Profit</h6>{' '}
                        <p> ${(savingsData && savingsData[0].profit) || '5'}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h6> Total Saved</h6> <p> ${sumTotal || '0000'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <h4 className="mb-0 text-black fs-20">Account Funding</h4>
                    </div>

                    <div className="card-body ">
                      <Form
                        onSubmit={handleSubmitInvest}
                        noValidate
                        className="px-2 pt-2"
                      >
                        <div className="form-group  animation">
                          <Form.Control
                            type="number"
                            label="Input Amount"
                            name="amount"
                            placeholder="Enter Amount"
                            onChange={(e) =>
                              setInvestInfo({
                                ...investInfo,
                                amount: e.target.value,
                              })
                            }
                            value={investInfo.amount}
                            required
                          />
                        </div>
                        <div
                          className="form-group  animation"
                          data-animation="fadeInUp"
                          data-animation-delay="0.7s"
                        >
                          <Form.Control
                            as="select"
                            type="text"
                            name="method"
                            id="my-select"
                            placeholder="Enter funding Method"
                            onChange={(e) =>
                              setInvestInfo({
                                ...investInfo,
                                method: e.target.value,
                              })
                            }
                            value={investInfo.method}
                            required
                          >
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                            >
                              Account Funding Method
                            </option>
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                              value="Bank"
                            >
                              Bank
                            </option>
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                              value="Bitcoin"
                            >
                              Bitcoin
                            </option>
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                              value="Etherium"
                            >
                              Etherium
                            </option>
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                              value="Litcoin"
                            >
                              Litcoin
                            </option>
                            <option
                              className="text-dark"
                              style={{ color: 'black' }}
                              value="Paypal"
                            >
                              Paypal
                            </option>
                          </Form.Control>
                        </div>
                        <div
                          className="form-group   animation"
                          data-animation="fadeInUp"
                          data-animation-delay="0.7s"
                        >
                          <h6 className="mb-1">Upload prove</h6>
                          <Form.Control
                            type="file"
                            name="prove"
                            id="prove"
                            label="Upload Prove"
                            onChange={(e) =>
                              handleCompressor(e.target.files[0])
                            }
                          />
                        </div>
                        <div
                          className="form-group  "
                          data-animation="fadeInUp"
                          data-animation-delay="0.8s"
                        >
                          <Button
                            disabled={investInfo.isSubmitting}
                            type="submit"
                            className="btn btn-radius  w-100"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                      <div
                        className="form-group   animation px-2"
                        data-animation="fadeInUp"
                        data-animation-delay="0.8s"
                      >
                        <h6 className=" mb-1">Already have fund withdraw</h6>
                        <Button
                          onClick={() =>
                            savingsData && savingsData[0].total === '0'
                              ? fireEmpty()
                              : setOpenPWC(true)
                          }
                          type="btn"
                          className="btn bg-primary btn-radius btn-normal  w-100"
                        >
                          Withdrawal
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
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
      <>
        <Modal
          show={openPWC}
          centered
          onHide={() => setOpenPWC(false)}
          backdrop="static"
        >
          <Form onSubmit={pwcAction} noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Personal Withdrawal Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                type="text"
                name="PWC"
                placeholder="Enter Pwc Code"
                onChange={(e) => setPWC({ ...PWC, value: e.target.value })}
                value={PWC.value}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button disabled={PWC.isSubmitting} type="submit">
                Submit
              </Button>
              <Button
                disabled={PWC.isSubmitting}
                variant="danger"
                onClick={() => setOpenPWC(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </div>
  )
}

export default Funding
