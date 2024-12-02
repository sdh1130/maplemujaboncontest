const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 방 정보 저장
const rooms = {};

app.use(express.static("public"));

// 방 생성 이벤트
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // 방 생성
    socket.on("createRoom", (roomID) => {
        if (rooms[roomID]) {
            socket.emit("error", "Room already exists.");
        } else {
            rooms[roomID] = { players: [socket.id], state: {} };
            socket.join(roomID);
            socket.emit("roomCreated", roomID);
            console.log(`Room created: ${roomID}`);
        }
    });

    // 방 참여
    socket.on("joinRoom", (roomID) => {
        if (!rooms[roomID]) {
            socket.emit("error", "Room does not exist.");
        } else if (rooms[roomID].players.length >= 2) {
            socket.emit("error", "Room is full.");
        } else {
            rooms[roomID].players.push(socket.id);
            socket.join(roomID);
            io.to(roomID).emit("roomJoined", roomID);
            console.log(`User ${socket.id} joined room: ${roomID}`);
        }
    });

    // 밴픽 이벤트 전달
    socket.on("banPickAction", ({ roomID, action }) => {
        io.to(roomID).emit("banPickUpdate", action);
    });

    // 연결 종료 시 방 정리
    socket.on("disconnect", () => {
        for (const roomID in rooms) {
            const index = rooms[roomID].players.indexOf(socket.id);
            if (index !== -1) {
                rooms[roomID].players.splice(index, 1);
                if (rooms[roomID].players.length === 0) {
                    delete rooms[roomID];
                } else {
                    io.to(roomID).emit("playerLeft", socket.id);
                }
                break;
            }
        }
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
