import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLoggedIn = !!user;

  return (
    <div style={page}>

      {/* HERO SECTION */}
      <div style={hero}>
        <h1>Welcome to Barangay Management System</h1>
        <p>
          A digital platform designed to improve transparency, communication,
          and public service delivery in the barangay.
        </p>

        {!isLoggedIn ? (
          <button style={btn} onClick={() => navigate("/login")}>
            Login to System
          </button>
        ) : (
          <button
            style={{ ...btn, marginRight: "10px" }}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        )}
      </div>

      {/* ABOUT SECTION */}
      <div style={section}>
        <h2>About the Barangay</h2>
        <p>
          This system helps residents access services such as certificates,
          complaints, event updates, and community announcements in a faster
          and more organized way.
        </p>
      </div>

      {/* SERVICES SECTION */}
      <div style={section}>
        <h2>Services Available</h2>
        <ul>
          <li>Barangay Certificates Request</li>
          <li>Complaint & Appointment System</li>
          <li>Event & Announcement Updates</li>
          <li>Resource & Inventory Requests</li>
        </ul>
      </div>

      {/* CONTACT SECTION */}
      <div style={section}>
        <h2>Contact Information</h2>
        <p>Barangay Hall Office</p>
        <p>Email: barangay@example.com</p>
        <p>Phone: 09XX-XXX-XXXX</p>
      </div>

    </div>
  );
};

export default Home;

/* ================= STYLES ================= */

const page = {
  fontFamily: "Arial",
  padding: "20px",
  background: "#f9fafb"
};

const hero = {
  textAlign: "center",
  padding: "60px 20px",
  background: "#2563eb",
  color: "white",
  borderRadius: "10px"
};

const section = {
  marginTop: "30px",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "15px",
  padding: "10px 20px",
  border: "none",
  background: "white",
  color: "#2563eb",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};