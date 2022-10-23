import React from "react";

function ReuseHero({ title, style }) {
  return (
    <section
      className={`home-banner ${style} paralax `}
      id="banner"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 vh-100  position-u d-flex direction-column align-items-center justify-content-center wow fadeInLeft animated">
            <div className="banner-contain ">
              <h1 className={` display-4    text-center align-center mb-2`}>
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReuseHero;
