import { Dialog, makeStyles, Snackbar } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { withdrawalAction } from '../Auths/Action'
import Loading from './Loading'
import UserNav1 from './UserNav1'

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: 'red',
  },
}))

function Withdrawals() {
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const classes = useStyles()
  const transError = useSelector(
    (state) => state.projectReducer.withdrawalError,
  )
  const profileInfo = useSelector((state) => state.firebase.profile)
  const [openLoader, setOpenLoader] = useState(false)
  const [openPay, setOpenPay] = useState({
    btc: false,
    etheruim: false,
    litecoin: false,
    bank: false,
  })

  const checkData = () => setopenError(true)
  const [openError, setopenError] = useState(false)

  const [newAmount, setNewAmount] = useState(1)
  const [withdrawalAmount, setWithdrawalAmount] = useState({
    amount: 1,
    wallet: '',
    withdrawalMethod: '',
    name: '',
    accountNumber: 'none',
    phone: '',
  })

  const handleLoad = () => setOpenLoader(false)

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

    setOpenLoader(true)
    setOpenPay({
      ...openPay,
      btc: false,
      etheruim: false,
      litecoin: false,
      bank: false,
    })

    withdrawalAction(
      profileInfo,
      withdrawalAmount,
      firebase,
      dispatch,
      checkData,
      handleLoad,
      setWithdrawalAmount,
    )
  }
  return (
    <div>
      {openLoader ? (
        <Loading />
      ) : (
        <>
          <UserNav1 />
          <section className="sub-page-banner site-bg parallax" id="banner">
            <div className="container">
              <div className="row">
                <div className="col-md-12 wow fadeInUp">
                  <div className="page-banner text-center">
                    <h1 className="sub-banner-title userTextColor">
                      Withdrawals
                    </h1>

                    <ul>
                      <li>
                        <a href="/user">Dashboard</a>
                      </li>
                      <li>Withdrawals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="authentication-bg  pb-4">
            <div className="home-btn d-none d-sm-block">
              <a href="/">
                <i className="mdi mdi-home h2 text-white"></i>
              </a>
            </div>

            <Snackbar
              open={openError}
              onClose={() => setopenError(false)}
              message={transError}
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
                        <div className="card mb-3">
                          <div className="text-center">
                            <h4 className="wow userTextColor pt-1">
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
                                    <button
                                      className="btn history-info btn-radius w-100"
                                      disabled={
                                        profileInfo.disableWithdrawal || true
                                      }
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
                                    </button>
                                  </div>
                                </div>
                                <Dialog
                                  open={openPay.btc}
                                  onClose={() =>
                                    setOpenPay({ ...openPay, btc: false })
                                  }
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
                                          className="form-control"
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
                                          className="form-control"
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
                                          className="form-control"
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
                                        <button
                                          className="btn btn-default history-info btn-radius"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                      <div className="divider small_divider"></div>
                                    </form>
                                  </div>
                                </Dialog>
                                <div className="form-group col-md-12 text-center wow btn-radius">
                                  <button
                                    className="btn history-info  btn-radius w-100"
                                    disabled={
                                      profileInfo.disableWithdrawal || true
                                    }
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
                                  </button>
                                </div>
                                <Dialog
                                  open={openPay.etheruim}
                                  onClose={() =>
                                    setOpenPay({ ...openPay, etheruim: false })
                                  }
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
                                    <h5 className="userTextColor pb-2">
                                      Input your withdrawal information
                                    </h5>
                                    <form onSubmit={handleWithdrawal}>
                                      <div className="form-group col-md-12 wow">
                                        <input
                                          type="text"
                                          className="form-control"
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
                                      <div
                                        className="form-group col-md-12 animation"
                                        data-animation="fadeInUp"
                                        data-animation-delay="0.7s"
                                      >
                                        <input
                                          type="text"
                                          className="form-control"
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
                                          className="form-control"
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
                                        <button
                                          className="btn history-info btn-default btn-radius"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                      <div className="divider small_divider"></div>
                                    </form>
                                  </div>
                                </Dialog>

                                <div className="form-group col-md-12 text-center wow btn-radius">
                                  <button
                                    className="btn history-info btn-radius w-100"
                                    disabled={
                                      profileInfo.disableWithdrawal || true
                                    }
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
                                  </button>
                                </div>
                                <Dialog
                                  open={openPay.litecoin}
                                  onClose={() =>
                                    setOpenPay({ ...openPay, litecoin: false })
                                  }
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
                                    <h5 className="userTextColor pb-2">
                                      Input your withdrawal information
                                    </h5>
                                    <form onSubmit={handleWithdrawal}>
                                      <div className="form-group col-md-12 wow">
                                        <input
                                          type="text"
                                          className="form-control"
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
                                          className="form-control"
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
                                          className="form-control"
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
                                        <button
                                          className="btn btn-default history-info btn-radius"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                      <div className="divider small_divider"></div>
                                    </form>
                                  </div>
                                </Dialog>
                                <div className="form-group col-md-12 text-center wow  ">
                                  <button
                                    className="btn history-info btn-radius w-100"
                                    disabled={
                                      profileInfo.disableWithdrawal || true
                                    }
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
                                  </button>
                                </div>
                                <Dialog
                                  open={openPay.bank}
                                  onClose={() =>
                                    setOpenPay({ ...openPay, bank: false })
                                  }
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
                                    <h5 className="userTextColor">
                                      Input your withdrawal information
                                    </h5>
                                    <form onSubmit={handleWithdrawal}>
                                      <div className="form-group col-md-12 wow">
                                        <input
                                          type="text"
                                          className="form-control"
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
                                          className="form-control"
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
                                          className="form-control"
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
                                        <button
                                          className="btn btn-default btn-radius history-info"
                                          type="submit"
                                        >
                                          Submit
                                        </button>
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

          {/* START SECTION CALL TO ACTION- */}
          <section className="mt-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-9">
                  <div className="action-content res_md_mb_20">
                    <h3 className="wow">
                      Let Us Help You to Find a Solution That Meets Your Needs
                    </h3>
                    <p className="m-0 wow">
                      Contact our team for more withdrawal methods
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 text-lg-right">
                  <a
                    href="/contacts"
                    className="btn btn-default btn-radius wow history-info"
                  >
                    Contact Us <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="copyright">
                  Copyright &copy; UltimateCoins {new Date().getFullYear()} All
                  Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Withdrawals
