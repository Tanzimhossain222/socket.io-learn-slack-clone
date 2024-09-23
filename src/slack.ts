import path from "path";
import express from "express";
import { Server } from "socket.io";
import { namespaces } from "./data/namespaces";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const expressServer = app.listen(8001, () => {
  console.log("Server is running on port 8001");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.emit("nsList", namespaces);
});

