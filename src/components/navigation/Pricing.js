import React from "react";
import Footer from "../body/Footer";
import NavBar from "../navigation/NavBar";
import ReuseHero from "../navigation/ReuseHero";

function Pricing() {
  return (
    <>
      <NavBar />
      <ReuseHero style={"pricing-hero"} title={"Pricing"} />

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className=" text-center">
                <h4 className="wow py-4">Choose Your Plan</h4>
              </div>
            </div>
          </div>
          <div className="row small_space">
            <div className="col-lg-4 col-md-4">
              <div className=" text-center card ">
                <div className=" card-header bg-primary history-info">
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
              <div className=" text-center card  price-pd wow fadeInDown">
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
              <div className="text-center card  price-pd wow fadeInRight">
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
                    <li className="py-2">$500</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$9900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$150</li>
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
      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className="title_default_dark title_border text-center">
                <h4 className="wow fadeInLeft py-4">Special Plans</h4>
              </div>
            </div>
          </div>
          <div className="row small_space">
            <div className="col-lg-4 col-md-4">
              <div className="text-center pb-3 card  mb-2 wow fadeInLeft">
                <div className=" card-header bg-primary history-info">
                  <h3>Basic</h3>
                  <div className="price_tage">
                    <h3>$8000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$900</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$12900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$200</li>
                  </ul>
                </div>
                <div className="py-4">
                  <a href="/login" className="btn btn-default history-info">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="text-center card  mb-2 wow fadeInRight price-pd">
                <div className=" card-header bg-primary history-info">
                  <h3>Standard</h3>
                  <div className="price_tage">
                    <h3>$12000.00</h3>
                    <span>Token plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$1000</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$19900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$250</li>
                  </ul>
                </div>
                <div className="py-4">
                  <a href="/login" className="btn btn-default history-info">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card text-center  mb-2 wow fadeInUp price-pd">
                <div className=" card-header bg-primary history-info">
                  <h3>Untimate</h3>
                  <div className="price_tage">
                    <h3>$15000.00</h3>
                    <span>Token Plan</span>
                  </div>
                </div>
                <div className="pr_content">
                  <ul className="list_none ">
                    <li className="py-2">Normal Deposit</li>
                    <li className="py-2">$1200</li>
                    <li className="py-2">Initial Withdrawal</li>
                    <li className="py-2">$22900</li>
                    <li className="py-2">Bonus</li>
                    <li className="py-2">$300</li>
                  </ul>
                </div>
                <div className="py-4">
                  <a
                    href="/login"
                    className="btn btn-default history-info btn-radius-5"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* END SECTION PRICING TABLE- */}

      <Footer />
    </>
  );
}

export default Pricing;
