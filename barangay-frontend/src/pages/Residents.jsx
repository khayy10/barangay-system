import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Residents = () => {
  const { user } = useAuth();

  const role = user?.role;
  const isAdmin = role === "admin";

  const [residents] = useState([
    {
      id: 1,
      firstName: "Juan",
      middleName: "Dela",
      lastName: "Cruz",
      purok: "Purok 1"
    },
    {
      id: 2,
      firstName: "Maria",
      middleName: "Santos",
      lastName: "Lopez",
      purok: "Purok 2"
    }
  ]);

  const [search, setSearch] = useState("");

  // SEARCH (fullname only)
  const filteredResidents = residents.filter((r) =>
    `${r.firstName} ${r.middleName} ${r.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* HEADER */}
      <div style={headerStyle}>
        <h2>Resident Records</h2>

        {/* ADMIN ONLY */}
        {isAdmin && (
          <button style={addButton}>
            + Add Resident
          </button>
        )}
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search resident..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      {/* TABLE */}
      <div style={tableContainer}>
        <table style={tableStyle}>

          <thead>
            <tr>
              <th>Name</th>
              <th>Purok</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredResidents.map((r) => (
              <tr key={r.id}>

                {/* FULL NAME */}
                <td>
                  {r.firstName} {r.middleName} {r.lastName}
                </td>

                {/* PUROK ONLY */}
                <td>{r.purok}</td>

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                  <td>
                    <button style={editBtn}>Edit</button>
                    <button style={deleteBtn}>Delete</button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Residents;

/* ================= STYLES ================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const addButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const searchInput = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const tableContainer = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const editBtn = {
  marginRight: "10px",
  padding: "6px 10px",
  border: "none",
  background: "#10b981",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "6px 10px",
  border: "none",
  background: "#ef4444",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};