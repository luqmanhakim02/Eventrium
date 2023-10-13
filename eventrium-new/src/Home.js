import React from "react";

const Home = () => {
  return (
    <>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <header class="header">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="header__logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div class="col-lg-7">
              <nav class="header__menu">
                <ul>
                  <li class="active">
                    <a href="./index.html">Home</a>
                  </li>
                  <li>
                    <a href="./my-event.html">My Event</a>
                  </li>
                  <li>
                    <a href="./register-event.html">Register Event</a>
                  </li>
                  <li>
                    <a href="./certificates.html">Certificates</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-lg-2">
              <div class="header__cart">
                <ul>
                  <li>
                    <a href="#">
                      <i class="fa fa-heart"></i> <span>1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-shopping-bag"></i> <span>3</span>
                    </a>
                  </li>
                </ul>
                <div id="walletAddress"></div>
              </div>
            </div>
          </div>
          <div class="humberger__open">
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>

      <section class="hero">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="hero__categories">
                <div class="hero__categories__all">
                  <i class="fa fa-bars"></i>
                  <span>All departments</span>
                </div>
                <ul>
                  <li>
                    <a href="register-event.html">Today</a>
                  </li>
                  <li>
                    <a href="register-event.html">Workshop</a>
                  </li>
                  <li>
                    <a href="register-event.html">Business</a>
                  </li>
                  <li>
                    <a href="register-event.html">Competition</a>
                  </li>
                  <li>
                    <a href="register-event.html">Webinar</a>
                  </li>
                  <li>
                    <a href="register-event.html">Online Class</a>
                  </li>
                  <li>
                    <a href="register-event.html">Concert</a>
                  </li>
                  <li>
                    <a href="register-event.html">Sports & Fitness</a>
                  </li>
                  <li>
                    <a href="register-event.html">Festival</a>
                  </li>
                  <li>
                    <a href="register-event.html">Other</a>
                  </li>
                  <li>
                    <a href="register-event.html">All</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="hero__search">
                <div class="hero__search__form">
                  <form action="#">
                    <input type="text" placeholder="What do yo u need?" />
                    <button type="submit" class="site-btn">
                      SEARCH
                    </button>
                  </form>
                </div>
                <div class="hero__search__phone">
                  <div class="hero__search__phone__icon">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="hero__search__phone__text">
                    <h5>+016 8883191</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
              <div class="hero__item set-bg" data-setbg="img/hero/banner.jpg">
                <div class="hero__text">
                  <span>NEW EVENTS</span>
                  <h2>
                    Experience <br />
                    100% Memorable Moments
                  </h2>
                  <p>Find Your Favourite Events or Create One</p>
                  <a href="register-event.html" class="primary-btn">
                    JOIN NOW
                  </a>
                  <br />
                  <br />
                  <a href="#" class="primary-btn">
                    CREATE EVENT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="featured spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title">
                <h2>Featured Events</h2>
              </div>
              <div class="featured__controls">
                <ul>
                  <li class="active" data-filter="*">
                    All
                  </li>
                  <li data-filter=".oranges">Business</li>
                  <li data-filter=".fresh-meat">Workshop</li>
                  <li data-filter=".vegetables">Symposium</li>
                  <li data-filter=".fastfood">Competition</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row featured__filter">
            <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat fastfood">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-1.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Blockchain Hackathon</a>
                  </h6>
                  <h5>100 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-2.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Python Online Class</a>
                  </h6>
                  <h5>200 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix oranges">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-3.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Charity Gala</a>
                  </h6>
                  <h5>200 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-4.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Music Fest</a>
                  </h6>
                  <h5>500 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-5.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">FutureTech Symposium</a>
                  </h6>
                  <h5>Free</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix fastfood">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-6.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Volleyball National League</a>
                  </h6>
                  <h5>1000 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-7.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">
                      Digital Mastery : Online Webinar
                    </a>
                  </h6>
                  <h5>150 ALGO</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables oranges">
              <div class="featured__item">
                <div
                  class="featured__item__pic set-bg"
                  data-setbg="img/featured/feature-8.jpg"
                >
                  <ul class="featured__item__pic__hover">
                    <li>
                      <a href="#">
                        <i class="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="featured__item__text">
                  <h6>
                    <a href="join-event.html">Cybersecurity Forum</a>
                  </h6>
                  <h5>Free</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="footer__about">
                <div class="footer__about__logo">
                  <a href="./index.html">
                    <img src="img/logo.png" alt="" />
                  </a>
                </div>
                <ul>
                  <li>Address: UTM Skudai</li>
                  <li>Phone: +016 8883191</li>
                  <li>Email: eventrium@business.my</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div class="footer__widget">
                <h6>Useful Links</h6>
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">About Our Shop</a>
                  </li>
                  <li>
                    <a href="#">Secure Shopping</a>
                  </li>
                  <li>
                    <a href="#">Delivery infomation</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Our Sitemap</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Who We Are</a>
                  </li>
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <a href="#">Projects</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Innovation</a>
                  </li>
                  <li>
                    <a href="#">Testimonials</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div class="footer__widget">
                <h6>Join Our Newsletter Now</h6>
                <p>
                  Get E-mail updates about our latest shop and special offers.
                </p>
                <form action="#">
                  <input type="text" placeholder="Enter your mail" />
                  <button type="submit" class="site-btn">
                    Subscribe
                  </button>
                </form>
                <div class="footer__widget__social">
                  <a href="#">
                    <i class="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="footer__copyright">
                <div class="footer__copyright__text">
                  <p>
                    Copyright &copy;
                    <script>document.write(new Date().getFullYear());</script>
                    All rights reserved | This template is made with
                    <i class="fa fa-heart" aria-hidden="true"></i> by
                    <a href="https://colorlib.com" target="_blank">
                      Colorlib
                    </a>
                  </p>
                </div>
                <div class="footer__copyright__payment">
                  <img src="img/payment-item.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
