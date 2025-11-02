import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSkillClick = () => {
    if (user) {
      navigate("/analyze");
    } else {
      alert("Please login first!");
      navigate("/login");
    }
  };

  return (
    <nav style={navStyle}>
      <h2 style={logoStyle}>JobSkillMatcher</h2>

      <div style={linkContainer}>
        {/* Conditional Links */}
        {user && <Link to="/register" style={linkStyle}>Register</Link>}
        {user && <Link to="/login" style={linkStyle}>Login</Link>}
        {user && <Link to="/" style={linkStyle}>Home</Link>}
        {user && <Link to="/info" style={linkStyle}>Info</Link>}


        {/* Skill Analyzer button */}
        <button onClick={handleSkillClick} style={skillButtonStyle}>
          Skill Analyzer
        </button>

        {/* Logout button (only visible after login) */}
        {user && (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

/* --- Inline Style Objects --- */
const navStyle = {
  background: "#2c3e50",
  padding: "12px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 10,
};

const logoStyle = {
  color: "#a1c4fd",
  fontWeight: "700",
  fontSize: "20px",
  letterSpacing: "0.5px",
};

const linkContainer = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

const skillButtonStyle = {
  backgroundColor: "#1f2a36",
  color: "white",
  padding: "8px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow: "0 0 10px rgba(161, 196, 253, 0.3)",
};

const logoutButtonStyle = {
  ...linkStyle,
  border: "1px solid #a1c4fd",
  borderRadius: "6px",
  padding: "6px 14px",
  cursor: "pointer",
  background: "transparent",
};

/* Hover effects */
const hoverStyle = `
button:hover, a:hover {
  color: #a1c4fd !important;
}
button:hover {
  box-shadow: 0 0 14px rgba(161, 196, 253, 0.5);
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = hoverStyle;
  document.head.appendChild(styleTag);
}

export default Navbar;
