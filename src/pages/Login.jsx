import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.43.74:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text(); // handle plain text or JSON

      if (response.ok) {
        // ✅ Successful login (response body is user JSON)
        const userData = JSON.parse(text);
        localStorage.setItem("user", JSON.stringify(userData));

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } 
      else if (text.includes("register")) {
        // 🚀 If backend says user not registered → go to register page
        alert("⚠️ You are not registered. Redirecting to Register page...");
        setTimeout(() => navigate("/register"), 1000);
      } 
      else {
        // ❌ Any other error
        alert("❌ " + text);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("🚨 Error logging in. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
