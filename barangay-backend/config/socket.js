const { Server } = require("socket.io");

let io;

function socketSetup(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Connected:", socket.id);

    // Join user room (for chat)
    socket.on("join_user", (userId) => {
      socket.join(userId);
    });

    // 💬 CHAT SYSTEM (Resident ↔ Admin)
    socket.on("send_message", (data) => {
      // data: { senderId, receiverId, message }
      io.to(data.receiverId).emit("receive_message", data);
    });

    // 🔔 NOTIFICATIONS
    socket.on("send_notification", (data) => {
      io.emit("receive_notification", data);
    });

    // 📅 Appointment updates
    socket.on("appointment_update", (data) => {
      io.emit("appointment_notification", data);
    });

    // 💼 Micro-job updates
    socket.on("job_update", (data) => {
      io.emit("job_notification", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
}

module.exports = socketSetup;