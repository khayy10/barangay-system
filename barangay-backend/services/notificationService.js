const { Server } = require("socket.io");

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: { origin: "*" },
    });
  },

  sendToUser: (userId, data) => {
    if (!io) return;
    io.to(userId).emit("notification", data);
  },

  broadcast: (event, data) => {
    if (!io) return;
    io.emit(event, data);
  },
};