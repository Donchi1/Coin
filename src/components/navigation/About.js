import React from "react";

import { Link } from "react-router-dom";
import Footer from "../body/Footer";
import Testimonials from "../body/Testimonials";

import NavBar from "../navigation/NavBar";
import myVideo from "../../assets/video/teaching.mp4";
import work from "../../assets/laptop.jpg";
import ReuseHero from "../navigation/ReuseHero";

function About() {
  return (
    <>
      <NavBar />
      <ReuseHero title={"About-Us"} style={"about-hero"} />

      <section className="header-spacing ptb-100">
        <div className="container">
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

      <section className="about-main card-bg-new ptb-100 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 flex-align mb-r-30 wow fadeInLeft">
              <div className="work-box">
                <h3 className="work-process-title pb-25 userTextColor py-4">
                  Our Mission
                </h3>
                <p className="about-des pb-20 ">
                  Make your investment today and stand out among others{" "}
                </p>

                <p className="work-des">
                  We are here to provide a means of global investments for
                  people of low and high income round the whole world. Our
                  mission is to make sure all, low and high income earners make
                  the best of what they earn by investing little and earning
                  big. We make sure your earning increases prior to the choosen
                  investment plan . We make sure people make proper use of their
                  income, take advantage of the internet and cryptography
                  trading.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-center flex-align justify-center wow fadeInRight">
              <div className="work-box">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/about-1.jpg"
                  alt="Work Process"
                />
                <Link
                  to="#"
                  className="play-icon"
                  data-toggle="modal"
                  data-target="#form"
                >
                  <span>
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </span>
                </Link>
                <div
                  className="modal fade"
                  id="form"
                  tabIndex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <iframe
                        className="video-play"
                        src={myVideo}
                        allowFullScreen
                        title="Ultimatecoins Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-main card-bg-new pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 text-center flex-align justify-center order-r-2 wow fadeInLeft">
              <div className="work-box">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/about-2.png"
                  alt="Work Process"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 flex-align mb-r-30 order-r-1 wow fadeInRight">
              <div className="work-box">
                <h3 className="work-process-title py-2  userTextColor">
                  Why are so many people investing Digital currencies like
                  BitCoin
                </h3>

                <p className="work-des">
                  Bitcoin is different than any currency you’ve used before, so
                  it’s very important to understand some key points. You can use
                  them to send or receive any amount of money, with anyone,
                  anywhere in the world, at very low cost. Bitcoin payments are
                  impossible to block and safety. Bitcoin is different than any
                  currency you’ve used before, so it’s very important to
                  understand some key points. You can use them to send or
                  receive any amount of money, with anyone, anywhere in the
                  world, at very low cost. Bitcoin payments are impossible to
                  block and safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-part  bg-pattern pt-100 header-spacing">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading text-primary text-uppercase">
                  Meet the team
                </label>
                <h2>Our Team</h2>
                <p className="h4 text-light ">
                  Experienced leader dedicated to joint success with great
                  skills. We are multi-talented, dynamic team in mining of all
                  cryptos. we are entrepreneurs, standing out to make our
                  company and team grow. We are all committed to recruitment and
                  our client satisfaction{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 wow fadeInLeft pb-45">
              <div className="team-box advisors text-center card">
                <div className="mt-2">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-1.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a
                    href="/teams"
                    className="member-name  text-primary py-2 d-inline-block "
                  >
                    Leo Kings
                  </a>
                  <p className="member-des">
                    Founder of Venus Media Ltd and Owner of leading website for
                    affiliates in the entertainment industry TakeBucks, he is a
                    videographer, photographer and producer with a big number of
                    successful entrepreneurships under his name over the last 18
                    years.
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-4 ">
                    <li>
                      <Link to="/about">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 pb-45 wow fadeInRight">
              <div className="team-box advisors text-center card">
                <div className="mt-2">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-2.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a
                    href="/teams"
                    className="member-name  text-primary py-2 d-inline-block "
                  >
                    Loise Kelvin
                  </a>
                  <p className="member-des">
                    Loise a passionate, committed and hardworking man. A real
                    genus in cryto, working to make Ultimatecoins a top company
                    in the crypto market. Reaching out to our client at when due{" "}
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-4">
                    <li>
                      <Link to="/about">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeInLeft pb-45">
              <div className="team-box advisors text-center card">
                <div className="mt-2">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-3.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a
                    href="/teams"
                    className="member-name text-primary py-2 d-inline-block "
                  >
                    Elvis Anthony
                  </a>
                  <p className="member-des">
                    Elvis an enthuaistic,passionate and hard working yong man
                    with a 10years experience in accounting.A real genus in
                    crypto
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-4">
                    <li>
                      <Link to="/teams">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/teams">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/teams">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 pb-45 wow fadeInRight">
              <div className="team-box advisors text-center card">
                <div className="mt-2">
                  <a href="/teams">
                    <img
                      src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/team-4.jpg"
                      alt="team member"
                      className="rounded-circle"
                    />
                  </a>
                </div>
                <div className="team-des">
                  <a
                    href="/teams"
                    className="member-name  text-primary py-2 d-inline-block "
                  >
                    Olivia Fred
                  </a>
                  <p className="member-des">
                    Olivia a passionate and a genus in crypto. About 15 years
                    experience in the financial sector.Kevin has contributed
                    much to make Ultimatecoins what it is today{" "}
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-4">
                    <li>
                      <Link to="/about">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
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
      <Testimonials />
      <Footer />
    </>
  );
}

export default About;
