import React, { useEffect, useState } from 'react'
import { Dialog } from '@material-ui/core'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { savingWithdrawalAction } from '../Auths/Action'
import UserNav1 from './UserNav1'
import { Link } from 'react-router-dom'
import Ufooter from './Ufooter'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function SavingWithdrawal() {
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const savings = useSelector((state) => state.firestore.ordered.savings)

  const { savingWithdrawalMessage, savingWithdrawalError } = useSelector(
    (state) => state.projectReducer,
  )
  const [saveInfo, setSafeInfo] = useState({
    total: '',
    authorize: '',
  })

  useEffect(() => {
    savings &&
      savings.map((each) => {
        setSafeInfo({
          ...saveInfo,
          total: each.total,
          authorize: each.withdrawalAuthorization,
        })
      })
  }, [savings])

  const profileInfo = useSelector((state) => state.firebase.profile)

  const [openPay, setOpenPay] = useState({
    btc: false,
    etheruim: false,
    paypal: false,
    bank: false,
  })

  const errorOptions = {
    title: <p> Withdrawal Authorization Error</p>,
    text: 'Wrong Or No withdrawal Authorization Code ',
    icon: 'error',
    color: 'orange',
    timer: 7000,
    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const successOptions = {
    title: <p>Success</p>,
    html: <span className="text-success">{savingWithdrawalMessage}</span>,
    icon: 'success',

    showCloseButton: true,
    closeButtonText: 'OK',
  }
  const errorOptionW = {
    title: <p>Error</p>,
    text: savingWithdrawalMessage,
    icon: 'error',

    showCloseButton: true,
    closeButtonText: 'OK',
  }

  const [newAmount, setNewAmount] = useState(1)
  const [withdrawalAmount, setWithdrawalAmount] = useState({
    amount: 1,
    wallet: '',
    withdrawalMethod: '',
    name: '',
    accountNumber: '',
    phone: '',
    bankName: '',
    withdrawalAuthorization: '',
    isLoading: false,
    success: false,
    error: false,
  })

  useEffect(() => {
    axios
      .get(
        `https://blockchain.info/tobtc?currency=USD&value=${withdrawalAmount.amount}`,
      )
      .then((res) => {
        setNewAmount(res.data)
      })
      .catch((err) => {})
  }, [withdrawalAmount.amount])

  const handleWithdrawal = (e) => {
    e.preventDefault()

    setWithdrawalAmount({ ...withdrawalAmount, isLoading: true })

    if (saveInfo.authorize !== withdrawalAmount.withdrawalAuthorization) {
      setOpenPay({
        ...openPay,
        btc: false,
        etheruim: false,
        paypal: false,
        bank: false,
      })
      setWithdrawalAmount({ ...withdrawalAmount, isLoading: false })
      return MySwal.fire(errorOptions)
    }

    return savingWithdrawalAction(
      openPay,
      setOpenPay,
      profileInfo,
      withdrawalAmount,
      firebase,
      dispatch,
      setWithdrawalAmount,
    )
  }

  if (withdrawalAmount.success) {
    MySwal.fire(successOptions).then(() => {
      setWithdrawalAmount({ ...withdrawalAmount, success: false })
      return dispatch({ type: 'SAVING_WITHDRAWAL_SUCCESS', message: '' })
    })
  }
  if (withdrawalAmount.error) {
    MySwal.fire(errorOptionW).then(() => {
      setWithdrawalAmount({ ...withdrawalAmount, error: false })
      return dispatch({ type: 'SAVING_WITHDRAWAL_ERROR', message: '' })
    })
  }

  return (
    <>
      <div id="main-wrapper" className="show">
        <UserNav1 />
        <div className="content-body pb-4">
          <div className="container-fluid">
            <div className="row page-titles mx-0 ">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Withdraw Now</h4>
                </div>
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/user/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="#">Saving Withdrawal</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className=" height-100vh site-bg">
            <div>
              <div>
                <div className="col-sm-12">
                  <div className="row ">
                    <div className="col-12 pt-2 ">
                      <div className="card ">
                        <div className="card-header border-0 pb-0">
                          <h4 className="mb-0 fs-20 text-black">
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
                                        paypal: false,
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
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Withdrawal Auth Code"
                                        name="WAC"
                                        value={
                                          withdrawalAmount.withdrawalAuthorization
                                        }
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            withdrawalAuthorization:
                                              e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 text-center wow">
                                      <Button
                                        type="submit"
                                        disabled={withdrawalAmount.isLoading}
                                      >
                                        {withdrawalAmount.isLoading
                                          ? 'Loading..'
                                          : 'Submit'}
                                      </Button>
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
                                      paypal: false,
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
                                    <p>Etherium : {newAmount && newAmount}</p>
                                    <p>
                                      with {withdrawalAmount.withdrawalMethod}{' '}
                                      withdrawal method.
                                    </p>
                                  </div>

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
                                      className="form-group col-md-12 wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Withdrawal Auth Code"
                                        name="WAC"
                                        value={
                                          withdrawalAmount.withdrawalAuthorization
                                        }
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            withdrawalAuthorization:
                                              e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 text-center animation"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.8s"
                                    >
                                      <Button
                                        type="submit"
                                        disabled={withdrawalAmount.isLoading}
                                      >
                                        {withdrawalAmount.isLoading
                                          ? 'Loading..'
                                          : 'Submit'}
                                      </Button>
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
                                      paypal: !openPay.paypal,
                                      bank: false,
                                      etheruim: false,
                                      btc: false,
                                    })
                                    setWithdrawalAmount({
                                      ...withdrawalAmount,
                                      withdrawalMethod: 'Paypal',
                                    })
                                  }}
                                >
                                  Paypal
                                </Button>
                              </div>
                              <Dialog
                                open={openPay.paypal}
                                onClose={() =>
                                  setOpenPay({ ...openPay, paypal: false })
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
                                        type="email"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Enter Email"
                                        name="email"
                                        value={withdrawalAmount.email}
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
                                    <div
                                      className="form-group col-md-12 wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Withdrawal Auth Code"
                                        name="WAC"
                                        value={
                                          withdrawalAmount.withdrawalAuthorization
                                        }
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            withdrawalAuthorization:
                                              e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-md-12 text-center wow">
                                      <Button
                                        type="submit"
                                        disabled={withdrawalAmount.isLoading}
                                      >
                                        {withdrawalAmount.isLoading
                                          ? 'Loading..'
                                          : 'Submit'}
                                      </Button>
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
                                      paypal: false,
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

                                  <h5 className="userTextColor text-center mb-2">
                                    Input your withdrawal information
                                  </h5>
                                  <form onSubmit={handleWithdrawal}>
                                    <div className="form-group col-md-12 wow">
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Your Name"
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
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Bank Name"
                                        name="bankName"
                                        value={withdrawalAmount.bankName}
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            bankName: e.target.value,
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
                                      className="form-group col-md-12 wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.7s"
                                    >
                                      <input
                                        type="text"
                                        className="form-control text-dark"
                                        required
                                        placeholder="Withdrawal Auth Code"
                                        name="WAC"
                                        value={
                                          withdrawalAmount.withdrawalAuthorization
                                        }
                                        onChange={(e) =>
                                          setWithdrawalAmount({
                                            ...withdrawalAmount,
                                            withdrawalAuthorization:
                                              e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group col-md-12 text-center wow"
                                      data-animation="fadeInUp"
                                      data-animation-delay="0.8s"
                                    >
                                      <Button
                                        type="submit"
                                        disabled={withdrawalAmount.isLoading}
                                      >
                                        {withdrawalAmount.isLoading
                                          ? 'Loading..'
                                          : 'Submit'}
                                      </Button>
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
                          <h3 className="wow ">
                            Let us help you to find a solution that meets your
                            needs
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
                            <a href="mailto:ultimatesaving@outlook.com">
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
        <Ufooter />
      </div>
    </>
  )
}

export default SavingWithdrawal
