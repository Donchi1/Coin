import React from 'react'

import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Card } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

import Chart from './Chart'
import MarketPrice from './MarketPrice'
import UserNav1 from './UserNav1'

function User() {
  const userProfile = useSelector((state) => state.firebase.profile)

  const percentage = userProfile.totalBalance

  return (
    <>
      <UserNav1 />

      <section className="site-bg pt-5  pb-0 ">
        <div className="text-center  text-uppercase pt-3 ">
          <h3 className="text-light">Dashboard</h3>
        </div>
        <div className="divider small_divider"></div>
        <div className="row text-center container  mb-3 d-flex justify-content-around mx-auto">
          <div className=" text-light mt-2 progress-data">
            <CircularProgressbarWithChildren
              strokeWidth={2}
              value={percentage}
              styles={{
                path: {
                  stroke: 'rgb(146, 15, 146)',
                  strokeLinecap: 'square',
                },
              }}
            >
              <div className="text-primary">
                <h4 className="btn-default userTextColor">Total Balance</h4>
                <h5>
                  <strong className="text-light">
                    ${percentage ? percentage : '0000'}
                  </strong>
                </h5>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className=" text-light mt-2 progress-data ">
            <CircularProgressbarWithChildren
              value={userProfile.initialDeposite}
              strokeWidth={2}
              styles={{
                path: {
                  stroke: 'rgb(146, 15, 146)',
                  strokeLinecap: 'square',
                },
              }}
            >
              <div className="text-primary">
                <h4 className="btn-default userTextColor">Initial Deposit</h4>
                <h5>
                  <strong className="text-light">
                    $
                    {userProfile.initialDeposite
                      ? userProfile.initialDeposite
                      : '0000'}
                  </strong>
                </h5>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className=" text-light mt-2 progress-data">
            <div>
              <CircularProgressbarWithChildren
                value={userProfile.bonus}
                strokeWidth={2}
                styles={{
                  path: {
                    stroke: 'rgb(146, 15, 146)',
                    strokeLinecap: 'square',
                  },
                }}
              >
                <div>
                  <h4 className="btn-default userTextColor">Bonus Balance</h4>
                  <h5>
                    <strong className="text-light">
                      ${userProfile.bonus ? userProfile.bonus : '0000'}
                    </strong>
                  </h5>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
        <div
          className=" text-center text-uppercase mx-auto mt-4"
          style={{ width: '50%', fontStyle: 'italic' }}
        >
          <h2 className="text-light">Transaction Update</h2>
        </div>
        <div className="row mb-3 d-flex justify-content-around mt-4 container mx-auto">
          <Card
            style={{ width: '18rem' }}
            className=" text-light site-bg2 mt-3"
          >
            <div className="d-flex justify-content-around align-items-center">
              <Icons.Envelope size={80} className="btn-default userTextColor" />
              <div>
                <h2 className="btn-default userTextColor">
                  $
                  {userProfile.totalBalance
                    ? Number(userProfile.totalBalance) +
                      Number(userProfile.bonus)
                    : '0000'}
                </h2>
                <p className="text-light">Total income</p>
              </div>
            </div>
            <Chart />
            <Card.Footer className="d-flex history-info justify-centent-center align-items-center btn-default">
              <Icons.Calendar2Date className="mr-3" />
              <Card.Text className="text-light">Today so far</Card.Text>
            </Card.Footer>
          </Card>
          <Card
            style={{ width: '18rem' }}
            className=" text-light mt-3 site-bg2"
          >
            <div className="d-flex justify-content-around align-items-center">
              <Icons.Wallet size={80} className="btn-default userTextColor" />
              <div>
                <h2 className="btn-default userTextColor">
                  $
                  {userProfile.totalBalance ? userProfile.totalBalance : '0000'}
                </h2>
                <p className="text-light">Account balance</p>
              </div>
            </div>
            <Chart />
            <Card.Footer className="d-flex history-info justify-centent-center align-items-center btn-default ">
              <Icons.Calendar2Date className="mr-3" />

              <Card.Text className="text-light"> This month so far</Card.Text>
            </Card.Footer>
          </Card>
          <Card
            style={{ width: '18rem' }}
            className=" text-light mt-3 site-bg2"
          >
            <div className="d-flex justify-content-around align-items-center">
              <Icons.Bag size={80} className="btn-default userTextColor" />
              <div>
                <h2 className="btn-default userTextColor">95%</h2>
                <p className="text-light">Rate of Return</p>
              </div>
            </div>
            <Chart />
            <Card.Footer className="d-flex history-info justify-centent-center align-items-center btn-default ">
              <Icons.Calendar2Date className="mr-3" />
              <Card.Text className="text-light">This month so far</Card.Text>
            </Card.Footer>
          </Card>
          <Card
            style={{ width: '18rem' }}
            className=" text-light mt-3 site-bg2"
          >
            <div className="d-flex justify-content-around align-items-center">
              <Icons.Calendar size={80} className="btn-default userTextColor" />
              <div>
                <h2 className="btn-default userTextColor">
                  ${userProfile.bonus ? Number(userProfile.bonus) + 2 : '0000'}
                </h2>
                <p className="text-light">Bonus rate</p>
              </div>
            </div>
            <Chart />
            <Card.Footer className="d-flex history-info justify-centent-center align-items-center btn-default">
              <Icons.Calendar2Date className="mr-3" />
              <Card.Text className="text-light">This month </Card.Text>
            </Card.Footer>
          </Card>
        </div>
        <div className="divider small_divider"></div>
        <MarketPrice />
        <div className="divider small_divider"></div>
        <section className="site-bg pt-3">
          <div className="container">
            <div className="row align-items-center mt-5">
              <div className="col-lg-6">
                <div className="action-content res_md_mb_20 ">
                  <h4 className="wow userTextColor">
                    Contact our team for more information
                  </h4>
                  <p className="m-0 ">
                    Let Us Help You to Find a Solution That Meets Your Needs
                  </p>
                </div>
              </div>
              <div className="col-lg-6 text-lg-right">
                <a href="/contacts" className="btn history-info">
                  Contact Us <i className="fa fa-long-arrow-right"></i>
                </a>
                <div className=" mt-4">
                  <h4 className="mb-2 userTextColor">
                    Easy way to buy bitcoin
                  </h4>
                  <a
                    href="https://coinmama.com"
                    className="d-inline-block ml-1"
                  >
                    Coinmama
                  </a>
                  <a href="https://paxful.coin" className="d-inline-block ml-1">
                    Paxful
                  </a>
                  <a href="https://bitpay.com" className="d-inline-block ml-1">
                    Bitpay
                  </a>
                  <a
                    href="https://coinbase.com"
                    className="d-inline-block ml-1"
                  >
                    Coinbase
                  </a>
                  <a href="https://luno.com" className="d-inline-block ml-1">
                    Luno
                  </a>
                  <a
                    href="https://bitcoins.com"
                    className="d-inline-block ml-1"
                  >
                    Bitcoins
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p className="copyright">
                    Copyright &copy; UltimateCoins {new Date().getFullYear()}{' '}
                    All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default User
