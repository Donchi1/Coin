import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { paymentAction } from '../Auths/Action'
import UserNav1 from './UserNav1'
import { Button } from 'react-bootstrap'
import imgLit from '../../assets/qrcodeLit.png'
import imgEth from '../../assets/qrcodeEth.png'
import imgBtc from '../../assets/qrcode.jpg'

const MySwal = withReactContent(Swal)

function Payments() {
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const transSuccess = useSelector(
    (state) => state.projectReducer.paymentSuccess,
  )

  const profileInfo = useSelector((state) => state.firebase.profile)
  const paymentInfo = useSelector((state) => state.projectReducer.paymentData)
  const { paymentAmountData, qrCodeLit, qrCodeEth, qrCodeBtc } = useSelector(
    (state) => state.projectReducer,
  )
  const [openPay, setOpenPay] = useState({
    btc: false,
    etheruim: false,
    litecoin: false,
    bank: false,
    method: '',
  })

  const [newAmount, setNewAmount] = useState(1)
  const [paymentAmount, setPaymentAmount] = useState('')
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('payments')
      .doc(profileInfo.uid ? profileInfo.uid : localStorage.getItem('userId'))
      .collection('paymentDatas')
      .limit(8)
      .orderBy('date')
      .onSnapshot((qsnapshot) => {
        qsnapshot.docs.map((each) => {
          return dispatch({
            type: 'PAYMENT_DATA',
            data: each.data(),
          })
        })
      })
    return unsubscribe
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://blockchain.info/tobtc?currency=USD&value=${paymentInfo.paymentAmount}`,
      )
      .then((res) => {
        setNewAmount(res.data)
      })
      .catch((err) => {})
  }, [paymentAmountData])

  const [userProve, setUserProve] = useState({
    prove: '',
    method: '',
  })

  const handleAmountPayBtc = (e) => {
    e.preventDefault()

    dispatch({
      type: 'PAYMENT_SET_BTC',
      amount: paymentAmount,
      qrcode: true,
    })

    setPaymentAmount('')
  }
  const handleAmountPayEth = (e) => {
    e.preventDefault()

    dispatch({
      type: 'PAYMENT_SET_ETH',
      amount: paymentAmount,
      qrcode: true,
    })

    setPaymentAmount('')
  }
  const handleAmountPayLit = (e) => {
    e.preventDefault()

    dispatch({
      type: 'PAYMENT_SET_LIT',
      amount: paymentAmount,
      qrcode: true,
    })

    setPaymentAmount('')
  }

  const handleOpen = () => {
    return (
      <div className="userTextColor">
        {' '}
        <p>You want to invest ${paymentAmount} to our platform</p>
        <p>Bitcoin : {newAmount && newAmount}</p>
      </div>
    )
  }

  const handleProve = (e) => {
    e.preventDefault()
    if (userProve.prove === '' || userProve.method === '') {
      return
    }
    setOpenPay({
      ...openPay,
      etheruim: false,
      btc: false,
      bank: false,
      litecoin: false,
    })

    paymentAction(
      paymentInfo.paymentAmount,
      profileInfo,
      userProve,
      firebase,
      dispatch,
      setUserProve,
    )
  }

  const options = {
    title: <p>Error</p>,
    text: transSuccess,
    icon: 'error',
    timer: 4000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }
  if (transSuccess) {
    MySwal.fire(options)
  }

  return (
    <div className="main-wrapper">
      <UserNav1 />
      <div className="content-body">
        <div className="authentication-bg  pb-4">
          <div className=" height-100vh site-bg">
            <div>
              <div>
                <div className="containe mx-4">
                  <div className="row justify-content-center">
                    <div className="col-md-12  pt-2 ">
                      <div className="card mb-3">
                        <div className="card-header border-0 pb-0">
                          <h4 className="mb-0 fs-20 text-black">
                            Choose Your Investment Method
                          </h4>
                        </div>
                        <div className="card-body p-4">
                          <div className="field_form authorize_form">
                            <div>
                              <div className="form-group col-md-12 text-center wow">
                                <button
                                  className="btn  btn-radius w-100 history-info"
                                  onClick={() =>
                                    setOpenPay({
                                      ...openPay,
                                      btc: !openPay.btc,
                                      bank: false,
                                      etheruim: false,
                                      litecoin: false,
                                    })
                                  }
                                >
                                  Bitcoin
                                </button>
                              </div>
                              {openPay.btc && (
                                <div className="text-center">
                                  {handleOpen()}
                                  <form onSubmit={handleAmountPayBtc}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        required
                                        label="Input Amount"
                                        value={paymentAmount}
                                        onChange={(e) => {
                                          setPaymentAmount(e.target.value)
                                        }}
                                      />
                                    </div>
                                    <div className="form-group col-md-12 text-center wow ">
                                      <button
                                        type="submit"
                                        className="btn w-50 history-info mb-2"
                                      >
                                        submit
                                      </button>
                                    </div>
                                  </form>
                                  {qrCodeBtc && (
                                    <>
                                      <h4 className="userTextColor">
                                        Make payment with the above btc wallet
                                        and upload Prove
                                      </h4>
                                      <div>
                                        <img
                                          src={imgBtc}
                                          width="300px"
                                          alt="Code"
                                        />
                                        <p className="userTextColor">
                                          31keT3WdcgNwo5cThrMW9s9e4jQbGTqpTh
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                              <div
                                className="form-group col-md-12 text-center animation btn-radius"
                                data-animation="fadeInUp"
                                data-animation-delay="0.7s"
                              >
                                <button
                                  className="btn history-info  btn-radius w-100"
                                  onClick={() =>
                                    setOpenPay({
                                      ...openPay,
                                      etheruim: !openPay.etheruim,
                                      bank: false,
                                      litecoin: false,
                                      btc: false,
                                    })
                                  }
                                >
                                  Etherium
                                </button>
                                {openPay.etheruim && (
                                  <div className="text-center">
                                    {handleOpen()}
                                    <form onSubmit={handleAmountPayEth}>
                                      <div className="form-group col-md-12 wow">
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="Amount"
                                          required
                                          label="Input Amount"
                                          value={paymentAmount}
                                          onChange={(e) => {
                                            setPaymentAmount(e.target.value)
                                          }}
                                        />
                                      </div>
                                      <div className="form-group col-md-12 text-center wow ">
                                        <button
                                          type="submit"
                                          className="btn w-50 history-info mb-2"
                                        >
                                          submit
                                        </button>
                                      </div>
                                    </form>
                                    {qrCodeEth && (
                                      <>
                                        <h4 className="userTextColor">
                                          Make payment with the above btc wallet
                                          and upload Prove
                                        </h4>
                                        <div>
                                          <img
                                            src={imgEth}
                                            width="300px"
                                            alt="Code"
                                          />
                                          <p className="userTextColor">
                                            0x0eE61fEF29Fbe1e2D4F94768E7923cc1A692b471
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div
                                className="form-group col-md-12 text-center animation btn-radius"
                                data-animation="fadeInUp"
                                data-animation-delay="0.8s"
                              >
                                <button
                                  className="btn history-info btn-radius w-100"
                                  onClick={() =>
                                    setOpenPay({
                                      ...openPay,
                                      litecoin: !openPay.litecoin,
                                      bank: false,
                                      etheruim: false,
                                      btc: false,
                                    })
                                  }
                                >
                                  Litecoin
                                </button>

                                {openPay.litecoin && (
                                  <div className="text-center">
                                    {handleOpen()}
                                    <form onSubmit={handleAmountPayLit}>
                                      <div className="form-group col-md-12 wow">
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="Amount"
                                          required
                                          label="Input Amount"
                                          value={paymentAmount}
                                          onChange={(e) => {
                                            setPaymentAmount(e.target.value)
                                          }}
                                        />
                                      </div>
                                      <div className="form-group col-md-12 text-center wow ">
                                        <button
                                          type="submit"
                                          className="btn w-50 history-info mb-2"
                                        >
                                          submit
                                        </button>
                                      </div>
                                    </form>
                                    {qrCodeLit && (
                                      <>
                                        <h4 className="userTextColor">
                                          Make payment with the above litcoin
                                          wallet and upload Prove
                                        </h4>
                                        <div>
                                          <img
                                            src={imgLit}
                                            width="300px"
                                            alt="Code"
                                          />
                                          <p className="userTextColor">
                                            MQESitZtJ3TAZfD6YpZbeibKLPNEPtZtE7
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div
                                className="form-group col-md-12 text-center animation  "
                                data-animation="fadeInUp"
                                data-animation-delay="0.8s"
                              >
                                <button
                                  className="btn history-info btn-radius w-100"
                                  onClick={() =>
                                    setOpenPay({
                                      ...openPay,
                                      bank: !openPay.bank,
                                      litecoin: false,
                                      etheruim: false,
                                      btc: false,
                                    })
                                  }
                                >
                                  Bank Deposit
                                </button>
                                {openPay.bank && (
                                  <div className="pt-2">
                                    <h4 className="text-warning">
                                      Unavailable at the moment
                                    </h4>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="divider small_divider"></div>
                            <form onSubmit={handleProve}>
                              <div
                                className="form-group col-md-12 animation"
                                data-animation="fadeInUp"
                                data-animation-delay="0.7s"
                              >
                                <h5>Upload prove</h5>
                                <input
                                  type="file"
                                  className="form-control"
                                  required
                                  label="Upload Prove"
                                  onChange={(e) => {
                                    const newFile = e.target.files[0]
                                    setUserProve({
                                      ...userProve,
                                      prove: newFile,
                                    })
                                  }}
                                />
                              </div>
                              <div
                                className="form-group col-md-12 animation"
                                data-animation="fadeInUp"
                                data-animation-delay="0.7s"
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  placeholder="Payment Method"
                                  onChange={(e) => {
                                    setUserProve({
                                      ...userProve,
                                      method: e.target.value,
                                    })
                                  }}
                                />
                                <p>
                                  Note: Method must be the above provided
                                  methods
                                </p>
                              </div>
                              <div
                                className="form-group col-md-12 text-center animation"
                                data-animation="fadeInUp"
                                data-animation-delay="0.8s"
                              >
                                <button
                                  type="submit"
                                  className="btn history-info btn-radius w-100"
                                >
                                  Upload
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
          </div>
        </div>

        <div className="containe mx-4 ">
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
                          contact our team for any issue on your savings account
                        </p>
                        <p className="m-0 wow"></p>
                      </div>
                    </div>
                    <div className="col-lg-3 text-lg-right">
                      <ul className="portofolio-social">
                        <li>
                          <Button
                            onClick={() => window.location.assign('/contact')}
                          >
                            Contact Us <i className="fa fa-phone"></i>
                          </Button>
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
      <div className="footer  ">
        <div className="copyright">
          <p>
            Copyright &copy; {new Date().getFullYear()}{' '}
            <a href="https://ultimatecoins.info" target="_blank">
              UltimateCoins
            </a>{' '}
            All Rights Reserve
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payments
