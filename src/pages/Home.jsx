import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const quotes = [
      "Believe in yourself, and all that you are. 🌟",
      "Dream big. Work hard. Stay humble. 💪",
      "Success is the sum of small efforts repeated every day. 🚀",
      "Don’t watch the clock; do what it does — keep going. ⏰",
      "Push yourself, because no one else is going to do it for you. 🔥",
      "Your only limit is your mind. 💭",
      "Make each day your masterpiece. 🎨",
    ];

    // rotate quotes every 5 seconds
    let index = 0;
    setQuote(quotes[index]);
    const interval = setInterval(() => {
      index = (index + 1) % quotes.length;
      setQuote(quotes[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        color: "#333",
        fontFamily: "Poppins, sans-serif",
        transition: "all 0.5s ease-in-out",
      }}
    >
      {user ? (
        <>
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#4b6cb7",
              animation: "fadeIn 2s ease",
            }}
          >
            Welcome 👋</h1>
          <p style={{ color: "#555", fontSize: "1.1rem" }}>{user.email}</p>

          <p
            style={{
              marginTop: "40px",
              fontSize: "1.3rem",
              color: "#222",
              fontStyle: "italic",
              animation: "fadeInQuote 2s ease-in-out",
            }}
          >
            “{quote}”
          </p>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInQuote {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Home;
