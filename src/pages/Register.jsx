import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://192.168.43.74:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await response.text(); // only read once

    if (response.ok) {
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage("⚠️ " + text);
    }

  } catch (error) {
    console.error("Error:", error);
    setMessage("🚨 Error registering user");
  }
};


  return (
    <div className="auth-container">
  <div className="auth-box">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
    <p>{message}</p>
  </div>
</div>

  );
}

export default Register;
