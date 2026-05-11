import React from "react";
import {
  FaUsers,
  FaFileAlt,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaBell,
  FaCommentDots
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const role = user?.role || "guest";

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        Loading dashboard...
      </div>
    );
  }

  const adminStats = [
    { title: "Total Residents", value: 1240, icon: <FaUsers />, color: "#3b82f6" },
    { title: "Certificates", value: 320, icon: <FaFileAlt />, color: "#10b981" },
    { title: "Complaints", value: 58, icon: <FaExclamationTriangle />, color: "#ef4444" },
    { title: "Events", value: 12, icon: <FaCalendarAlt />, color: "#f59e0b" }
  ];

  const residentStats = [
    { title: "My Requests", value: 5, icon: <FaFileAlt />, color: "#3b82f6" },
    { title: "Complaints Filed", value: 2, icon: <FaExclamationTriangle />, color: "#ef4444" },
    { title: "Announcements", value: 8, icon: <FaBell />, color: "#f59e0b" },
    { title: "Community Posts", value: 14, icon: <FaCommentDots />, color: "#10b981" }
  ];

  const guestStats = [
    { title: "Announcements", value: "View Only", icon: <FaBell />, color: "#f59e0b" },
    { title: "Events", value: "View Only", icon: <FaCalendarAlt />, color: "#3b82f6" }
  ];

  let stats = adminStats;

  if (role === "resident") {
    stats = residentStats;
  } else if (role === "guest"){
    stats = guestStats;
  }

  return (
    <div>

      <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
        {role === "admin"
          ? "Admin Dashboard"
          : role === "resident"
          ? "Resident Dashboard"
          : "Guest Dashboard"}
      </h2>

      {/* CARDS */}
      <div style={styles.grid}>
        {stats.map((item, index) => (
          <div key={index} style={styles.card}>

            <div style={{
              ...styles.iconBox,
              backgroundColor: item.color + "20"
            }}>
              <span style={{ color: item.color, fontSize: "20px" }}>
                {item.icon}
              </span>
            </div>

            <div>
              <p style={styles.cardTitle}>{item.title}</p>
              <h2 style={styles.cardValue}>{item.value}</h2>
            </div>

          </div>
        ))}
      </div>

      {/* TABLE (ADMIN + RESIDENT ONLY) */}
      {role !== "guest" && (
        <div style={styles.tableContainer}>
          <h3 style={{ marginBottom: "15px" }}>Recent Activity</h3>

          <table style={styles.table}>
            <thead>
              <tr style={{ textAlign: "left", color: "#6b7280" }}>
                <th>Name</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr style={styles.row}>
                <td>Juan Dela Cruz</td>
                <td>Requested Certificate</td>
                <td>May 5, 2026</td>
              </tr>
              <tr style={styles.row}>
                <td>Maria Santos</td>
                <td>Filed Complaint</td>
                <td>May 4, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* GUEST MESSAGE */}
      {role === "guest" && (
        <div style={styles.guestBox}>
          <h3>Welcome Guest 👋</h3>
          <p>You can view announcements and events only.</p>
        </div>
      )}

    </div>
  );
};

export default Dashboard;

/* ================= STYLES ================= */

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  iconBox: {
    width: "45px",
    height: "45px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  cardTitle: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280"
  },

  cardValue: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "#111827"
  },

  tableContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  row: {
    borderTop: "1px solid #e5e7eb",
    height: "50px"
  },

  guestBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  }
};