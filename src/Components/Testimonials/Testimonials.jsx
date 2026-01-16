
import React, { useRef } from "react";
import "./Testimonials.css";
import next_icon from "../../assets/next-icon.png";
import back_icon from "../../assets/back-icon.png";
import user_1 from "../../assets/user-1.png";
import user_2 from "../../assets/user-2.png";
import user_3 from "../../assets/user-3.png";
import user_4 from "../../assets/user-4.png";

const Testimonials = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 50;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 50;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="testimonials" id="testimonials">
      <img src={next_icon} className="next-btn" onClick={slideForward} />
      <img src={back_icon} className="back-btn" onClick={slideBackward} />

      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt="" />
                <div>
                  <h3>carlie</h3>
                  <span>Edusity, UK</span>
                </div>
              </div>
              <p>
                I am happy to join Edusity. It meets my expectations completely,
                provides quality education and guidance, and choosing Edusity is
                one of the best decisions of my life.
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="" />
                <div>
                  <h3>john</h3>
                  <span>Edusity, UK</span>
                </div>
              </div>
              <p>
                I am happy to join Edusity. It meets my expectations completely,
                provides quality education and guidance, and choosing Edusity is
                one of the best decisions of my life.
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="" />
                <div>
                  <h3>aliena</h3>
                  <span>Edusity, UK</span>
                </div>
              </div>
              <p>
                I am happy to join Edusity. It meets my expectations completely,
                provides quality education and guidance, and choosing Edusity is
                one of the best decisions of my life.
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>daniel</h3>
                  <span>Edusity, UK</span>
                </div>
              </div>
              <p>
                I am happy to join Edusity. It meets my expectations completely,
                provides quality education and guidance, and choosing Edusity is
                one of the best decisions of my life.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
