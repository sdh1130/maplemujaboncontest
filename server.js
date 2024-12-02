const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 방 정보 저장
const rooms = {}; // 각 방의 플레이어 목록 및 상태 저장

app.use(express.static("public"));

// 클라이언트 연결 처리
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // 방 생성
    socket.on("createRoom", (roomID) => {
        if (rooms[roomID]) {
            socket.emit("error", "Room already exists.");
        } else {
            rooms[roomID] = { players: [socket.id], state: {} }; // 방 생성
            socket.join(roomID); // Socket.IO 방 참여
            socket.emit("roomCreated", roomID);
            console.log(`Room created: ${roomID}`);
        }
    });

    // 방 참여
    socket.on("joinRoom", (roomID) => {
        if (!rooms[roomID]) {
            socket.emit("error", "Room does not exist."); // 방이 없을 경우
        } else if (rooms[roomID].players.length >= 2) {
            socket.emit("error", "Room is full."); // 방이 이미 꽉 찬 경우
        } else {
            rooms[roomID].players.push(socket.id); // 방에 플레이어 추가
            socket.join(roomID);
            socket.emit("roomJoined", roomID); // 클라이언트에 성공 메시지 전달
            io.to(roomID).emit("playerJoined", { playerId: socket.id }); // 다른 플레이어에게 알림
            console.log(`User ${socket.id} joined room: ${roomID}`);
        }
    });

    // 밴픽 이벤트 전달
    socket.on("banPickAction", ({ roomID, action }) => {
        io.to(roomID).emit("banPickUpdate", action); // 같은 방의 클라이언트들에게 전달
    });

    // 연결 종료 처리
    socket.on("disconnect", () => {
        for (const roomID in rooms) {
            const index = rooms[roomID].players.indexOf(socket.id);
            if (index !== -1) {
                rooms[roomID].players.splice(index, 1); // 방에서 플레이어 제거
                if (rooms[roomID].players.length === 0) {
                    delete rooms[roomID]; // 방 삭제
                } else {
                    io.to(roomID).emit("playerLeft", socket.id); // 방에 남은 플레이어에게 알림
                }
                break;
            }
        }
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
