const { Server } = require("socket.io");
const db = require("../config/db");

let io;

function initChatSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Join user room
    socket.on("join_room", (userId) => {
      socket.join(userId);
    });

    // 💬 Send message
    socket.on("send_message", async (data) => {
      // data: { senderId, receiverId, message }

      // Save to DB
      await db.query(
        "INSERT INTO messages(sender_id,receiver_id,message) VALUES($1,$2,$3)",
        [data.senderId, data.receiverId, data.message]
      );

      // Emit to receiver
      io.to(data.receiverId).emit("receive_message", data);
    });

    // 🔴 Typing indicator
    socket.on("typing", (data) => {
      io.to(data.receiverId).emit("typing", data);
    });

    // ❌ Disconnect
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initChatSocket;