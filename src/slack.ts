import express from "express";
import path from "path";
import { Server } from "socket.io";
import { Room } from "./classes/Room";
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

app.get("/change-ns", (_req, res) => {
  namespaces[0].addRoom(new Room(0, "New Room", "1"));
  io.of(namespaces[0].endpoint).emit("nsChange", namespaces[0]);
  res.send(namespaces[0]);
});

io.on("connection", (socket) => {

  const userName = socket.handshake.auth.userName;
  const password = socket.handshake.auth.password;

  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("clientConnect", (data) => {
    socket.emit("nsList", namespaces);
  });
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    nsSocket.on("joinRoom", async (roomObj, ackCB) => {

      const thisNs = namespaces[roomObj.namespaceId];
    
      const thisRoomObj = thisNs.rooms.find((room) => room.roomTitle === roomObj.roomTitle);
      const thisRoomHistory = thisRoomObj?.history;

      // leave all the rooms except the first room
      let i = 0;
      nsSocket.rooms.forEach((room) => {
        if(i!=0){
          nsSocket.leave(room);
        }
        i++;
      });


      // join the room
      nsSocket.join(roomObj.roomTitle);

      // fetch the number of sockets in the room

      const sockets = await io.of(namespace.endpoint).in(roomObj.roomTitle).fetchSockets();
  
      const socketCount = sockets.length;
      
      ackCB({status: "success", message: `Joined ${roomObj.roomTitle}`, numUser:socketCount, history: thisRoomHistory});
    });

    nsSocket.on('newMessageToRoom',(msg)=>{
       const room = nsSocket.rooms;
       const currentRoom = Array.from(room)[1];
       // send this event to everyone in the room
       io.of(namespace.endpoint).to(currentRoom).emit('messageToRoom',msg);

       const thisNs = namespaces[msg.selectedNsId];
        const roomObj = thisNs.rooms.find((room) => room.roomTitle === currentRoom);

        if (roomObj) {
          roomObj.addMessage(msg);
        }

    })

  });
});

