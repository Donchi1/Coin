import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Blogs = () => {
  return (
    <section className="header-spacing pb-4 card-bg-new">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 col-md-12 offset-lg-2">
            <div className="section-heading text-center pb-65">
              <label className="text-primary text-uppercase">news</label>
              <h2>Our Blog</h2>
              <p className="h4 text-light">
                We give oppurtunity blogs as a means of information transmission
                and contribution to our services
              </p>
            </div>
          </div>
        </div>

        <Slider
          autoplay
          slidesToScroll={1}
          slidesToShow={4}
          infinite
          initialSlide={0}
          speed={1000}
          pauseOnHover={false}
          pauseOnFocus
          pauseOnDotsHover={false}
          easing="linear"
          className=""
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
          ]}
          arrows={false}
        >
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Blockchain information
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by Admin</li>
              </ul>
              <p className="blog-des text-light">
                The crypto markets continued to build on April's gains this
                week, with alternative cryptocurrencies like nano, VeChain and
                bytecoin leading the way. The Enterprise Blockchain Gap A number
                of large corporations,
              </p>
              <Link to="/" className="read-more text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Mostly updates
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by Elvis Kings </li>
              </ul>
              <p>
                The standard of our system is allways stable because of our
                monthly updates
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title">
                Ultimatecoins made for empowerment and change
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by Jame Leo</li>
              </ul>
              <p>
                Ultimatecoins is really a life changing plateform. Invest the
                little you have and see the multiplication
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                client satisfaction
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by john Lucas</li>
              </ul>
              <p className="blog-des ">
                We make sure the standard of our platform is kept by making sure
                our clients are heighly satisfied{" "}
              </p>
              <Link to="/" className="read-more text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Ultimatecoins most popular plateform
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by jame Elvis</li>
              </ul>
              <p>
                Ultimatecoins is one of the known investment platform of the
                world
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Standard service and investment
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by Gorge luke</li>
              </ul>
              <p>Investment network is strong and secured to keep you going</p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <a href="/blog">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-1.jpg"
                  alt="blog"
                />
              </a>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Ultimatecoins and security
              </Link>
              <ul className="blog-date">
                <li>March 20,2019</li>
                <li>by Jude Clem</li>
              </ul>
              <p className="blog-des ">
                The standard security of this platform made them the best among
                all
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span href="/blogs">
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-2.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title text-primary h4 py-2">
                Rist bearing and stability
              </Link>
              <ul className="blog-date">
                <li>March 20,2021</li>
                <li>by john Mark</li>
              </ul>
              <p>
                The stands firm amd strong, managing there plateform and
                handling all events accurately
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
          <div className="blog-box wow fadeInUp">
            <div className="blog-img mb-15">
              <span>
                <img
                  src="https://themes.templatescoder.com/crypton/html/demo/1-1/01-Dark-Theme/images/blog-3.jpg"
                  alt="blog"
                />
              </span>
            </div>
            <div className="blog-des-box">
              <Link to="/" className="blog-title ">
                Buying and investments
              </Link>
              <ul className="blog-date">
                <li>June 2,2022</li>
                <li>by john Anthony</li>
              </ul>
              <p>
                Working in hand with other cryto platforms has made it easy for
                buying and investing.
              </p>
              <Link to="/" className="text-primary">
                Read More
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Blogs;
