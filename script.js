// 초기 변수 설정
let currentPhase = "ban"; // 시작은 밴 단계
let currentTurn = "blue"; // "blue" or "red"

// 밴과 픽 순서 정의
let firstBanOrder = [
    { turn: "blue", ban: 1 },
    { turn: "red", ban: 2 },
    { turn: "blue", ban: 3 },
    { turn: "red", ban: 4 },
    { turn: "blue", ban: 5 },
    { turn: "red", ban: 6 },
];
let midBanOrder = [
    { turn: "red", ban: 7 }, // 중간 밴
    { turn: "blue", ban: 8 },  // 중간 밴
];
let pickOrder = [
    { turn: "blue", pick: 1 },
    { turn: "red", pick: 2 },
    { turn: "red", pick: 3 },
    { turn: "blue", pick: 4 },
    { turn: "blue", pick: 5 },
    { turn: "red", pick: 6 },
    // 중간 밴 후 추가 픽
    { turn: "red", pick: 7 },
    { turn: "blue", pick: 8 },
];

let currentActionIndex = 0;
let blueBanned = [];
let redBanned = [];
let bluePicked = [];
let redPicked = [];
let timer;
let timeLeft = 60;

// 챔피언 풀 데이터 (임의로 설정, 실제 데이터에 맞게 변경)
const championPool = [
    { name: "히어로", image: "Champions/Hero.jpg" },
    { name: "팔라딘", image: "Champions/Paladin.jpg" },
    { name: "다크나이트", image: "Champions/Dark Knight.jpg" },
    { name: "소울마스터", image: "Champions/Soul Master.jpg" },
    { name: "미하일", image: "Champions/Mihile.jpg" },
    { name: "블래스터", image: "Champions/Blaster.jpg" },
    { name: "데몬슬레이어", image: "Champions/Demon Slayer.jpg" },
    { name: "데몬어벤져", image: "Champions/Demon Avenger.jpg" },
    { name: "아란", image: "Champions/Aran.jpg" },
    { name: "카이져", image: "Champions/Kaiser.jpg" },
    { name: "아델", image: "Champions/Adele.jpg" },
    { name: "제로", image: "Champions/Zero.jpg" },
    { name: "아크메이지(불,독)", image: "Champions/Arch Mage(Fire, Poison).jpg" },
    { name: "아크메이지(썬,콜)", image: "Champions/Arch Mage(Ice, Lightning).jpg" },
    { name: "비숍", image: "Champions/Bishop.jpg" },
    { name: "플레임위자드", image: "Champions/Flame Wizard.jpg" },
    { name: "배틀메이지", image: "Champions/Battle Mage.jpg" },
    { name: "에반", image: "Champions/Evan.jpg" },
    { name: "루미너스", image: "Champions/Luminous.jpg" },
    { name: "일리움", image: "Champions/Illium.jpg" },
    { name: "라라", image: "Champions/Lara.jpg" },
    { name: "키네시스", image: "Champions/Kinesis.jpg" },
    { name: "보우마스터", image: "Champions/Bowmaster.jpg" },
    { name: "신궁", image: "Champions/Marksman.jpg" },
    { name: "패스파인더", image: "Champions/Pathfinder.jpg" },
    { name: "윈드브레이커", image: "Champions/Wind Breaker.jpg" },
    { name: "와일드헌터", image: "Champions/Wild Hunter.jpg" },
    { name: "메르세데스", image: "Champions/Mercedes.jpg" },
    { name: "카인", image: "Champions/Kain.jpg" },
    { name: "나이트로드", image: "Champions/Night Lord.jpg" },
    { name: "섀도어", image: "Champions/Shadower.jpg" },
    { name: "듀얼블레이더", image: "Champions/Dual Blade.jpg" },
    { name: "나이트워커", image: "Champions/Night Walker.jpg" },
    { name: "제논", image: "Champions/Xenon.jpg" },
    { name: "팬텀", image: "Champions/Phantom.jpg" },
    { name: "카데나", image: "Champions/Cadena.jpg" },
    { name: "칼리", image: "Champions/Khali.jpg" },
    { name: "호영", image: "Champions/Ho Young.jpg" },
    { name: "바이퍼", image: "Champions/Viper.jpg" },
    { name: "캡틴", image: "Champions/Captain.jpg" },
    { name: "캐논슈터", image: "Champions/Cannon Shooter.jpg" },
    { name: "스트라이커", image: "Champions/Striker.jpg" },
    { name: "메카닉", image: "Champions/Mechanic.jpg" },
    { name: "은월", image: "Champions/Eunwol.jpg" },
    { name: "엔젤릭버스터", image: "Champions/Angelic Buster.jpg" },
    { name: "아크", image: "Champions/Ark.jpg" },

    // 나머지 챔피언 추가
];

const pickedChampionImages = [
    { name: "히어로", image: "Champions/Hero.png" },
    { name: "팔라딘", image: "Champions/Paladin.png" },
    { name: "다크나이트", image: "Champions/Dark Knight.png" },
    { name: "소울마스터", image: "Champions/Soul Master.png" },
    { name: "미하일", image: "Champions/Mihile.png" },
    { name: "블래스터", image: "Champions/Blaster.png" },
    { name: "데몬슬레이어", image: "Champions/Demon Slayer.png" },
    { name: "데몬어벤져", image: "Champions/Demon Avenger.png" },
    { name: "아란", image: "Champions/Aran.png" },
    { name: "카이져", image: "Champions/Kaiser.png" },
    { name: "아델", image: "Champions/Adele.png" },
    { name: "제로", image: "Champions/Zero.png" },
    { name: "아크메이지(불,독)", image: "Champions/Arch Mage(Fire, Poison).png" },
    { name: "아크메이지(썬,콜)", image: "Champions/Arch Mage(Ice, Lightning).png" },
    { name: "비숍", image: "Champions/Bishop.png" },
    { name: "플레임위자드", image: "Champions/Flame Wizard.png" },
    { name: "배틀메이지", image: "Champions/Battle Mage.png" },
    { name: "에반", image: "Champions/Evan.png" },
    { name: "루미너스", image: "Champions/Luminous.png" },
    { name: "일리움", image: "Champions/Illium.png" },
    { name: "라라", image: "Champions/Lara.png" },
    { name: "키네시스", image: "Champions/Kinesis.png" },
    { name: "보우마스터", image: "Champions/Bowmaster.png" },
    { name: "신궁", image: "Champions/Marksman.png" },
    { name: "패스파인더", image: "Champions/Pathfinder.png" },
    { name: "윈드브레이커", image: "Champions/Wind Breaker.png" },
    { name: "와일드헌터", image: "Champions/Wild Hunter.png" },
    { name: "메르세데스", image: "Champions/Mercedes.png" },
    { name: "카인", image: "Champions/Kain.png" },
    { name: "나이트로드", image: "Champions/Night Lord.png" },
    { name: "섀도어", image: "Champions/Shadower.png" },
    { name: "듀얼블레이더", image: "Champions/Dual Blade.png" },
    { name: "나이트워커", image: "Champions/Night Walker.png" },
    { name: "제논", image: "Champions/Xenon.png" },
    { name: "팬텀", image: "Champions/Phantom.png" },
    { name: "카데나", image: "Champions/Cadena.png" },
    { name: "칼리", image: "Champions/Khali.png" },
    { name: "호영", image: "Champions/Ho Young.png" },
    { name: "바이퍼", image: "Champions/Viper.png" },
    { name: "캡틴", image: "Champions/Captain.png" },
    { name: "캐논슈터", image: "Champions/Cannon Shooter.png" },
    { name: "스트라이커", image: "Champions/Striker.png" },
    { name: "메카닉", image: "Champions/Mechanic.png" },
    { name: "은월", image: "Champions/Eunwol.png" },
    { name: "엔젤릭버스터", image: "Champions/Angelic Buster.png" },
    { name: "아크", image: "Champions/Ark.png" },

    // 나머지 챔피언 추가
];

// 챔피언 풀 로드
function loadChampionPool() {
    const championPoolContainer = document.getElementById("champion-pool");
    championPoolContainer.innerHTML = ""; // 초기화

    championPool.forEach((champion, index) => {
        const img = document.createElement("img");
        img.src = champion.image;
        img.alt = champion.name;
        img.dataset.index = index;
        img.classList.add("champion");
        img.addEventListener("click", () => handleChampionClick(champion, img));
        championPoolContainer.appendChild(img);
    });
}

function loadChampionPick() {
    const championPickContainer = document.getElementById("champion-pick");
    championPickContainer.innerHTML = ""; // 초기화

    championPick.forEach((pickchampion, index) => {
        const pickimg = document.createElement("img");
        pickimg.src = pickchampion.image;
        pickimg.alt = pickchampion.name;
        pickimg.dataset.index = index;
    });
}

// 챔피언 클릭 처리
function handleChampionClick(champion, imgElement) {
    if (currentPhase === "ban" || currentPhase === "mid-ban") {
        handleBan(champion, imgElement);
    } else if (currentPhase === "pick") {
        handlePick(champion, imgElement);
    }
}

// 밴 처리
function handleBan(champion, imgElement) {
    let turnData;
    if (currentPhase === "ban") {
        turnData = firstBanOrder[currentActionIndex];
    } else if (currentPhase === "mid-ban") {
        turnData = midBanOrder[currentActionIndex];
    } else {
        return; // 밴 단계가 아닌 경우 처리 중단
    }

    if (currentTurn !== turnData.turn) return; // 잘못된 턴 방지

    if (currentTurn === "blue") {
        blueBanned.push(champion);
        updateBannedUI("blue", blueBanned);
    } else {
        redBanned.push(champion);
        updateBannedUI("red", redBanned);
    }

    imgElement.style.opacity = "0.5";
    imgElement.style.pointerEvents = "none";

    currentActionIndex++;

    if (currentPhase === "ban" && currentActionIndex < firstBanOrder.length) {
        // 첫 번째 밴 진행 중
        currentTurn = firstBanOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else if (currentPhase === "ban" && currentActionIndex === firstBanOrder.length) {
        // 첫 번째 밴 완료 후 픽으로 전환
        currentPhase = "pick";
        currentActionIndex = 0;
        currentTurn = pickOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else if (currentPhase === "mid-ban" && currentActionIndex < midBanOrder.length) {
        // 중간 밴 진행 중
        currentTurn = midBanOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else if (currentPhase === "mid-ban" && currentActionIndex === midBanOrder.length) {
        // 중간 밴 완료 후 픽 단계로 전환
        currentPhase = "pick";
        currentActionIndex = 6; // 픽 순서 재개
        currentTurn = pickOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    }
}

// 픽 처리
function handlePick(champion, imgElement) {
    const turnData = pickOrder[currentActionIndex];
    if (currentTurn !== turnData.turn) return; // 잘못된 턴 방지

    if (currentTurn === "blue") {
        bluePicked.push(champion);
        updatePickedUI("blue", bluePicked);
    } else {
        redPicked.push(champion);
        updatePickedUI("red", redPicked);
    }

    imgElement.style.opacity = "0.5";
    imgElement.style.pointerEvents = "none";

    currentActionIndex++;
    if (currentActionIndex < 6) {
        // 첫 번째 픽 진행 중
        currentTurn = pickOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else if (currentActionIndex === 6) {
        // 첫 번째 픽 완료 후 중간 밴으로 전환
        currentPhase = "mid-ban";
        currentActionIndex = 0;
        currentTurn = midBanOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else if (currentActionIndex < pickOrder.length) {
        // 두 번째 픽 진행 중
        currentTurn = pickOrder[currentActionIndex].turn;
        updateTurnIndicator();
        resetTimer();
    } else {
        endPickPhase(); // 모든 픽이 완료된 경우
    }
}

// 밴된 챔피언 UI 업데이트
function updateBannedUI(team, bannedChampions) {
    const container = document.getElementById(`${team}-bans`);
    container.innerHTML = ""; // 기존 내용 초기화
    bannedChampions.forEach((champion) => {
        const img = document.createElement("img");
        img.src = champion.image;
        img.alt = champion.name;
        container.appendChild(img);
    });
}

// 픽된 챔피언 UI 업데이트 함수
function updatePickedUI(team, pickedChampions) {
    const container = document.getElementById(`${team}-picked`);
    container.innerHTML = ""; // 기존 내용 초기화

    pickedChampions.forEach((champion) => {
        // 별도의 이미지 소스를 사용하도록 변경
        const pickedChampionImage = pickedChampionImages.find(img => img.name === champion.name);
        const img = document.createElement("img");
        img.src = pickedChampionImage ? pickedChampionImage.image : champion.image; // 다른 이미지 사용
        img.alt = champion.name;
        img.style.borderRadius = '8px';
        container.appendChild(img);
    });
}

// 턴 표시 업데이트
function updateTurnIndicator() {
    const turnIndicator = document.getElementById("turn-indicator");
    if (currentPhase === "ban") {
        const turnData = firstBanOrder[currentActionIndex];
        turnIndicator.textContent = `${turnData.turn.toUpperCase()}'S TURN (BAN ${turnData.ban})`;
    } else if (currentPhase === "mid-ban") {
        const turnData = midBanOrder[currentActionIndex];
        turnIndicator.textContent = `${turnData.turn.toUpperCase()}'S TURN (BAN ${turnData.ban})`;
    } else if (currentPhase === "pick") {
        const turnData = pickOrder[currentActionIndex];
        turnIndicator.textContent = `${turnData.turn.toUpperCase()}'S TURN (PICK ${turnData.pick})`;
    }
    turnIndicator.style.color = currentTurn === "blue" ? "#3498db" : "#e74c3c";
}

// 타이머 시작
function startTimer() {
    const timerElement = document.getElementById("timer");
    timeLeft = 60; // 타이머 초기화
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`${currentTurn.toUpperCase()} 팀의 시간이 초과되었습니다. 다음 턴으로 진행합니다.`);
            autoPickOrBan(); // 시간이 초과되었을 때 자동 선택/밴
        }
    }, 1000);
}

// 타이머 리셋
function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// 자동 선택 또는 밴
function autoPickOrBan() {
    const availableChampions = Array.from(
        document.querySelectorAll("#champion-pool img:not([style*='opacity'])")
    );
    if (availableChampions.length > 0) {
        const randomChampionIndex = Math.floor(Math.random() * availableChampions.length);
        const randomChampionElement = availableChampions[randomChampionIndex];
        const championIndex = randomChampionElement.dataset.index;
        handleChampionClick(championPool[championIndex], randomChampionElement);
    }
}

// script.js

// script.js

// 현재 챔피언 풀에서 남은 챔피언 중 랜덤으로 3개를 선택하는 함수
function selectRandomChampionsForFinalPick(team, excludeChampion = null) {
    // 밴 및 픽된 챔피언을 제외한 남은 챔피언 리스트 생성
    const remainingChampions = championPool.filter(champion => {
        return !bluePicked.includes(champion) &&
               !redPicked.includes(champion) &&
               !blueBanned.includes(champion) &&
               !redBanned.includes(champion) &&
               champion !== excludeChampion;
    });

    if (remainingChampions.length < 3) {
        alert("남은 챔피언이 충분하지 않습니다.");
        return;
    }

    // 남은 챔피언 중 3개를 랜덤으로 선택
    const randomChampions = [];
    while (randomChampions.length < 3) {
        const randomIndex = Math.floor(Math.random() * remainingChampions.length);
        const selectedChampion = remainingChampions[randomIndex];
        if (!randomChampions.includes(selectedChampion)) {
            randomChampions.push(selectedChampion);
        }
    }

    // 선택된 3개의 랜덤 챔피언을 표시
    displayRandomChampions(randomChampions, team);
}

// 각 팀의 리롤 가능 여부를 추적
let blueRerollUsed = false;
let redRerollUsed = false;

// 각 팀의 리롤 가능 횟수를 설정
let blueRerollCount = 3; // 블루 팀의 리롤 횟수
let redRerollCount = 3; // 레드 팀의 리롤 횟수

// 랜덤으로 선택된 챔피언을 표시하고 선택할 수 있도록 하는 함수
// 랜덤으로 선택된 챔피언을 표시하고 선택할 수 있도록 하는 함수
// 랜덤으로 선택된 챔피언을 표시하고 선택할 수 있도록 하는 함수
function displayRandomChampions(champions, team) {
    const championPoolContainer = document.getElementById('champion-pool-container');
    const containerWidth = championPoolContainer.offsetWidth;
    const containerHeight = championPoolContainer.offsetHeight;

    // 기존 선택 창이 있으면 제거
    const existingContainer = document.getElementById('random-selection-container');
    if (existingContainer) {
        document.body.removeChild(existingContainer);
    }

    const selectionContainer = document.createElement('div');
    selectionContainer.id = 'random-selection-container';
    selectionContainer.style.position = 'fixed';
    selectionContainer.style.top = '50%';
    selectionContainer.style.left = '50%';
    selectionContainer.style.transform = 'translate(-50%, -50%)';
    selectionContainer.style.width = `${containerWidth}px`;
    selectionContainer.style.height = `${containerHeight}px`;
    selectionContainer.style.display = 'flex';
    selectionContainer.style.flexDirection = 'column';
    selectionContainer.style.justifyContent = 'center';
    selectionContainer.style.alignItems = 'center';
    selectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    selectionContainer.style.borderRadius = '8px';
    selectionContainer.style.zIndex = '1000';

    const imageContainer = document.createElement('div');
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.gap = '20px';

    champions.forEach((champion, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.style.display = 'flex';
        imgContainer.style.flexDirection = 'column';
        imgContainer.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = champion.image;
        img.alt = champion.name;
        img.style.width = '280px';
        img.style.height = '230px';
        img.style.borderRadius = '8px';
        img.style.cursor = 'pointer';

        img.addEventListener('click', () => {
            alert(`${team.toUpperCase()} 팀이 ${champions[index].name}을(를) 선택했습니다.`);
            document.body.removeChild(selectionContainer);
            addFinalPickToTeam(team, champions[index]); // 리롤된 챔피언 상태를 반영하여 선택

            // 다음 팀의 리롤 창 띄우기
            if (team === "red") {
                selectRandomChampionsForFinalPick("blue");
            }
        });

        // 리롤 버튼 추가
        const rerollButton = document.createElement('button');
        rerollButton.textContent = 'Re-roll';
        rerollButton.style.marginTop = '10px';
        rerollButton.style.padding = '5px 10px';
        rerollButton.style.fontSize = '14px';
        rerollButton.style.cursor = 'pointer';

        let rerollUsed = false; // 리롤 사용 여부 확인

        rerollButton.addEventListener('click', () => {
            if (!rerollUsed) {
                let rerollCount = team === 'blue' ? blueRerollCount : redRerollCount;

                if (rerollCount > 0) {
                    if (team === 'blue') {
                        blueRerollCount--;
                    } else if (team === 'red') {
                        redRerollCount--;
                    }

                    // 리롤 가능한 챔피언 중 중복되지 않는 새로운 챔피언 선택
                    const availableChampions = championPool.filter(ch =>
                        !champions.includes(ch) &&
                        !bluePicked.includes(ch) &&
                        !redPicked.includes(ch) &&
                        !blueBanned.includes(ch) &&
                        !redBanned.includes(ch)
                    );

                    if (availableChampions.length > 0) {
                        const newChampion = availableChampions[Math.floor(Math.random() * availableChampions.length)];
                        champions[index] = newChampion; // 리롤된 챔피언으로 업데이트
                        img.src = newChampion.image;
                        img.alt = newChampion.name;
                        alert(`${team.toUpperCase()} 팀이 새로운 챔피언을 리롤했습니다: ${newChampion.name}`);

                        rerollUsed = true; // 리롤 사용 기록
                        rerollButton.disabled = true; // 버튼 비활성화
                        rerollButton.style.opacity = "0.5"; // 비활성화 시각 효과
                    } else {
                        alert("리롤할 수 있는 챔피언이 충분하지 않습니다.");
                    }
                } else {
                    alert(`${team.toUpperCase()} 팀은 더 이상 리롤할 수 없습니다.`);
                }
            } else {
                alert("이미 리롤을 사용한 칸입니다.");
            }
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(rerollButton);
        imageContainer.appendChild(imgContainer);
    });

    selectionContainer.appendChild(imageContainer);
    document.body.appendChild(selectionContainer);
}




// 마지막 픽을 팀의 픽 칸에 추가하는 함수
function addFinalPickToTeam(team, champion) {
    if (team === "blue") {
        bluePicked.push(champion);
        updatePickedUI("blue", bluePicked);
    } else if (team === "red") {
        redPicked.push(champion);
        updatePickedUI("red", redPicked);
    }
}

// 픽 페이즈 종료 후 랜덤 선택 단계로 이동
function endPickPhase() {
    clearInterval(timer);
    alert("Pick phase completed!");
    document.getElementById("turn-indicator").textContent = "All picks are done!";
    // 레드 팀이 첫 번째 랜덤 픽을 선택
    selectRandomChampionsForFinalPick("red");
}

// 초기화 및 UI 업데이트
loadChampionPool();
startTimer();
updateTurnIndicator();
