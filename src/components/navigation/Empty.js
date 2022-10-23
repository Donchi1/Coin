import React from "react";

import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function Empty() {
  return (
    <>
      <NavBar />

      <section
        className=" d-flex justify-content-center align-items-center "
        style={{ height: "100vh" }}
      >
        <div className="row">
          <div className="col-md-12 wow fadeInUp animated">
            <div className="section-heading text-center">
              <h2 className="h1" style={{ fontSize: "10rem" }}>
                404
              </h2>
              <p className="heading-des text-danger">
                Ooops! 404 - Page Not Found
              </p>
              <Link to="/" className="btn btn-primary">
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Empty;
