import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function UserPlans() {
  const { push } = useHistory()
  const dispatch = useDispatch()

  const handleReceivedPayment = (bool, price) => {
    dispatch({ type: 'PAYMENT_SET', amount: price, qrcode: bool })
    push('/payments')
  }

  return (
    <>
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 offset-lg-2">
                <div className="title_default_dark title_border text-center">
                  <h4
                    className="animation text-light"
                    data-animation="fadeInUp"
                    data-animation-delay="0.2s"
                  >
                    Choose Your Plan
                  </h4>
                </div>
              </div>
            </div>
            <div className="row small_space">
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_20">
                  <div className="pr_title blue_light_bg">
                    <h3>Basic</h3>
                    <div className="price_tage">
                      <h3>$3000.00</h3>
                      <span>Token plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$200</li>
                      <li>Initial Withdrawal</li>
                      <li>$3900</li>
                      <li>Bonus</li>
                      <li>$30</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '200')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_30">
                  <div className="pr_title pink_bg">
                    <h3>Standard</h3>
                    <div className="price_tage">
                      <h3>$3000.00</h3>
                      <span>Token plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$400</li>
                      <li>Initial Withdrawal</li>
                      <li>$2900</li>
                      <li>Bonus</li>
                      <li>$50</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '400')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_30">
                  <div className="pr_title yellow_bg">
                    <h3>Untimate</h3>
                    <div className="price_tage">
                      <h3>$5000.00</h3>
                      <span>Token Plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$500</li>
                      <li>Initial Withdrawal</li>
                      <li>$3900</li>
                      <li>Bonus</li>
                      <li>$70</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '500')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 offset-lg-2">
                <div className="title_default_dark title_border text-center">
                  <h4
                    className="animation text-light"
                    data-animation="fadeInUp"
                    data-animation-delay="0.2s"
                  >
                    Special Plans
                  </h4>
                </div>
              </div>
            </div>
            <div className="row small_space">
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_20">
                  <div className="pr_title blue_light_bg">
                    <h3>Basic</h3>
                    <div className="price_tage">
                      <h3>$8000.00</h3>
                      <span>Token plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$900</li>
                      <li>Initial Withdrawal</li>
                      <li>$9900</li>
                      <li>Bonus</li>
                      <li>$150</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      to="/user"
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '900')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_30">
                  <div className="pr_title pink_bg">
                    <h3>Standard</h3>
                    <div className="price_tage">
                      <h3>$12000.00</h3>
                      <span>Token plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$1000</li>
                      <li>Initial Withdrawal</li>
                      <li>$12900</li>
                      <li>Bonus</li>
                      <li>$250</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '1000')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 text-light">
                <div className="pricing_box text-center res_sm_mt_30">
                  <div className="pr_title yellow_bg">
                    <h3>Untimate</h3>
                    <div className="price_tage">
                      <h3>$15000.00</h3>
                      <span>Token Plan</span>
                    </div>
                  </div>
                  <div className="pr_content">
                    <ul className="list_none ">
                      <li>Normal Deposit</li>
                      <li>$1200</li>
                      <li>Initial Withdrawal</li>
                      <li>$12800</li>
                      <li>Bonus</li>
                      <li>$300</li>
                    </ul>
                  </div>
                  <div className="pr_footer">
                    <button
                      className="btn btn-default btn-radius"
                      onClick={() => handleReceivedPayment(true, '1200')}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default UserPlans
