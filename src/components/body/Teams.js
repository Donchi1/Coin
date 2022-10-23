import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../navigation/NavBar'
import Footer from './Footer'
import adv1 from '../../assets/teamguy.jpg'
import adv2 from '../../assets/teamlady.jpg'
import adv3 from '../../assets/teamguy1.jpg'
import ReuseHero from "../navigation/ReuseHero";

function Teams() {
  return (
    <>
      <NavBar />
      <ReuseHero title={"Our-Team"} style={"team-hero"} />
      <section className="header-spacing pb-4">
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
              <div className=" text-center card">
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
              <div className=" text-center card">
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
              <div className=" text-center card">
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
              <div className=" text-center card">
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
          <div className="row header-spacing">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading text-uppercase text-primary">
                  advisors
                </label>
                <h2>Our advisors and board members</h2>
                <p className="h4 text-light">
                  Meet Ultimatecoins advisers contributing greatly to success of
                  our company
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pb-45 wow fadeInUp">
              <div className="card  text-center ">
                <div className="team-img my-3">
                  <Link to="/teams">
                    <img
                      src={adv1}
                      alt="team member"
                      width={"200px"}
                      height={"200px"}
                      className=" rounded-circle"
                    />
                  </Link>
                </div>
                <div className="team-des">
                  <Link to="/teams" className="member-name text-primary py-3">
                    Moris Willium
                  </Link>
                  <p className="member-des">
                    CEO stanline gas ltd and top intestor in UltimateCoins
                    plateform
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-3">
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
            <div className="col-md-4 pb-45 wow fadeInUp">
              <div className="card team-box advisors text-center">
                <div className="team-img my-3">
                  <Link to="/teams">
                    <img
                      src={adv2}
                      alt="team member "
                      width={"200px"}
                      height={"200px"}
                      className=" rounded-circle"
                    />
                  </Link>
                </div>
                <div className="team-des">
                  <Link to="/teams" className="member-name text-primary py-3">
                    Rose Morgen
                  </Link>
                  <p className="member-des ">
                    CEO element gas ltd and top investor in UltimateCoins
                    company
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-3">
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
            <div className="col-md-4 pb-45 wow fadeInUp">
              <div className="card team-box advisors text-center">
                <div className="team-img my-3">
                  <Link to="/teams">
                    <img
                      src={adv3}
                      alt="team member"
                      width={"200px"}
                      height={"200px"}
                      className=" rounded-circle"
                    />
                  </Link>
                </div>
                <div className="team-des">
                  <Link to="/teams" className="member-name text-primary py-3">
                    Kent Pierce
                  </Link>
                  <p className="member-des">
                    Devoted client and top investor in UltimateCoins company
                  </p>
                  <ul className="pt-15 d-flex justify-content-around pb-3">
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Teams
