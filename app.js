const speedDash = document.querySelector('.speedDash');
const scoreDash = document.querySelector('.scoreDash');
const lifeDash = document.querySelector('.lifeDash');
const container = document.getElementById('container');
const btnStart = document.querySelector('.btnStart');

btnStart.addEventListener('click', startGame); 
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);
//Game Variables

let animationGame;
let gamePlay = false;
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
let player;

function startGame() {
    console.log(gamePlay);
    btnStart.style.display='none';  
    var div = document.createElement('div');
    div.setAttribute('class','playerCar');
    div.x = 250;
    div.y = 500;
    container.appendChild(div);
    gamePlay = true;
    animationGame = requestAnimationFrame(playGame);
    player = {
        ele: div,
        speed: 3,
        lives: 3,
        score: 0,
        carsToPass: 10,
        roadWidth: 250
    }
    startBoard();
}
function startBoard() {
    for(let x = 0; x < 13; x++) {
        let div = document.createElement('div');
        div.setAttribute('class','road');
        div.style.top = (x*50) + 'px';
        div.style.width = player.roadWidth + 'px';
        container.appendChild(div); 
    }
}
function pressKeyOn(event) {
    event.preventDefault();
    console.log(keys);
    keys[event.key] = true;
}

function pressKeyOff(event) {
    event.preventDefault();
    console.log(keys);
    keys[event.key] = false;
}
function updateDash() {
    scoreDash.innerHTML = player.score;
    lifeDash.innerHTML = player.lives;
    speedDash.innerHTML = Math.round(player.speed * 13);
}
function moveRoad() {
    let tempRoad = document.querySelectorAll('.road');
    console.log(tempRoad);
    let previousRoad = tempRoad[0].offsetLeft;
    for(let x = 0; x < tempRoad.length; x++) {
        let num = tempRoad[x].offsetTop + player.speed;
        if(num > 600){
            num = num - 650;
        }
        tempRoad[x].style.top = num + 'px';
    }
}
function playGame() {
    if(gamePlay){
    updateDash();
    //Movement
    moveRoad();
    if(keys.ArrowUp) {
        if(player.ele.y > 400) player.ele.y -= 1;
        player.speed = player.speed < 20 ? (player.speed +0.05) : 20;
    } 
    if(keys.ArrowDown) {
        if(player.ele.y < 500) player.ele.y += 1;
        player.speed = player.speed > 0 ? (player.speed -0.2) : 0;
    }
    if(keys.ArrowRight) {
        player.ele.x += player.speed/4;
    }
    if(keys.ArrowLeft) {
        player.ele.x -= player.speed/4;
    }
    player.ele.style.top = player.ele.y + 'px';
    player.ele.style.left = player.ele.x + 'px';

}
animationGame = requestAnimationFrame(playGame);
}