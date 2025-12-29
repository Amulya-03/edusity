/*
import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // ✅ EmailJS import
import "./AuthModal.css";

const AuthModal = ({ show, setShow, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  if (!show) return null;

  const closePopup = () => {
    setMessage("");
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const storedUser = JSON.parse(localStorage.getItem("edusityUser"));

    // SIGN UP
    if (!isLogin) {
      if (storedUser && storedUser.email === email) {
        setMessage("⚠️ You are already registered in Edusity");
      } else {
        const newUser = { email, password };
        localStorage.setItem("edusityUser", JSON.stringify(newUser));

        // ✅ Send registration email
        emailjs
          .send(
            "service_kff1dql",      // your EmailJS service ID
            "template_cfn3hhs",     // your EmailJS template ID
            {
              to_name: email,
              to_email: email,
            },
            "6ET7XN4T7Yu5LdGnf"     // your EmailJS public key
          )
          .then((response) => {
            console.log(
              "Email successfully sent!",
              response.status,
              response.text
            );
          })
          .catch((err) => {
            console.error("Failed to send email:", err);
          });

        setMessage(
          `📧 A confirmation mail has been sent to ${email}. You are successfully registered in Edusity!`
        );
      }
    }

    // LOGIN
    if (isLogin) {
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("edusityLoggedIn", "true");
        setUser(storedUser);
        setMessage("🎉 Login successful!");
        setTimeout(() => setShow(false), 2000);
      } else {
        setMessage("❌ Invalid email or password");
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <span className="close-btn" onClick={closePopup}>✖</span>

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button>{isLogin ? "Login" : "Register"}</button>
        </form>

        <p>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
*/


import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./AuthModal.css";

const AuthModal = ({ show, setShow, setUser }) => {
  const [mode, setMode] = useState("login"); // login / signup / forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  if (!show) return null;

  const closePopup = () => {
    setMsg("");
    setShow(false);
    setMode("login");
    setEmail("");
    setPassword("");
    setNewPassword("");
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = () => {
    if (!email || !password) return setMsg("❌ Please fill all fields");

    const storedUsers = JSON.parse(localStorage.getItem("edusityUsers")) || [];

    // Check if email already exists
    if (storedUsers.some(u => u.email === email)) {
      return setMsg("⚠️ You are already registered");
    }

    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem("edusityUsers", JSON.stringify(storedUsers));
    localStorage.setItem("edusityLoggedIn", "true");
    setUser(newUser);

    // Send registration email
    emailjs
      .send(
        "service_kff1dql",
        "template_cfn3hhs",
        {
          to_name: email,
          to_email: email,
          message: `Welcome! Your account has been successfully created.`
        },
        "6ET7XN4T7Yu5LdGnf"
      )
      .then(() => console.log("Registration email sent"))
      .catch((err) => console.error("Email error:", err));

    setMsg(`📧 Registration successful! Confirmation sent to ${email}`);
    setTimeout(() => closePopup(), 1500);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("edusityUsers")) || [];
    const foundUser = storedUsers.find(u => u.email === email);

    if (!foundUser) return setMsg("❌ Email not registered");
    if (foundUser.password !== password) return setMsg("❌ Invalid password");

    // Successful login
    localStorage.setItem("edusityLoggedIn", "true");
    setUser(foundUser);
    setMsg("🎉 Login successful!");
    setTimeout(() => closePopup(), 1500);
  };

  // ---------------- FORGOT PASSWORD ----------------
  const handleForgotPassword = () => {
    const storedUsers = JSON.parse(localStorage.getItem("edusityUsers")) || [];
    const foundUser = storedUsers.find(u => u.email === email);

    if (!foundUser) return setMsg("❌ Email not registered");
    if (!newPassword) return setMsg("❌ Please enter new password");

    const updatedUsers = storedUsers.map(u =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("edusityUsers", JSON.stringify(updatedUsers));
    setUser({ ...foundUser, password: newPassword });

    setMsg("✅ Password changed successfully!");
    setTimeout(() => closePopup(), 1500);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <span className="close-btn" onClick={closePopup}>✖</span>

        {/* LOGIN */}
        {mode === "login" && (
          <>
            <h2>Login</h2>
            {msg && <p className="success">{msg}</p>}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
            <p className="toggle" onClick={() => setMode("signup")}>Don't have an account? Sign Up</p>
            <p className="toggle" onClick={() => setMode("forgot")}>Forgot Password?</p>
          </>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <>
            <h2>Sign Up</h2>
            {msg && <p className="success">{msg}</p>}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button onClick={handleSignup}>Sign Up</button>
            <p className="toggle" onClick={() => setMode("login")}>Already have an account? Login</p>
          </>
        )}

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <>
            <h2>Change Password</h2>
            {msg && <p className="success">{msg}</p>}
            <input 
              type="email" 
              placeholder="Registered Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
            />
            <button onClick={handleForgotPassword}>Change Password</button>
            <p className="toggle" onClick={() => setMode("login")}>Back to Login</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
