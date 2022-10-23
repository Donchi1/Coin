import React, { useState, useEffect } from "react";
import Footer from "../body/Footer";
import { Link } from "react-router-dom";
import Testimonials from "../body/Testimonials";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { contactAction } from "../Auths/Action";
import { useDispatch, useSelector } from "react-redux";
import work from "../../assets/laptop.jpg";
import Blogs from "../body/Blogs";
import {Snackbar} from "@material-ui/core"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const authState = useSelector((state) => state.firebase.auth);
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    phone: "",
  });
  const contactSuccess = useSelector(
    (state) => state.projectReducer.contactMessageSuccess
  );
  const userDataState = useSelector((state) => state.firebase.profile);
  const [headerStyle, setHeaderStyle] = useState("");

  const contactError = useSelector(
    (state) => state.projectReducer.contactMessageError
  );
  const [openSnack, setopenSnack] = useState(false);
  const [openSnackError, setopenSnackError] = useState(false);

  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();
    contactAction(
      userData,
      firebase,
      dispatch,
      setuserData,
      setopenSnack,
      setopenSnackError
    );
  };

  return (
    <>
      <section
        className="home-banner   header-bg-new paralax "
        id="banner"
        style={{ height: "100vh" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 vh-100  position-u d-flex direction-column align-items-center justify-content-center wow fadeInLeft animated">
              <div className="banner-contain ">
                <h2
                  className={`${headerStyle}  home-hero-title text-center align-center mb-2`}
                >
                  Invest In Ultimatecoins Way To Trade
                </h2>
                <h4 className="banner-des text-light text-center ">
                  Stable and reliable way to crypto trading
                </h4>
                <div className="btn-group mt-5 d-flex justify-content-center btn-new align-items-center  ">
                  {isLoaded(authState) &&
                  !isEmpty(authState) &&
                  userDataState?.verified ? (
                    <a href="/user/dashboard" className="btn  second-btn ">
                      Dashboard <i className="fa fa-long-arrow-right"></i>
                    </a>
                  ) : (
                    <a href="/login" className="btn  second-btn ">
                      Get started <i className="fa fa-long-arrow-right"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-part py-5 ">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 wow fadeInUp animated mb-5"
              style={{ visibility: "visible" }}
            >
              <div className="section-heading text-center pb-65">
                <label className="text-primary text-uppercase">
                  what is Ultimatecoins
                </label>
                <h2 className="heading-title  ">How it Works</h2>
                <p className=" h5 text-light">
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
              style={{ visibility: "visible" }}
            >
              <div className="work-box">
                <div className="work-box-bg"></div>
                <img
                  src={work}
                  className="mw-100 rounded w-100"
                  alt="Work Process"
                />
              </div>
            </div>
            <div
              className="col-md-6 flex-align wow fadeInRight animated"
              style={{ visibility: "visible" }}
            >
              <div className="work-box">
                <h3 className="work-process-title pb-25 userTextColor">
                  <span className="h2 text-primary">We</span>’ve built a
                  platform to buy and invest in cryptography.
                </h3>
                <p className="work-des pb-20 text-light">
                  This platform is established not for us but all who wants to
                  have a life changing investment for their future.
                </p>

                <ul className="check-list text-white">
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>register today</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>choose your investmnt plan</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>Go ahead and start earning</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vw-100 header-spacing card-bg-new ">
        <div className="container ">
          <div className="row new-row">
            <div className="col-md-12  wow text-center fadeInUp animated mb-5">
              <div className="section-heading  pb-65">
                <label className="text-primary text-uppercase">
                  UltimateCoin Feature
                </label>
                <h2>Best Features</h2>
                <p className="h5 text-light  ">
                  Our standard features that makes us the ultimate in all
                  cryptos.All for you
                </p>
              </div>
            </div>
          </div>
          <div className="row  ">
            <div className="col-12 col-lg-6 wow fadeInUp pb-80 animated ">
              <div className="feature-box">
                <div className="feature-icon mb-2 ">
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
            <div className="col-sm-12 col-lg-6 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon mb-2">
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
            <div className="col-sm-12 col-lg-6 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon mb-2">
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
            <div className="col-sm-12 col-lg-6 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon mb-2">
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
            <div className="col-sm-12 col-lg-6 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon mb-2">
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
            <div className="col-sm-12 col-lg-6 wow fadeInUp pb-80 animated">
              <div className="feature-box">
                <div className="feature-icon mb-2">
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

      <section className="header-spacing pb-4 ">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className="section-heading text-center pb-65">
                <label className="text-primary text-uppercase">
                  Investment Plans
                </label>
                <h2>Choose Your Plan</h2>
                <p className="h5 text-light">
                  Experience a standard and reliable service in crypto
                  investment
                </p>
              </div>
            </div>
          </div>
          <div className="row small_space">
            <div className="col-lg-4 col-12">
              <div
                className=" text-center card  wow fadeInLeft animated "
                style={{ visibility: "visible" }}
              >
                <div className="card-header history-info">
                  <h3>Basic</h3>
                  <div className="price_tage">
                    <h3>$3000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="  text-light">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$200</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$4900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$50</li>
                  </ul>
                </div>
                <div className="py-4 ">
                  <a href="/login" className="btn btn-primary">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div
                className=" text-center card wow fadeInUp price-pd animated "
                style={{ visibility: "visible" }}
              >
                <div className=" card-header bg-primary history-info">
                  <h3>Standard</h3>
                  <div className="price_tage">
                    <h3>$4000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="pr_content  text-light">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$400</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$7999</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$100</li>
                  </ul>
                </div>
                <div className="py-4  ">
                  <a href="/login" className="btn btn-primary">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div
                className="text-center card  wow fadeInRight price-pd animated "
                style={{ visibility: "visible" }}
              >
                <div className=" card-header history-info">
                  <h3>Untimate</h3>
                  <div className="price_tage">
                    <h3>$5000.00</h3>
                    <span>Token Plan</span>
                  </div>
                </div>
                <div className="pr_content  text-light">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$1000</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$19900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$200</li>
                  </ul>
                </div>
                <div className="py-4  ">
                  <a href="/login" className="btn btn-primary">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="header-spacing  pb-4">
        <div className="container ">
          <div className="row mb-4">
            <div className="col wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="text-primary text-uppercase">
                  Meet the team
                </label>
                <h2>Our Team</h2>
                <p className="h5 text-light">
                  Experienced leader dedicated to joint success with great
                  skills. We are multi-talented, dynamic team in mining of all
                  crypos. we are entrepreneurs, standing out to make our company
                  and team grow. We are all committed to recruitment and our
                  client satisfaction{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row mx-2 mx-lg-0 gap-2 ">
            <div className="col-12 col-lg-3 wow fadeInLeft pb-45 card  ">
              <div className="team-box advisors text-center ">
                <div className="team-img my-4">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-1.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="text-primary mt-2">
                    Leo Kings
                  </a>
                  <p className="member-des text-light">
                    Founder of Venus Media Ltd and Owner of leading website for
                    affiliates in the entertainment industry TakeBucks,
                    successful entrepreneurships under his name over the last 18
                    years.
                  </p>
                  <ul className="pt-15 d-flex justify-content-around align-items-center mb-2">
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
            <div className="col-12 col-lg-3 pb-45 wow fadeInRigh card ">
              <div className="team-box advisors text-center">
                <div className="team-img my-4">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-2.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="text-primary mt-2 ">
                    Loise Kelvin
                  </a>
                  <p className="member-des text-light">
                    Loise a passionate, committed and hardworking man. A real
                    genus in crypto, working to make Ultimatecoins a top company
                    in the crypto market with all his strength and resources.{" "}
                  </p>
                  <ul className="pt-15 d-flex justify-content-around align-items-center mb-2">
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
            <div className="col-12 col-lg-3 wow fadeInLeft pb-45 card ">
              <div className="team-box advisors text-center">
                <div className="team-img my-4">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-3.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a href="/teams" className="text-primary mt-2nav-color">
                    Elvis Anthony
                  </a>
                  <p className="member-des text-light">
                    Elvis an enthuaistic,passionate and hard working young man
                    with a 10years experience in accounting.A real genus in
                    crypto working together with all other teams to satisfy our
                    clients.
                  </p>
                  <ul className="pt-15 d-flex justify-content-around align-items-center mb-2">
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
            <div className="col-12 col-lg-3 pb-45 wow fadeInRigh card ">
              <div className="team-box advisors text-center ">
                <div className="team-img my-4  ">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-4.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des ">
                  <a href="/teams" className="text-primary mt-2nav-color">
                    Olivia Fred
                  </a>
                  <p className="member-des text-light">
                    Olivia a passionate and a genus in crypto. About 15 years
                    experience in the financial sector.Olivia has contributed
                    much to make Ultimatecoins what it is today with all her
                    acquired resources{" "}
                  </p>
                  <ul className="pt-15 d-flex justify-content-around align-items-center mb-2">
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
        className="token-sale  parallax ptb-100 "
        style={{ height: "80vh" }}
      >
        <div className="containe">
          <div
            className="row d-flex direction-column  justify-content-center align-items-center "
            style={{ height: "80vh" }}
          >
            <div className="col-lg-6 wow fadeInLeft flex-align card-bg-new1 h-100">
              <div className=" mx-auto text-light  " style={{ width: "70%" }}>
                <div className="section-heading pt-5">
                  <label className="sub-heading text-secondary">
                    Market Info
                  </label>
                  <h2 className="heading-title userTextColor">Market Data</h2>
                  <p className="h4 text-light">
                    We have a heigh market value and statistic because of our
                    firm and stability
                  </p>
                </div>
                <div className="token-graphic-detail">
                  <ul>
                    <li className="color-code-1 mt-3">73% Finacial Overhead</li>
                    <li className="color-code-2 mt-3">55% Bonus & found</li>
                    <li className="color-code-3 mt-3">
                      12% Gift Code Inventory
                    </li>
                    <li className="color-code-4 mt-3">
                      32% Bounty and Overhead
                    </li>
                    <li className="color-code-5 mt-3">38% it infastrueture</li>
                    <li className="color-code-5 mt-3">39% currency exchange</li>
                    <li className="color-code-5 mt-3">50% Fund refunds</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 flex-align justify-center-r token-bg-new h-100"></div>
          </div>
        </div>
      </section>
      <Testimonials />
      <Blogs />

      <section className="header-spacing pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInLeft flex-bottom order-r-2">
              <div className="ico-apps-img  text-center ">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/ico-img.png"
                  alt="mobile apps"
                  className="app-img"
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInRight pb-100 order-r-1">
              <div className="section-heading pb-20">
                <label className="text-primary">UltimateCoins apps</label>
                <h2 className="heading-title userTextColor">
                  UltimateCoins Mobile App
                </h2>
                <p className="banner-des sub-head text-light pb-20">
                  The use of crypto-currencies has become more widespread, and
                  they are now increasingly accepted as a legitimate currency
                  for transactions.
                </p>

                <ul className="check-list mb-30">
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>Crypto-news curation</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>Natural Language Understanding</p>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>{" "}
                    <p>buying and standard investments</p>
                  </li>
                </ul>
                <Link to="/" className="btn btn-primary text-uppercase">
                  get the app now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="header-spacing pb-4">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="text-uppercase text-primary">Faqs</label>
                <h2>Frequently Asked questions</h2>
                <p className="h4 text-light">
                  Frequently asked questions (FAQ) or Questions and Answers
                  (Q&A), are listed questions and answers, all supposed to be
                  commonly asked in some context
                </p>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12 wow fadeInUp">
              <ul
                className="nav nav-tabs d-flex justify-content-center align-items-center py-4 text-uppercase "
                id="myTab"
                role="tablist"
              >
                <li className="mr-4">
                  <a
                    className="active text-primary"
                    data-toggle="tab"
                    href="#general"
                    role="tab"
                  >
                    general
                  </a>
                </li>
                <li className="mr-4">
                  {" "}
                  <a
                    data-toggle="tab"
                    href="#ico"
                    role="tab"
                    className="text-primary"
                  >
                    Ultimatecoins info
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    data-toggle="tab"
                    href="#Tokens"
                    role="tab"
                    className="text-primary"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    data-toggle="tab"
                    href="#client"
                    role="tab"
                    className="text-primary"
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
                          What cryptocurrencies can I use to purchase?{" "}
                        </a>
                        <p className="qus-des pt-10 text-light">
                          All the crypto currencies are good for your
                          investments, you can purchase any for your trading but
                          Bitcoin in the most popular.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
                          What is bitcoin?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          Bitcoin is a form of digital currency which is based
                          on a created open source code held electronically.{" "}
                          <br />
                          Bitcoin is a decentralized form of currency meaning
                          that it does not belong to any government and it is
                          not controlled by one.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faql" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                          Bitcoin is backed by mathematics.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 pb-65">
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
                          What cryptocurrencies can I use to purchase?{" "}
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
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
                      <div className="mt-2">
                        <a href="/faq" className="qus-title text-light h3">
                          Is Bitcoin legal?
                        </a>
                        <p className="qus-des pt-10 text-light">
                          To the best of our knowledge, Bitcoin has not been
                          made illegal by legislation in most jurisdictions.
                          However, some jurisdictions (such as Argentina and
                          Russia) severely restrict or ban foreign currencies.
                          Other jurisdictions (such as Thailand) may limit the
                          licensing of certain entities such as Bitcoin
                          exchanges.{" "}
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
      <section className="header-spacing pb-4">
        <Snackbar
          onClose={() => setopenSnack(false)}
          open={openSnack}
          message={contactSuccess}
          className="text-light text-warning"
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        ></Snackbar>
        <Snackbar
          onClose={() => setopenSnack(false)}
          open={openSnackError}
          message={contactError}
          className="text-light text-warning"
          autoHideDuration={5000}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        ></Snackbar>
        <div className="container">
          <div className="row">
            <div className="col-md-6 wow fadeInLeft">
              <div className="section-heading">
                <h2 className="heading-title-2 pb-20 userTextColor">
                  Contact Us
                </h2>
                <p className="banner-des sub-head text-light">
                  We standout firm and strong to reach out to our
                  clients.Contact us if you have any issue,complain or confusion
                </p>
              </div>
              <ul className="contact-detail ">
                <li className="text-primary mb-2">
                  <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                  <a href="tel:+1(453)945-8896" className="text-light">
                    +1(453)945-8896
                  </a>
                </li>
                <li className="text-primary mb-2">
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>{" "}
                  <a
                    href="https://wa.me/+1(876)285-4050"
                    className="text-light"
                  >
                    +1(876)285-4050
                  </a>
                </li>
                <li className="text-primary mb-2">
                  <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                  <a
                    href="mailto:support@ultimatecoins.info"
                    className="text-light"
                  >
                    support@ultimatecoins.info
                  </a>
                </li>
                <li className="text-primary mb-2">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  <span className="text-light">
                    Headley Ln, Dorking RH5 6DF, US 7M7P+96 Taxes, United States
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 wow fadeInRight">
              <h3 className="py-3">Leave a message here</h3>
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
  );
}

export default Home;
