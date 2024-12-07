// Firebase 설정
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase 초기화
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 방 생성
function createRoom() {
    const roomID = document.getElementById("roomID").value.trim();
    if (!roomID) return alert("Please enter a room ID.");

    const roomRef = firebase.database().ref(`rooms/${roomID}`);
    roomRef.set({
        players: [null, null],
        bans: [],
        picks: [],
        currentPhase: "ban",
        currentTurn: "blue",
    }, (error) => {
        if (error) {
            alert("Error creating room: " + error.message);
        } else {
            alert(`Room ${roomID} created successfully!`);
            window.location.href = `/room.html?room=${roomID}`;
        }
    });
}

// 방 참여
function joinRoom() {
    const roomID = document.getElementById("roomID").value.trim();
    if (!roomID) return alert("Please enter a room ID.");

    const roomRef = firebase.database().ref(`rooms/${roomID}`);
    roomRef.once("value", (snapshot) => {
        if (!snapshot.exists()) {
            return alert("Room does not exist.");
        }

        const roomData = snapshot.val();
        if (roomData.players.includes(null)) {
            const playerIndex = roomData.players.indexOf(null);
            roomData.players[playerIndex] = firebase.database().ref().push().key;
            roomRef.set(roomData, (error) => {
                if (error) {
                    alert("Error joining room: " + error.message);
                } else {
                    alert(`Joined room ${roomID} successfully!`);
                    window.location.href = `/room.html?room=${roomID}`;
                }
            });
        } else {
            alert("Room is full.");
        }
    });
}

// 밴픽 시스템 시작
function startBanPickSystem(roomID) {
    const roomRef = firebase.database().ref(`rooms/${roomID}`);
    roomRef.on("value", (snapshot) => {
        const roomData = snapshot.val();
        if (roomData) {
            updateBanPickUI(roomData);
        }
    });
}

// UI 업데이트
function updateBanPickUI(roomData) {
    const container = document.getElementById("ban-pick-container");
    container.innerHTML = `
        <h2>Current Phase: ${roomData.currentPhase}</h2>
        <h3>Current Turn: ${roomData.currentTurn}</h3>
        <p>Bans: ${roomData.bans.join(", ")}</p>
        <p>Picks: ${roomData.picks.join(", ")}</p>
    `;
}
