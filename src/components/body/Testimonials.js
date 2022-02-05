import React, { useState, useEffect, Fragment } from 'react'

import { useFirebase } from 'react-redux-firebase'
import img1 from '../../assets/test1.jpg'
import img2 from '../../assets/test2.jpg'
import img3 from '../../assets/test3.jpg'
import img4 from '../../assets/team-4-470x470.png'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Testimonials() {
  const [show, setShow] = useState(4)

  const slickOption = {
    slidesToShow: show,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
  }

  const firebase = useFirebase()
  useEffect(() => {
    const isSmall = window.matchMedia('screen and (max-width: 960px)')
    if (isSmall.matches) {
      setShow(1)
    } else {
      setShow(4)
    }
  }, [])

  const [videoData, setVideoData] = useState([
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
  ])

  // useEffect(() => {
  //   const unsubscribe = firebase
  //     .firestore()
  //     .collection('testimonials')
  //     .onSnapshot((qs) => {
  //       const data = qs.docs.map((doc) => doc.data())
  //       data.map((each) => {
  //         if (each) {
  //           setVideoData([
  //             ...videoData,
  //             {
  //               url: each.photo,
  //               message: each.message,
  //               id: each.createdate.toDate(),
  //             },
  //           ])
  //         }
  //       })
  //     })
  //   return unsubscribe
  // }, [])

  return (
    <>
      <section className="blog-part site-bg ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-12 wow fadeInUp">
              <div className="section-heading text-center pb-65">
                <label className="sub-heading">Testimomials</label>
                <h2 className="heading-title userTextColor">
                  Our Testimonials
                </h2>
                <p className="heading-des">
                  Ultimatecoins has really changed the life of many. Checkout
                  our what our clients has to say
                </p>
              </div>
            </div>
          </div>
          <Slider {...slickOption} swipe arrows={false} swipeToSlide dots>
            {videoData.map((each) => (
              <div className="blog-box " key={each.id}>
                <div className="blog-img mb-15 work-box">
                  <img src={each.url} alt="" />
                </div>

                <div className="blog-des-box">
                  <p className="blog-date">{each.message}</p>
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
