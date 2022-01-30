import React, { useState, useEffect } from 'react'
import Footer from '../body/Footer'
import { Link } from 'react-router-dom'
import Testimonials from '../body/Testimonials'
import { isEmpty, isLoaded, useFirebase } from 'react-redux-firebase'
import { contactAction } from '../Auths/Action'
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar } from '@material-ui/core'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Home() {
  const authState = useSelector((state) => state.firebase.auth)
  const [userData, setuserData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
    phone: '',
  })
  const contactSuccess = useSelector(
    (state) => state.projectReducer.contactMessageSuccess,
  )
  const userDataState = useSelector((state) => state.firebase.profile)
  const contactError = useSelector(
    (state) => state.projectReducer.contactMessageError,
  )
  const [openSnack, setopenSnack] = useState(false)
  const [openSnackError, setopenSnackError] = useState(false)
  const [show, setShow] = useState(4)

  const dispatch = useDispatch()
  const firebase = useFirebase()

  const slickOption = {
    slidesToShow: show,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
  }

  useEffect(() => {
    const isSmall = window.matchMedia('screen and (max-width: 960px)')
    if (isSmall.matches) {
      setShow(1)
    } else {
      setShow(4)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    contactAction(
      userData,
      firebase,
      dispatch,
      setuserData,
      setopenSnack,
      setopenSnackError,
    )
  }

  return (
    <>
      <section
        className="home-banner  site-bg header-bg-new paralax "
        id="banner"
        style={{ height: '80%', backgroundPosition: '50%' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 position-u flex-align wow fadeInLeft animated">
              <div className="banner-contain">
                <h1 className="banner-heading text-primary">
                  Invest In Ultimatecoins Way To Trade
                </h1>
                <p className="banner-des text-light">
                  Stable and reliable way to crypto trading
                </p>
                <div className="btn-group">
                  {isLoaded(authState) &&
                  !isEmpty(authState) &&
                  userDataState?.verificationCode ? (
                    <a
                      href="/user/dashboard"
                      className="btn bg-primary text-light"
                    >
                      Dashboard <i className="fa fa-long-arrow-right"></i>
                    </a>
                  ) : (
                    <>
                      <a href="/login" className="btn bg-primary text-light">
                        Get started <i className="fa fa-long-arrow-right"></i>
                      </a>
                      <div className="ml-3 ">
                        <a
                          href="/signup"
                          className="btn bg-secondary btn-radius text-light"
                        >
                          Register <i className="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 position-u wow fadeInRight animated">
              <div className="banner-img">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/banner-img.png"
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-part site-bg ptb-100">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 wow fadeInUp animated"
              style={{ visibility: 'visible' }}
            >
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">what is Ultimatecoins</label>
                <h2 className="heading-title userTextColor">How it Works</h2>
                <p className="heading-des">
                  Ultimatecoins is one of the most transformative technologies
                  since the invention of the Internet. Ultimatecoins stands
                  firmly in support of financial freedom and the liberty that
                  Bitcoin provides globally for anyone to voluntarily
                  participate in a permissionless and decentralized network.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 text-center flex-align justify-center wow fadeInLeft animated"
              style={{ visibility: 'visible' }}
            >
              <div className="work-box">
                <div className="work-box-bg"></div>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/work-process.png"
                  className="rotation-img"
                  alt="Work Process"
                />
              </div>
            </div>
            <div
              className="col-md-6 flex-align wow fadeInRight animated"
              style={{ visibility: 'visible' }}
            >
              <div className="work-box">
                <h3 className="work-process-title pb-25 userTextColor">
                  We’ve built a platform to buy and invest in cryptography.
                </h3>
                <p className="work-des pb-20">
                  This platform is established not for us but all who wants to
                  have a life changing investment for their future.
                </p>

                <ul className="check-list">
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>register today</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>choose your investmnt plan</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>Go ahead and start earning</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-part site-bg bg-pattern pt-100 pb-10">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12 wow text-center fadeInUp animated">
              <div className="section-heading  pb-65">
                <label className="sub-heading">UltimateCoin Feature</label>
                <h2 className="heading-title userTextColor">Best Features</h2>
                <p className="heading-des">
                  Our standard features that makes us the ultimate in all
                  cryptos.All for you
                </p>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12 col-lg-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon ">
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-1.png"
                    alt="Safe & Secure"
                  />
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Safe & Secure
                  </a>
                  <p className="feature-des">
                    We provide you with a safe and stable platform for your
                    crypto trading.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon">
                  <a href="/features">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-2.png"
                      alt="Early Bonus"
                    />
                  </a>
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Early Bonus
                  </a>
                  <p className="feature-des">
                    Getting a daily bonus is very easy.Our registration bonus is
                    $20, while you can get more bonus prior to your choosen
                    investment plan
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon">
                  <a href="/features">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-3.png"
                      alt="Univarsal Access"
                    />
                  </a>
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Univarsal Access
                  </a>
                  <p className="feature-des">
                    We provide and open platform and stable network for your
                    investment from all parts of the world
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon">
                  <a href="/features">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-4.png"
                      alt="Secure Storage"
                    />
                  </a>
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Secure Storage
                  </a>
                  <p className="feature-des">
                    Bitcoin is received, stored, and sent using software known
                    as a Bitcoin Wallet. There are many variations of wallets
                    but we give you a standard and trusted wallet.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon">
                  <a href="/features">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-5.png"
                      alt="Low Cost"
                    />
                  </a>
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Low Cost
                  </a>
                  <p className="feature-des">
                    The little investment you do is capable of setting you in
                    the apex of great wealth
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon">
                  <a href="/feature">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/feature-6.png"
                      alt="Several Profit"
                    />
                  </a>
                </div>
                <div className="feature-contain pt-25">
                  <a
                    href="/features"
                    className="feature-title pb-15 userTextColor"
                  >
                    Several Profit
                  </a>
                  <p className="feature-des">
                    We provide you with series of ways to get more profits. The
                    little you invest is a booster for a heigh profit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline site-bg ptb-100">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 wow fadeInUp animated"
              style={{ visibility: 'visible' }}
            >
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">roadmap</label>
                <h2 className="heading-title userTextColor">The Timeline</h2>
                <p className="heading-des">
                  The use of crypto-currencies has become more widespread, and
                  they are now increasingly accepted as a legitimate currency
                  for transactions.
                </p>
              </div>
            </div>
          </div>
          <div className="main-roadmap">
            <div className="row">
              <div className="col-md-12">
                <div className="h-border wow fadeInLeft   "></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="roadmap-slider">
                  <div className="owl-stage-outer">
                    <div className="owl-stage">
                      <div>
                        <div className="wow roadmap  fadeInLeft">
                          <div className="roadmap-box text-center">
                            <div className="date-title">March 2018</div>
                            <div className="map-graphic">
                              <div className="small-round">
                                <span></span>
                              </div>
                              <div className="v-row"></div>
                            </div>
                            <div className="roadmap-detail-box">
                              <p>Initial Coin Distribution & maketing </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="wow roadmap  fadeInLeft">
                          <div className="roadmap-box text-center">
                            <div className="date-title">April 2018</div>
                            <div className="map-graphic">
                              <div className="small-round">
                                <span></span>
                              </div>
                              <div className="v-row"></div>
                            </div>
                            <div className="roadmap-detail-box">
                              <p>Exchange Bitcontent to Bitcoin investments</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="wow roadmap  fadeInLeft">
                          <div className="roadmap-box text-center">
                            <div className="date-title">May 2018</div>
                            <div className="map-graphic">
                              <div className="small-round">
                                <span></span>
                              </div>
                              <div className="v-row"></div>
                            </div>
                            <div className="roadmap-detail-box">
                              <p>Online trading and investments</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="wow roadmap  fadeInLeft">
                          <div className="roadmap-box text-center">
                            <div className="date-title">August 2018</div>
                            <div className="map-graphic">
                              <div className="small-round">
                                <span></span>
                              </div>
                              <div className="v-row"></div>
                            </div>
                            <div className="roadmap-detail-box">
                              <p>Coin Marketcap, World Coin Index</p>
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
      </section>
      <section className="site-bg pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">Investment Plans</label>
                <h2 className="heading-title userTextColor">
                  Choose Your Plan
                </h2>
                <p className="heading-des">
                  Experience a standard and reliable service in crypto
                  investment
                </p>
              </div>
            </div>
          </div>
          <div className="row small_space">
            <div className="col-lg-4 col-md-4">
              <div
                className=" text-center card bg-secondary wow fadeInLeft animated "
                style={{ visibility: 'visible' }}
              >
                <div className="card-header history-info">
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
                    <li className="py-2">$4900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$50</li>
                  </ul>
                </div>
                <div className="py-4">
                  <a
                    href="/login"
                    className="btn btn-default btn-radius history-info"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div
                className=" text-center card bg-secondary wow fadeInUp price-pd animated "
                style={{ visibility: 'visible' }}
              >
                <div className=" card-header history-info">
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
                  <a
                    href="/login"
                    className="btn btn-default btn-radius history-info"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div
                className="text-center card bg-secondary wow fadeInRight price-pd animated "
                style={{ visibility: 'visible' }}
              >
                <div className=" card-header history-info">
                  <h3>Untimate</h3>
                  <div className="price_tage">
                    <h3>$5000.00</h3>
                    <span>Token Plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$1000</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$19900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$200</li>
                  </ul>
                </div>
                <div className="py-4">
                  <a
                    href="/login"
                    className="btn btn-default btn-radius history-info"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team-part site-bg bg-pattern pt-100 pb-55">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">meet the team</label>
                <h2 className="heading-title userTextColor">Our Team</h2>
                <p className="heading-des">
                  Experienced leader dedicated to joint success with great
                  skills. We are multi-talented, dynamic team in mining of all
                  crypos. we are entrepreneurs, standing out to make our company
                  and team grow. We are all committed to recruitment and our
                  client satisfaction{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 wow fadeInLeft pb-45">
              <div className="team-box flex-align ">
                <div className="team-img">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-1.jpg"
                      alt="team member"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="member-name nav-color">
                    Leo Kings
                  </a>
                  <p className="member-des">
                    Founder of Venus Media Ltd and Owner of leading website for
                    affiliates in the entertainment industry TakeBucks, he is a
                    videographer, photographer and producer with a big number of
                    successful entrepreneurships under his name over the last 18
                    years.
                  </p>
                  <ul className="pt-15">
                    <li>
                      <Link to="/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 pb-45 wow fadeInRight">
              <div className="team-box flex-align">
                <div className="team-img">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-2.jpg"
                      alt="team member"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="member-name nav-color">
                    Loise Kelvin
                  </a>
                  <p className="member-des">
                    Loise a passionate, committed and hardworking man. A real
                    genus in cryto, working to make Ultimatecoins a top company
                    in the crypto market. Reaching out to our client at when due{' '}
                  </p>
                  <ul className="pt-15">
                    <li>
                      <Link to="/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeInLeft pb-45">
              <div className="team-box flex-align">
                <div className="team-img">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-3.jpg"
                      alt="team member"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="member-name nav-color">
                    Elvis Anthony
                  </a>
                  <p className="member-des">
                    Elvis an enthuaistic,passionate and hard working yong man
                    with a 10years experience in accounting.A real genus in
                    crypto
                  </p>
                  <ul className="pt-15">
                    <li>
                      <Link to="/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 pb-45 wow fadeInRight">
              <div className="team-box flex-align">
                <div className="team-img">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-4.jpg"
                      alt="team member"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="member-name nav-color">
                    Olivia Fred
                  </a>
                  <p className="member-des">
                    Olivia a passionate and a genus in crypto. About 15 years
                    experience in the financial sector.Kevin has contributed
                    much to make Ultimatecoins what it is today{' '}
                  </p>
                  <ul className="pt-15">
                    <li>
                      <Link to="/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tokensale-part"
        className="token-sale token-bg-new parallax ptb-100"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft flex-align">
              <div className="w-100">
                <div className="section-heading pb-20">
                  <label className="sub-heading">Market Info</label>
                  <h2 className="heading-title userTextColor">Market Data</h2>
                  <p className="heading-des">
                    We have a heigh market value and statistic because of our
                    firm and stability
                  </p>
                </div>
                <div className="token-graphic-detail">
                  <ul>
                    <li className="color-code-1">73% Finacial Overhead</li>
                    <li className="color-code-2">55% Bonus & found</li>
                    <li className="color-code-3">12% Gift Code Inventory</li>
                    <li className="color-code-4">32% Bounty and Overhead</li>
                    <li className="color-code-5">38% it infastrueture</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 flex-align justify-center-r">
              <div className="token-graph w-100">
                <div className="donut">
                  <div data-lcolor="#f8c04e">12.2</div>
                  <div data-lcolor="#ac56f7">32.6</div>
                  <div data-lcolor="#61f89f">38.2</div>
                  <div data-lcolor="#5ad6f8">55.2</div>
                  <div data-lcolor="#f85d77">73.2</div>
                </div>
                <div className="graph-logo">
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/fav-icon.png"
                    alt="Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <section className="blog-part site-bg ptb-100 bg-pattern">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">news</label>
                <h2 className="heading-title userTextColor">Our Blog</h2>
                <p className="heading-des">
                  We give oppurtunity blogs as a means of information
                  transmission and contribution to our services
                </p>
              </div>
            </div>
          </div>

          <Slider {...slickOption} swipeToSlide swipe arrows={false}>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Blockchain information
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by Admin</li>
                </ul>
                <p className="blog-des">
                  The crypto markets continued to build on April's gains this
                  week, with alternative cryptocurrencies like nano, VeChain and
                  bytecoin leading the way. The Enterprise Blockchain Gap A
                  number of large corporations, including Microsoft, IBM,
                  Oracle, and SAP, have started to take notice of, and invest
                  in, blockchain technology. Enterprise customers are interested
                  in the blockchain because it can help reduce fraud, increase
                  transparency, and provide secure record keeping.{' '}
                </p>
                <Link to="/" className="read-more userTextColor">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Mostly updates
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by Elvis Kings </li>
                </ul>
                <p>
                  The standard of our system is allways stable because of our
                  monthly updates
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title">
                  Ultimatecoins made for empowerment and change
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by Jame Leo</li>
                </ul>
                <p>
                  Ultimatecoins is really a life changing plateform. Invest the
                  little you have and see the multiplication
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  client satisfaction
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by john Lucas</li>
                </ul>
                <p className="blog-des">
                  We make sure the standard of our platform is kept by making
                  sure our clients are heighly satisfied{' '}
                </p>
                <Link to="/" className="read-more userTextColor">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Ultimatecoins most popular plateform
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by jame Elvis</li>
                </ul>
                <p>
                  Ultimatecoins is one of the known investment platform of the
                  world
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Standard service and investment
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by Gorge luke</li>
                </ul>
                <p>
                  Investment network is strong and secured to keep you going
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <a href="/blog">
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                    alt="blog"
                  />
                </a>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Ultimatecoins and security
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by Jude Clem</li>
                </ul>
                <p className="blog-des">
                  The standard security of this platform made them the best
                  among all
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span href="/blogs">
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title userTextColor">
                  Rist bearing and stability
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by john Mark</li>
                </ul>
                <p>
                  The stands firm amd strong, managing there plateform and
                  handling all events accurately
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
            <div className="blog-box wow fadeInUp">
              <div className="blog-img mb-15">
                <span>
                  <img
                    src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                    alt="blog"
                  />
                </span>
              </div>
              <div className="blog-des-box">
                <Link to="/" className="blog-title nav-color">
                  Buying and investments
                </Link>
                <ul className="blog-date">
                  <li>March 20,2019</li>
                  <li>by john Anthony</li>
                </ul>
                <p>
                  Working in hand with other cryto platforms has made it easy
                  for buying and investing.
                </p>
                <Link to="/" className="read-more nav-color">
                  Read More
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section className="ico-apps parallax-2 site-bg pt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft flex-bottom order-r-2">
              <div className="ico-apps-img w-100 text-center">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/ico-img.png"
                  alt="mobile apps"
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight pb-100 order-r-1">
              <div className="section-heading pb-20">
                <label className="sub-heading">UltimateCoins apps</label>
                <h2 className="heading-title userTextColor">
                  UltimateCoins Mobile App
                </h2>
                <p className="heading-des pb-20">
                  The use of crypto-currencies has become more widespread, and
                  they are now increasingly accepted as a legitimate currency
                  for transactions.
                </p>

                <ul className="check-list mb-30">
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>Crypto-news curation</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>Natural Language Understanding</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{' '}
                    <p>buying and standard investments</p>
                  </li>
                </ul>
                <Link to="/" className="btn history-info">
                  get the app now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-part site-bg pt-100 bg-pattern">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">Faqs</label>
                <h2 className="heading-title userTextColor">
                  Frequently Asked questions
                </h2>
                <p className="heading-des">
                  Frequently asked questions (FAQ) or Questions and Answers
                  (Q&A), are listed questions and answers, all supposed to be
                  commonly asked in some context
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <ul
                className="nav nav-tabs Frequently-tabs pb-55"
                id="myTab"
                role="tablist"
              >
                <li>
                  <a
                    className="active userTextColor"
                    data-toggle="tab"
                    href="#general"
                    role="tab"
                  >
                    general
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    href="#ico"
                    role="tab"
                    className="userTextColor"
                  >
                    Ultimatecoins info
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    href="#Tokens"
                    role="tab"
                    className="userTextColor"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    href="#client"
                    role="tab"
                    className="userTextColor"
                  >
                    client
                  </a>
                </li>
                <li>
                  <a
                    data-toggle="tab"
                    href="#legal"
                    role="tab"
                    className="userTextColor"
                  >
                    legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="general"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What is UltimateCoin?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Ultimatecoins is an investment platform based in the
                          united state. We provide you a means of global
                          investment through crypto trading. We are here to make
                          sure all low and and heigh income earners make the
                          best off there income.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What cryptocurrencies can I use to purchase?{' '}
                        </a>
                        <p className="qus-des pt-10 text-light">
                          All the crypto currencies are good for your
                          investments, you can purchase any for your trading but
                          Bitcoin in the most popular.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          How can I participate in the UltimateCoins sale?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          The best way to participate in our platform is to buy
                          any of the accepted cryptocurrencies and invest prior
                          to our investment plans
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          How do I benefit from the UltimateCoin Plan?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          The plan you purchase is for your earnings. The
                          heigher your investment the heigher your earning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="ico" role="tabpanel">
                  <div className="row">
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          How long will i get return after UltimateCoin
                          investment ?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          All investments are stable and transparent.You get
                          your earning 24hour after your investment.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What is bitcoin?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Bitcoin is a form of digital currency which is based
                          on a created open source code held electronically.{' '}
                          <br />
                          Bitcoin is a decentralized form of currency meaning
                          that it does not belong to any government and it is
                          not controlled by one.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          Can I make money with Bitcoin?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          You should never expect to get rich with Bitcoin or
                          any emerging technology. It is always important to be
                          wary of anything that sounds too good to be true or
                          disobeys basic economic rules.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="Tokens" role="tabpanel">
                  <div className="row">
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faql" className="qus-title userTextColor">
                          What happens when bitcoins are lost?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          When a user loses his wallet, it has the effect of
                          removing money out of circulation. Lost bitcoins still
                          remain in the block chain just like any other
                          bitcoins. However, lost bitcoins remain dormant
                          forever because there is no way for anybody to find
                          the private key(s) that would allow them to be spent
                          again. Because of the law of supply and demand, when
                          fewer bitcoins are available, the ones that are left
                          will be in higher demand and increase in value to
                          compensate.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          Who controls the Bitcoin network?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Nobody owns the Bitcoin network much like no one owns
                          the technology behind email. Bitcoin is controlled by
                          all Bitcoin users around the world. While developers
                          are improving the software, they can't force a change
                          in the Bitcoin protocol because all users are free to
                          choose what software and version they use.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          How are bitcoins created?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          New bitcoins are generated by a competitive and
                          decentralized process called "mining". This process
                          involves that individuals are rewarded by the network
                          for their services. Bitcoin miners are processing
                          transactions and securing the network using
                          specialized hardware and are collecting new bitcoins
                          in exchange.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="client" role="tabpanel">
                  <div className="row">
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          Why do bitcoins have value?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Bitcoins have value because they are useful as a form
                          of money. Bitcoin has the characteristics of money
                          (durability, portability, fungibility, scarcity,
                          divisibility, and recognizability) based on the
                          properties of mathematics rather than relying on
                          physical properties (like gold and silver) or trust in
                          central authorities (like fiat currencies). In short,
                          Bitcoin is backed by mathematics.{' '}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What determines bitcoin's price?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          The price of a bitcoin is determined by supply and
                          demand. When demand for bitcoins increases, the price
                          increases, and when demand falls, the price falls.
                          There is only a limited number of bitcoins in
                          circulation and new bitcoins are created at a
                          predictable and decreasing rate.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          Can bitcoins become worthless?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Yes. History is littered with currencies that failed
                          and are no longer used, such as the German Mark during
                          the Weimar Republic and, more recently, the Zimbabwean
                          dollar.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What are Cryptocurrencies?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          The best cryptocurrency to buy is one we are willing
                          to hold onto even if it goes down. For example, I
                          believe in Steem enough that I am willing to hold it
                          even if it goes down 99% and would start buying more
                          of it if the price dropped.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="legal" role="tabpanel">
                  <div className="row">
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          What cryptocurrencies can I use to purchase?{' '}
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Text of the printing and typesetting industry. Lorem
                          Ipsum has been the industry's standard dummy text ever
                          since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen book.
                          remaining essentially unchanged.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          How does one acquire bitcoins?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          While it may be possible to find individuals who wish
                          to sell bitcoins in exchange for a credit card or
                          PayPal payment, most exchanges do not allow funding
                          via these payment methods. This is due to cases where
                          someone buys bitcoins with PayPal, and then reverses
                          their half of the transaction. This is commonly
                          referred to as a chargeback.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="faq-tab">
                        <a href="/faq" className="qus-title userTextColor">
                          Is Bitcoin legal?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          To the best of our knowledge, Bitcoin has not been
                          made illegal by legislation in most jurisdictions.
                          However, some jurisdictions (such as Argentina and
                          Russia) severely restrict or ban foreign currencies.
                          Other jurisdictions (such as Thailand) may limit the
                          licensing of certain entities such as Bitcoin
                          exchanges.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form site-bg ptb-100">
        <Snackbar
          onClose={() => setopenSnack(false)}
          open={openSnack}
          message={contactSuccess}
          className="text-light text-warning"
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        ></Snackbar>
        <Snackbar
          onClose={() => setopenSnack(false)}
          open={openSnackError}
          message={contactError}
          className="text-light text-warning"
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        ></Snackbar>
        <div className="container">
          <div className="row">
            <div className="col-md-6 wow fadeInLeft">
              <div className="section-heading">
                <h2 className="heading-title-2 pb-20 userTextColor">
                  Contact Us
                </h2>
                <p className="heading-des">
                  We standout firm and strong to reach out to our
                  clients.Contact us if you have any issue,complain or confusion
                </p>
              </div>
              <ul className="contact-detail">
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                  <a href="tel:+1(453)945-8896">+1(453)945-8896</a>
                </li>
                <li>
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>{' '}
                  <span>+1(423)900-8606</span>
                </li>
                <li>
                  <i className="fa fa-envelope" aria-hidden="true"></i>{' '}
                  <a href="mailto:support@ultimatecoins.info">
                    support@ultimatecoins.info
                  </a>
                </li>
                <li>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{' '}
                  <span>
                    Headley Ln, Dorking RH5 6DF, US 7M7P+96 Taxes, United States
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 wow fadeInRight">
              <h3 className="blog-comment-heading userTextColor">
                Leave a message here
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name*"
                        onChange={(e) =>
                          setuserData({ ...userData, name: e.target.value })
                        }
                        value={userData.name}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email*"
                        required
                        onChange={(e) =>
                          setuserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject*"
                        required
                        onChange={(e) =>
                          setuserData({ ...userData, subject: e.target.value })
                        }
                        value={userData.subject}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone*"
                        onChange={(e) =>
                          setuserData({ ...userData, phone: e.target.value })
                        }
                        value={userData.phone}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Massage*"
                        onChange={(e) =>
                          setuserData({ ...userData, message: e.target.value })
                        }
                        value={userData.message}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="btn history-info">submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
