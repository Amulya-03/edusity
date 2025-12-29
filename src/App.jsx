

import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import About from "./Components/About/About";
import Campus from "./Components/Campus/Campus";
import Testimonials from "./Components/Testimonials/Testimonials";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import AuthModal from "./Components/Auth/AuthModal";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("edusityLoggedIn");
    const savedUser = localStorage.getItem("edusityUser");
    if (loggedIn && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <Navbar setShowAuth={setShowAuth} user={user} setUser={setUser} />
      <Hero />

      {user && (
        <>
          <Programs />
          <About />
          <Campus />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}

      <AuthModal show={showAuth} setShow={setShowAuth} setUser={setUser} />
    </>
  );
}

export default App;

