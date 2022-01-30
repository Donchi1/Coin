import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import $ from "jquery"
import NavBar from '../navigation/NavBar'
import Footer from './Footer'

function AskedQuestions() {

   useEffect(() => {
    function accordion_faq() {
      if ($('.accordion-faq-box').length > 0) {
        $('.accordion-faq-title').on('click', function () {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $(this).siblings('.accordion-faq-content').slideUp(200)
          } else {
            $(this)
            $('.accordion-faq-title').removeClass('active')
            $(this).addClass('active')
            $('.accordion-faq-content').slideUp(200)
            $(this).siblings('.accordion-faq-content').slideDown(200)
          }
        })
      }
      /* Accordion FAQ End */
    }
    return accordion_faq()
  }, [])
  return (
    <>
      <NavBar />

      <section className="sub-page-banner site-bg parallax" id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="page-banner text-center">
                <h1 className="sub-banner-title userTextColor">FAQ</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>FAQ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="faq-part-2 site-bg ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How can I participate in the UltimateCoins sale?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    The best way to participate in our platform is to buy any of
                    the accepted cryptocurrencies and invest prior to our
                    investment plans
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How long will i get return after UltimateCoin investment ?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    All investments are stable and transparent.You get your
                    earning 24hour after your investment.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  What is bitcoin?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    Bitcoin is a form of digital currency which is based on a
                    created open source code held electronically. <br />
                    Bitcoin is a decentralized form of currency meaning that it
                    does not belong to any government and it is not controlled
                    by one.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Can I make money with Bitcoin?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    You should never expect to get rich with Bitcoin or any
                    emerging technology. It is always important to be wary of
                    anything that sounds too good to be true or disobeys basic
                    economic rules.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  What happens when bitcoins are lost?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    When a user loses his wallet, it has the effect of removing
                    money out of circulation. Lost bitcoins still remain in the
                    block chain just like any other bitcoins. However, lost
                    bitcoins remain dormant forever because there is no way for
                    anybody to find the private key(s) that would allow them to
                    be spent again. Because of the law of supply and demand,
                    when fewer bitcoins are available, the ones that are left
                    will be in higher demand and increase in value to
                    compensate.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Who controls the Bitcoin network?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    Nobody owns the Bitcoin network much like no one owns the
                    technology behind email. Bitcoin is controlled by all
                    Bitcoin users around the world. While developers are
                    improving the software, they can't force a change in the
                    Bitcoin protocol because all users are free to choose what
                    software and version they use.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInLeft">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How are bitcoins created?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    New bitcoins are generated by a competitive and
                    decentralized process called "mining". This process involves
                    that individuals are rewarded by the network for their
                    services. Bitcoin miners are processing transactions and
                    securing the network using specialized hardware and are
                    collecting new bitcoins in exchange.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Why do bitcoins have value?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    Bitcoins have value because they are useful as a form of
                    money. Bitcoin has the characteristics of money (durability,
                    portability, fungibility, scarcity, divisibility, and
                    recognizability) based on the properties of mathematics
                    rather than relying on physical properties (like gold and
                    silver) or trust in central authorities (like fiat
                    currencies). In short, Bitcoin is backed by mathematics.{' '}
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  What determines bitcoin's price?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    The price of a bitcoin is determined by supply and demand.
                    When demand for bitcoins increases, the price increases, and
                    when demand falls, the price falls. There is only a limited
                    number of bitcoins in circulation and new bitcoins are
                    created at a predictable and decreasing rate.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Can bitcoins become worthless?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    History is littered with currencies that failed and are no
                    longer used, such as the German Mark during the Weimar
                    Republic and, more recently, the Zimbabwean dollar.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How can I participate in the Ultimatecoins sale?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    Typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. remaining essentially unchanged.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How does one acquire bitcoins?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    While it may be possible to find individuals who wish to
                    sell bitcoins in exchange for a credit card or PayPal
                    payment, most exchanges do not allow funding via these
                    payment methods. This is due to cases where someone buys
                    bitcoins with PayPal, and then reverses their half of the
                    transaction. This is commonly referred to as a chargeback.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Is Bitcoin legal?
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    To the best of our knowledge, Bitcoin has not been made
                    illegal by legislation in most jurisdictions. However, some
                    jurisdictions (such as Argentina and Russia) severely
                    restrict or ban foreign currencies. Other jurisdictions
                    (such as Thailand) may limit the licensing of certain
                    entities such as Bitcoin exchanges.{' '}
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How can i invest in Ultimatecoins trading.
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    Register in ultimatecoins, choose an investment plan, start
                    earning.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  How long will i get paid.
                </Link>
                <div className="accordion-faq-content transition">
                  <p>
                    It takes 24 hours to recieve your payment on a standard
                    investment plan.
                  </p>
                </div>
              </div>
              <div className="accordion-faq-box mb-20 wow fadeInRight">
                <Link to="/faq" className="accordion-faq-title userTextColor">
                  Who can get paid.
                </Link>
                <div className="accordion-faq-content transition">
                  <p>Anyone can get paid after investing in our platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AskedQuestions
