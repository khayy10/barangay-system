import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaCheck, FaTimes } from "react-icons/fa";

const CommunityServices = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [tab, setTab] = useState("complaints");

  const [complaints] = useState([
    {
      id: 1,
      resident: "Juan Dela Cruz",
      complaint: "Noise disturbance",
      date: "2026-05-09",
      status: "Pending"
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      resident: "Maria Santos",
      purpose: "Barangay Meeting",
      date: "2026-05-10",
      status: "Pending",
      note: ""
    }
  ]);

  const [form, setForm] = useState({ complaint: "" });

  /* ================= RESIDENT ================= */

  const submitComplaint = () => {
    if (!form.complaint) return;

    alert("Complaint submitted");

    setForm({ complaint: "" });
  };

  const markAvailable = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Available" } : a
      )
    );
  };

  const requestReschedule = (id) => {
    const reason = prompt("Reason for reschedule:");
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Reschedule Requested", note: reason }
          : a
      )
    );
  };

  /* ================= ADMIN ================= */

  const approve = (id) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Approved" } : a
      )
    );
  };

  const decline = (id) => {
    const reason = prompt("Reason:");
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Declined", note: reason }
          : a
      )
    );
  };

  const addAppointment = () => {
    const resident = prompt("Resident:");
    const purpose = prompt("Purpose:");
    const date = prompt("Date (YYYY-MM-DD):");

    if (!resident || !purpose || !date) return;

    setAppointments((prev) => [
      ...prev,
      {
        id: Date.now(),
        resident,
        purpose,
        date,
        status: "Pending",
        note: ""
      }
    ]);
  };

  /* ================= STATUS STYLE ================= */

  const statusStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "white",
    background:
      status === "Approved"
        ? "#16a34a"
        : status === "Pending"
        ? "#f59e0b"
        : status === "Available"
        ? "#2563eb"
        : "#dc2626"
  });

  /* ================= BUTTONS ================= */

  const btnPrimary = {
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const btnSuccess = {
    padding: "6px 10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer"
  };

  const btnDanger = {
    padding: "6px 10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer"
  };

  const btnWarning = {
    padding: "6px 10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  /* ================= TABLE ================= */

  const table = {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden"
  };

  const thtd = {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left"
  };

  const page = {
    padding: "20px",
    background: "#f5f6fa"
  };

  /* ================= RESIDENT ================= */

  if (role === "resident") {
    return (
      <div style={page}>
        <h2>Community Services</h2>

        <div style={{ background: "white", padding: 15, borderRadius: 10 }}>
          <h3>Submit Complaint</h3>

          <input
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
            placeholder="Enter complaint"
            value={form.complaint}
            onChange={(e) =>
              setForm({ ...form, complaint: e.target.value })
            }
          />

          <button style={btnPrimary} onClick={submitComplaint}>
            Submit Complaint
          </button>
        </div>

        <h3 style={{ marginTop: 20 }}>Complaint History</h3>

        <table style={table}>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td style={thtd}>{c.complaint}</td>
                <td style={thtd}>{c.date}</td>
                <td style={thtd}>
                  <span style={statusStyle(c.status)}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: 20 }}>Appointments</h3>

        <table style={table}>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td style={thtd}>{a.purpose}</td>
                <td style={thtd}>{a.date}</td>
                <td style={thtd}>
                  <span style={statusStyle(a.status)}>{a.status}</span>
                </td>
                <td style={thtd}>
                  <button style={btnSuccess} onClick={() => markAvailable(a.id)}>
                    Available
                  </button>

                  <button style={btnWarning} onClick={() => requestReschedule(a.id)}>
                    Reschedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* ================= ADMIN ================= */

  return (
    <div style={page}>
      <h2>Community Services (Admin)</h2>

      <div style={{ marginBottom: 10 }}>
        <button style={btnPrimary} onClick={() => setTab("complaints")}>
          Complaints
        </button>

        <button
          style={{ ...btnPrimary, marginLeft: 10 }}
          onClick={() => setTab("appointments")}
        >
          Appointments
        </button>
      </div>

      {tab === "complaints" && (
        <table style={table}>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td style={thtd}>{c.resident}</td>
                <td style={thtd}>{c.complaint}</td>
                <td style={thtd}>
                  <span style={statusStyle(c.status)}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "appointments" && (
        <>
          <button style={btnPrimary} onClick={addAppointment}>
            + Add Appointment
          </button>

          <table style={{ ...table, marginTop: 10 }}>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td style={thtd}>{a.resident}</td>
                  <td style={thtd}>{a.purpose}</td>
                  <td style={thtd}>{a.date}</td>
                  <td style={thtd}>
                    <span style={statusStyle(a.status)}>{a.status}</span>
                  </td>
                  <td style={thtd}>
                    <button style={btnSuccess} onClick={() => approve(a.id)}>
                      <FaCheck />
                    </button>

                    <button style={btnDanger} onClick={() => decline(a.id)}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CommunityServices;