import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // SAMPLE EVENTS (you will connect this later)
  const events = {
    "2026-05-10": ["Clean-up Drive"],
    "2026-05-15": ["Barangay Assembly"],
    "2026-05-20": ["Medical Mission"]
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // generate calendar cells
  const dates = [];

  // empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  // actual dates
  for (let d = 1; d <= totalDays; d++) {
    dates.push(d);
  }

  const formatDate = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      
      {/* HEADER */}
      <div style={header}>
        <button onClick={() => setCurrentDate(new Date(year, month - 1))}>
          ◀
        </button>

        <h3>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h3>

        <button onClick={() => setCurrentDate(new Date(year, month + 1))}>
          ▶
        </button>
      </div>

      {/* DAYS */}
      <div style={grid}>
        {days.map((day, i) => (
          <div key={i} style={dayHeader}>
            {day}
          </div>
        ))}

        {/* DATES */}
        {dates.map((d, i) => {
          const dateKey = d ? formatDate(d) : null;
          const dayEvents = events[dateKey] || [];

          return (
            <div
              key={i}
              style={dateCell}
              onClick={() => d && setSelectedDate(dateKey)}
            >
              {d && (
                <>
                  <div style={{ fontWeight: "bold" }}>{d}</div>

                  {/* EVENTS */}
                  {dayEvents.map((e, index) => (
                    <div key={index} style={eventText}>
                      • {e}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* EVENT DETAILS */}
      {selectedDate && (
        <div style={eventBox}>
          <h4>Events on {selectedDate}</h4>

          {(events[selectedDate] || []).length === 0 ? (
            <p>No events</p>
          ) : (
            events[selectedDate].map((e, i) => (
              <div key={i}>• {e}</div>
            ))
          )}

          <button
            style={closeBtn}
            onClick={() => setSelectedDate(null)}
          >
            Close
          </button>
        </div>
      )}

    </div>
  );
};

export default Calendar;

//
// 🎨 STYLES
//

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "10px"
};

const dayHeader = {
  textAlign: "center",
  fontWeight: "bold",
  color: "#6b7280"
};

const dateCell = {
  background: "white",
  minHeight: "80px",
  padding: "8px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
  cursor: "pointer"
};

const eventText = {
  fontSize: "11px",
  color: "#2563eb",
  marginTop: "4px"
};

const eventBox = {
  marginTop: "20px",
  padding: "15px",
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const closeBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  border: "none",
  background: "#ef4444",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer"
};