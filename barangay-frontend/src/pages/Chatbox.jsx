import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaPaperPlane } from "react-icons/fa";

const Chatbox = () => {
  const { user } = useAuth();

  // ================= ADMIN VIEW =================
  const adminConversations = [
    {
      name: "Juan Dela Cruz",
      messages: [
        {
          sender: "resident",
          text: "Good morning po.",
          time: "9:00 AM"
        },
        {
          sender: "admin",
          text: "Hello! How can we help you?",
          time: "9:02 AM"
        }
      ]
    },
    {
      name: "Maria Santos",
      messages: [
        {
          sender: "resident",
          text: "I want to ask about certificates.",
          time: "10:15 AM"
        }
      ]
    }
  ];

  // ================= RESIDENT VIEW =================
  const residentConversation = [
    {
      name: "Barangay Staff",
      messages: [
        {
          sender: "admin",
          text: "Hello! Welcome to Barangay Support.",
          time: "8:30 AM"
        }
      ]
    }
  ];

  // ROLE-BASED CONVERSATIONS
  const [conversations, setConversations] = useState(
    user?.role === "admin"
      ? adminConversations
      : residentConversation
  );

  // DEFAULT CHAT
  const [selectedUser, setSelectedUser] = useState(
    user?.role === "admin"
      ? "Juan Dela Cruz"
      : "Barangay Staff"
  );

  const [message, setMessage] = useState("");

  // SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    setConversations(
      conversations.map((chat) =>
        chat.name === selectedUser
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  sender:
                    user?.role === "admin"
                      ? "admin"
                      : "resident",
                  text: message,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }
              ]
            }
          : chat
      )
    );

    setMessage("");
  };

  const activeChat = conversations.find(
    (chat) => chat.name === selectedUser
  );

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h3>
          {user?.role === "admin"
            ? "Resident Messages"
            : "Barangay Support"}
        </h3>

        {conversations.map((chat, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(chat.name)}
            style={{
              ...chatUser,
              background:
                selectedUser === chat.name
                  ? "#2563eb"
                  : "white",
              color:
                selectedUser === chat.name
                  ? "white"
                  : "black"
            }}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div style={chatArea}>

        {/* HEADER */}
        <div style={chatHeader}>
          <h3>{selectedUser}</h3>
        </div>

        {/* MESSAGES */}
        <div style={messagesBox}>
          {activeChat?.messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender ===
                  (user?.role === "admin"
                    ? "admin"
                    : "resident")
                    ? "flex-end"
                    : "flex-start"
              }}
            >
              <div
                style={{
                  ...messageBubble,
                  background:
                    msg.sender ===
                    (user?.role === "admin"
                      ? "admin"
                      : "resident")
                      ? "#2563eb"
                      : "#e5e7eb",
                  color:
                    msg.sender ===
                    (user?.role === "admin"
                      ? "admin"
                      : "resident")
                      ? "white"
                      : "black"
                }}
              >
                <p style={{ margin: 0 }}>{msg.text}</p>
                <small>{msg.time}</small>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={inputBox}>
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={input}
          />

          <button style={sendBtn} onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

/* ================= STYLES ================= */

const container = {
  display: "flex",
  height: "90vh",
  background: "#f3f4f6"
};

const sidebar = {
  width: "280px",
  background: "white",
  borderRight: "1px solid #ddd",
  padding: "15px"
};

const chatUser = {
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "10px",
  cursor: "pointer",
  border: "1px solid #ddd"
};

const chatArea = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const chatHeader = {
  background: "white",
  padding: "15px",
  borderBottom: "1px solid #ddd"
};

const messagesBox = {
  flex: 1,
  padding: "20px",
  overflowY: "auto"
};

const messageBubble = {
  maxWidth: "300px",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px"
};

const inputBox = {
  display: "flex",
  gap: "10px",
  padding: "15px",
  background: "white",
  borderTop: "1px solid #ddd"
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const sendBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "0 18px",
  borderRadius: "8px",
  cursor: "pointer"
};