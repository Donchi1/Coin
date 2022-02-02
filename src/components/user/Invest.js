import React from 'react'
import { Button } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import UserNav1 from './UserNav1'

function Invest() {
  const { push } = useHistory()
  const dispatch = useDispatch()

  const handleReceivedPayment = (bool, price) => {
    dispatch({ type: 'PAYMENT_SET', amount: price, qrcode: bool })
    push('/user/payments')
  }
  return (
    <div className="main-wrapper">
      <UserNav1 />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0 ">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4>Choose Your Investment Plan Now</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/user">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#">Plans</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row small_space">
            <div className="col-lg-4 col-md-4">
              <div className=" text-center card ">
                <div className="card-header bg-primary">
                  <h3>Basic</h3>
                  <div className="price_tage">
                    <h3>$3000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$200</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$4999</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$50</li>
                  </ul>
                </div>
                <div className="py-4">
                  <Button onClick={() => handleReceivedPayment(true, '200')}>
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className=" text-center card ">
                <div className=" card-header bg-primary">
                  <h3>Standard</h3>
                  <div className="price_tage">
                    <h3>$4000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$400</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$7999</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$100</li>
                  </ul>
                </div>
                <div className="py-4">
                  <Button onClick={() => handleReceivedPayment(true, '400')}>
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="text-center card ">
                <div className=" card-header bg-primary">
                  <h3>Untimate</h3>
                  <div className="price_tage">
                    <h3>$5000.00</h3>
                    <span>Token Plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$500</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$9900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$150</li>
                  </ul>
                </div>
                <div className="py-4">
                  <Button onClick={() => handleReceivedPayment(true, '600')}>
                    Invest Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className=" pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 offset-lg-2">
                <div className=" title_border text-center">
                  <h4 className="text-dark py-4">Saving Plans</h4>
                </div>
              </div>
            </div>
            <div className="row small_space">
              <div className="col-lg-4 col-md-4">
                <div className="text-center card  mb-2">
                  <div className="card-header  bg-primary ">
                    <h3>Basic</h3>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li className="py-2">Normal Deposit</li>
                      <li className="py-2">$500</li>
                      <li className="py-2">Initial Withdrawal</li>
                      <li className="py-2">$5000</li>
                      <li className="py-2">Bonus</li>
                      <li className="py-2">$50</li>
                    </ul>
                  </div>
                  <div className="py-4">
                    <Button onClick={() => push('/user/savings')}>
                      Invest Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="text-center card  mb-2">
                  <div className="card-header bg-primary">
                    <h3>Standard</h3>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li className="py-2">Normal Deposit</li>
                      <li className="py-2">$1000</li>
                      <li className="py-2">Initial Withdrawal</li>
                      <li className="py-2">$10000</li>
                      <li className="py-2">Bonus</li>
                      <li className="py-2">$100</li>
                    </ul>
                  </div>
                  <div className="py-4">
                    <Button onClick={() => push('/user/savings')}>
                      Invest Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card text-center  mb-2">
                  <div className="card-header bg-primary">
                    <h3>Untimate</h3>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li className="py-2">Normal Deposit</li>
                      <li className="py-2">$1500</li>
                      <li className="py-2">Initial Withdrawal</li>
                      <li className="py-2">$15000</li>
                      <li className="py-2">Bonus</li>
                      <li className="py-2">$150</li>
                    </ul>
                  </div>
                  <div className="py-4">
                    <Button onClick={() => push('/user/savings')}>
                      Invest Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container ">
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
        <div className="footer">
          <div className="copyright text-center">
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
      <div className="footer">
        <div className="copyright text-center">
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

export default Invest
