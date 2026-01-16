
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu-icon.png";
import { Link } from "react-scroll";

const Navbar = ({ setShowAuth, user, setUser }) => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenu(!mobileMenu);

  const handleLogout = () => {
    localStorage.removeItem("edusityLoggedIn");
    localStorage.removeItem("edusityUser");
    setUser(null);
  };

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="logo" className="logo" />

      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        <li><Link to="hero" smooth duration={500}>Home</Link></li>

        {user && (
          <>
            <li><Link to="program" smooth offset={-260} duration={500}>Program</Link></li>
            <li><Link to="about" smooth offset={-150} duration={500}>About us</Link></li>
            <li><Link to="campus" smooth offset={-260} duration={500}>Campus</Link></li>
            <li><Link to="testimonials" smooth offset={-260} duration={500}>Testimonials</Link></li>
            <li><Link to="contact" smooth offset={-260} duration={500} className="btn">Contact us</Link></li>
          </>
        )}

        {user ? (
          <>
            <li className="btn">👤 {user.email}</li>
            <li className="btn" onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <li className="btn" onClick={() => setShowAuth(true)}>Login / Signup</li>
        )}
      </ul>

      <img src={menu_icon} alt="menu" className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
