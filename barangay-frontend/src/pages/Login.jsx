import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);

        // redirect after success
        navigate("/dashboard");
      } else {
        alert("Invalid login");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Barangay Login</h2>

        {/* EMAIL */}
        <input
          style={input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin} style={btn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

/* ================= STYLES ================= */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  width: "300px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};