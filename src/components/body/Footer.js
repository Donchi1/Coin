import React, { useState } from "react";

import { newsLetterAction } from "../Auths/Action";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";


import { Link } from "react-router-dom";

function Footer() {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const firebase = useFirebase();
  const letterSuccess = useSelector(
    (state) => state.projectReducer.subcriptionSuccess
  );
  const letterError = useSelector(
    (state) => state.projectReducer.subcriptionError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    newsLetterAction(input, firebase, dispatch, setInput);
  };

  return (
    <>
      <section className="card-bg-new " style={{ height: "70vh" }}>
        <div className="container ">
          <div className="foote">
            <div
              className="row d-flex justify-content-center align-items-center "
              style={{ height: "70vh" }}
            >
              <div className="col-lg-4 col-md-6 ">
                <div className="footer-logo pb-25">
                  <a href="/">
                    <h2 className="sub-heading text-primary ">
                      <span className="u-design">U</span>
                      ltimateCoins
                    </h2>
                  </a>
                </div>
                <div className="footer-icon">
                  <ul className="d-flex justify-content-start">
                    <li className="mr-3">
                      <Link to="/faq">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="mr-3">
                      <Link to="/faq">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="mr-3">
                      <Link to="/faq">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </Link>
                    </li>
                    <li className="mr-3">
                      <Link to="/faq">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-0 mt-lg-5">
                <h4 className="text-primary text-uppercase">Useful Links</h4>
                <div className="footer-link">
                  <ul className="text-primary h4">
                    <li className="mb-2">
                      <a href="/about">About</a>
                    </li>
                    <li className="mb-2">
                      <a href="/teams">Teams</a>
                    </li>
                    <li className="mb-2">
                      <a href="/signup">Join Us</a>
                    </li>

                    <li className="mb-2">
                      <a href="/contact">Contact</a>
                    </li>

                    <li className="mb-2">
                      <a href="/teams">Teams</a>
                    </li>
                    <li className="mb-2">
                      <a href="/faq">Faq</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="subscribe">
                  <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                      <label
                        className="text-primary text-uppercase h4"
                        htmlFor="newsletter"
                      >
                        Subscribe to our Newsleter
                      </label>
                      <input
                        type="email"
                        id="newsletter"
                        className="form-control "
                        value={input}
                        placeholder="Enter your email Address"
                        required
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                      <input
                        type="submit"
                        name="submit"
                        value="Subscribe"
                        className="btn btn-primary mt-4"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright pt-4">
            <div className="row">
              <div className="col text-center">
                <p>
                  © UltimateCoin {new Date().getFullYear()} all Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="transition text-right ">
        <a href="#banner" className="history-info backtop scrollTo">
          <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </>
  );
}

export default Footer;
