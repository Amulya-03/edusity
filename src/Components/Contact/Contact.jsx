/*import React from 'react'
import './Contact.css'
import message_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {

const [result, setResult] = React.useState("");

const onSubmit = async (event) => {
  event.preventDefault();
  setResult("Sending....");
  const formData = new FormData(event.target);

  formData.append("access_key", "0efaa503-480c-4b9b-b171-5e289b477054");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (data.success) {
    setResult("Form Submitted Successfully");
    event.target.reset();
  } else {
    setResult(data.message);
  }
};

return (
  <div id="contact" className="Contact">   {/* ✅ THIS FIX *//*}
    <div className="Contact-col">
      <h3>send us a message <img src={message_icon} alt="" /></h3>
      <p>Feel free to reach out through contact form or find our contact information below.</p>

      <ul>
        <li><img src={mail_icon} alt="" />contact@ourtech</li>
        <li><img src={phone_icon} alt="" />+91 111110000</li>
        <li><img src={location_icon} alt="" />45 massive hill, texas</li>
      </ul>
    </div>

    <div className="Contact-col">
      <form onSubmit={onSubmit}>
        <label>Your Name</label>
        <input type="text" name="name" placeholder="Enter Your Name" required />

        <label>Phone Number</label>
        <input type="tel" name="phone" placeholder="Enter Your Mobile Number" required />

        <label>Your Message</label>
        <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>

        <button type="submit" className="btn dark-btn">
          Submit Now <img src={white_arrow} alt="" />
        </button>
      </form>

      <span>{result}</span>
    </div>
  </div>
);
};

export default Contact;
*/

import React, { useState } from "react";
import "./Contact.css";
import message_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "0efaa503-480c-4b9b-b171-5e289b477054");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Message sent successfully!");
        event.target.reset();
      } else {
        setResult("❌ Failed to send. Try again.");
      }
    } catch (error) {
      setResult("❌ Network error");
    }
  };

  return (
    <div className="Contact" id="contact">
      <div className="Contact-col">
        <h3>
          Send us a message <img src={message_icon} alt="" />
        </h3>
        <p>
          Feel free to reach out through the contact form or find our contact
          information below. Your feedback and questions are important to us.
        </p>

        <ul>
          <li>
            <img src={mail_icon} alt="" /> contact@edusity.com
          </li>
          <li>
            <img src={phone_icon} alt="" /> +91 9876543210
          </li>
          <li>
            <img src={location_icon} alt="" /> 45 Massive Hill, Texas, USA
          </li>
        </ul>
      </div>

      <div className="Contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your number" required />

          <label>Your Message</label>
          <textarea name="message" rows="6" placeholder="Enter message" required />

          <button type="submit" className="btn dark-btn">
            Submit now <img src={white_arrow} alt="" />
          </button>
        </form>

        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
