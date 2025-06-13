import { Server } from "socket.io";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket is Connected", socket.id);

    socket.on("message", (data) => {
      console.log("Server side message", data);
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket is disconnected", socket.id);
    });
  });
}
