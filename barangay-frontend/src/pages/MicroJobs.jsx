import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaBriefcase,
  FaMoneyBillWave,
  FaEdit,
  FaTrash
} from "react-icons/fa";

const MicroJobs = () => {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Grass Cutting",
      description: "Need someone to clean the backyard.",
      budget: 500,
      location: "Barangay 1",
      postedBy: "Juan Dela Cruz"
    },
    {
      id: 2,
      title: "House Cleaning",
      description: "Cleaning service needed for 1 day.",
      budget: 800,
      location: "Barangay 2",
      postedBy: "Maria Santos"
    }
  ]);

  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    budget: "",
    location: ""
  });

  // ================= CREATE JOB =================
  const createJob = () => {
    if (!jobForm.title || !jobForm.description) return;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        ...jobForm,
        postedBy: user?.name
      }
    ]);

    setJobForm({
      title: "",
      description: "",
      budget: "",
      location: ""
    });

    setShowForm(false);
  };

  // ================= DELETE JOB =================
  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div style={page}>

      {/* HEADER */}
      <div style={header}>
        <div>
          <h1 style={{ marginBottom: "5px" }}>
            Micro Job Matching System
          </h1>

          <p style={{ color: "#6b7280" }}>
            Find short-term community jobs and services.
          </p>
        </div>

        {/* RESIDENT ONLY */}
        {user?.role === "resident" && (
          <button style={addBtn} onClick={() => setShowForm(true)}>
            + Post Job
          </button>
        )}
      </div>

      {/* JOBS GRID */}
      <div style={grid}>
        {jobs.map((job) => (
          <div key={job.id} style={card}>

            <div style={iconBox}>
              <FaBriefcase />
            </div>

            <h3>{job.title}</h3>

            <p style={{ color: "#4b5563" }}>
              {job.description}
            </p>

            <div style={infoRow}>
              <FaMoneyBillWave />
              <span>₱{job.budget}</span>
            </div>

            <p>
              <b>Location:</b> {job.location}
            </p>

            <p>
              <b>Posted By:</b> {job.postedBy}
            </p>

            {/* RESIDENT ACTION */}
            {user?.role === "resident" && (
              <button style={applyBtn}>
                Apply
              </button>
            )}

            {/* GUEST VIEW */}
            {user?.role === "guest" && (
              <div style={guestText}>
                View Listed Jobs only.
              </div>
            )}

            {/* ADMIN ACTIONS */}
            {user?.role === "admin" && (
              <div style={adminControls}>

                <button style={editBtn}>
                  <FaEdit />
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => deleteJob(job.id)}
                >
                  <FaTrash />
                  Delete
                </button>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showForm && user?.role === "resident" && (
        <div style={overlay}>
          <div style={modal}>

            <h2>Create Job Post</h2>

            <input
              style={input}
              placeholder="Job Title"
              value={jobForm.title}
              onChange={(e) =>
                setJobForm({
                  ...jobForm,
                  title: e.target.value
                })
              }
            />

            <textarea
              style={textarea}
              placeholder="Job Description"
              value={jobForm.description}
              onChange={(e) =>
                setJobForm({
                  ...jobForm,
                  description: e.target.value
                })
              }
            />

            <input
              style={input}
              type="number"
              placeholder="Budget"
              value={jobForm.budget}
              onChange={(e) =>
                setJobForm({
                  ...jobForm,
                  budget: e.target.value
                })
              }
            />

            <input
              style={input}
              placeholder="Location"
              value={jobForm.location}
              onChange={(e) =>
                setJobForm({
                  ...jobForm,
                  location: e.target.value
                })
              }
            />

            <button style={submitBtn} onClick={createJob}>
              Post Job
            </button>

            <button
              style={cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default MicroJobs;

/* ================= STYLES ================= */

const page = {
  padding: "20px",
  background: "#f3f4f6",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  flexWrap: "wrap",
  gap: "10px"
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
};

const iconBox = {
  width: "55px",
  height: "55px",
  background: "#dbeafe",
  color: "#2563eb",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  marginBottom: "15px"
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "12px 0",
  color: "#16a34a",
  fontWeight: "bold"
};

const applyBtn = {
  width: "100%",
  padding: "12px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "15px",
  fontWeight: "bold"
};

const guestText = {
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  background: "#f3f4f6",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px"
};

const adminControls = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const editBtn = {
  flex: 1,
  padding: "10px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px"
};

const deleteBtn = {
  flex: 1,
  padding: "10px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  width: "400px",
  maxWidth: "90%"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none"
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  resize: "none",
  outline: "none"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "bold"
};

const cancelBtn = {
  width: "100%",
  padding: "12px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};