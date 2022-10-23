import React, { useState, useEffect, Fragment } from 'react'

import { useFirebase } from 'react-redux-firebase'
import img1 from '../../assets/test1.jpg'
import img2 from '../../assets/test2.jpg'
import img3 from '../../assets/test3.jpg'
import img4 from '../../assets/team-4-470x470.png'
import img7 from "../../assets/investor-male6.jpg";
import * as Icons from 'react-bootstrap-icons'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Next = ({ className, onClick, style, dont }) => {
  return (
    <div className="custom-blog-btn1">
      <button onClick={onClick} className="custom-blog-btn">
        <Icons.ChevronRight />
      </button>
    </div>
  )
}
const Prev = ({ className, onClick, style }) => (
  <div className="custom-blog-btn2">
    <button onClick={onClick} className="custom-blog-btn">
      <Icons.ChevronLeft />
    </button>
  </div>
)

function Testimonials() {
  const [show, setShow] = useState(null)



  const firebase = useFirebase()
  //useEffect(() => {
  //  window.addEventListener('resize', () => {
  //    const isSmall = window.matchMedia('screen and (max-width: 960px)')
  //    if (isSmall.matches) {
  //      setShow(1)
  //    } else {
  //      setShow(4)
  //    }
  //  })
  //}, [])

  const videoData = [
    {
      url: img1,
      message:
        ' Am so please trading unreagretably with Ultimatecoins meeting them was never a coincident and am so happy trading with then because they have increased my fund and changed my life totally',

      id: Math.random() * 36575,
    },

    {
      id: Math.random() * 2675,
      url: img2,
      message:
        '   Am so please trading unreagretably with Ultimatecoins meeting them was never a coincident and am so happy trading with then because they have increased my fund and changed my life totally.',
    },
    {
      id: Math.random() * 1577,
      url: img3,
      message:
        'Getting in touch with this company made me understand the meaning of team work.I invested very little but there team guided me to make the best out of this platform, and am so happy to be an investor here.',
    },
    {
      id: Math.random() * 1677,
      url: img4,
      message:
        'The best platform i have invested and gotten my return in real time for a better and future establishments. Join this platform and invest and never regret. ',
    },
    {
      id: Math.random() * 1677,
      url: img7,
      message:
        "Join this platform and invest and never regret. I was able to withdraw my fund and profits with ease. Thanks to the account manager and all the team members.",
    },
  ]

  return (
    <>
      <section className="blog-part mt-5  ptb-100" style={{height: "70vh"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">Testimomials</label>
                <h2 className="heading-title userTextColor">
                  Our Testimonials
                </h2>
                <p className="heading-des text-white">
                  Ultimatecoins has really changed the life of many. Checkout
                  our what our clients has to say
                </p>
              </div>
            </div>
          </div>
          <Slider  autoplay
            slidesToScroll={1}
            slidesToShow={4}
            infinite
            arrows={false}
            initialSlide={0}
            speed={2000}
            pauseOnHover={false}
            pauseOnFocus
            pauseOnDotsHover={false}
            easing="linear"
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                },
              },
            ]}>
            {videoData.map((each) => (
              <div className="blog-box blog p-2" key={each.id}>
                <div className="blog-img mb-15 work-box">
                  <img src={each.url} alt="" width={100} height={100} className=" rounded-circle mx-auto" />
                </div>

                <div className="blog-des-box">
                  <p className="blog-date text-light">{each.message}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default Testimonials
