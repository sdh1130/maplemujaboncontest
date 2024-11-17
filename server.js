// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 챔피언 데이터 (예시)
const champions = [
    { id: 1, name: "히어로", image: "Hero.jpg" },
    { id: 2, name: "팔라딘", image: "Paladin.jpg" },
    { id: 3, name: "다크나이트", image: "champ3.png" },
    // 필요에 따라 추가
];

// 챔피언 데이터를 제공하는 API
app.get("/champions", (req, res) => {
    res.json(champions);
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
