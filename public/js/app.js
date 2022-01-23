let $ = document

//selection in Project
const wall = $.querySelector('.wall')
const door = $.querySelector('.door')
const bird = $.querySelector('.bird')
const gameOver = $.querySelector('.game-over')
const result = $.querySelector('.result')
const startGame = $.querySelector('.start-game')
const restart = $.querySelector('.restart')
const startbtn = $.querySelector('.startbtn')
const resultFainal = $.querySelector('.resultFainal')
const character = $.querySelector('.character')
const allBirds = $.querySelector('.all-Birds')
const imgCharacter = $.querySelectorAll('.imgCharacter')
const gameOverBirds = $.querySelector('.game-Over-img')

//score
let scoreCount = 0
let isJump = 0

//Start the Game
function hideStartGame() {
    //hide first cover Floppy Bird
    startGame.classList.add('hide-start')

    //Animation wall and door default is none 
    //Start animation By click me To start Button
    wall.style.animation = 'block 3s infinite linear'
    door.style.animation = 'block 3s infinite linear'

    //door top Random
    //update Score By animationiteration Event
    door.addEventListener('animationiteration', function () {
        let randomTop = -((Math.random() * 500) + 175)
        door.style.top = randomTop + 'px'
        //call Score Function
        scoreCount++
        scoreUpdate()
    })
    //check Live Bird
    setInterval(function () {

        let birdTop = parseInt(getComputedStyle(bird).getPropertyValue('top'))
        if (isJump == 0) {
            bird.style.top = (birdTop + 3) + 'px'
        }

        let wallLeft = parseInt(getComputedStyle(wall).getPropertyValue('left'))
        let doorTop = parseInt(getComputedStyle(door).getPropertyValue('top'))
        let cTop = -(630 - birdTop);
        if ((birdTop > 680) || ((wallLeft < 20) && (wallLeft > -50) && ((cTop < doorTop) || (cTop > doorTop + 130)))) {
            //bird daed Call GameOver Function
            gameOverHandler()
        }
    }, 10)
}

//score update
function scoreUpdate() {
    result.innerHTML = scoreCount
}

//Game Over
function gameOverHandler() {
    gameOver.classList.add('show-GameOver')
    // animation none Again to stop Game
    wall.style.animation = 'none'
    door.style.animation = 'none'

    //Show Fainal Score For You
    resultFainal.innerHTML = scoreCount
}

//restart The Game
function restartGame() {
    //Reset Score After Game Over
    scoreCount = 0;
    scoreUpdate()
    gameOver.classList.remove('show-GameOver')
    //aniamtion start for start game again After Click Restart
    wall.style.animation = 'block 3s infinite linear'
    door.style.animation = 'block 3s infinite linear'

    //Default Top Bird in Start game To Control By User
    bird.style.top = 100 + "px";
}

//Jump Bird
function jump() {
    isJump = 1
    let jumpCount = 0
    let jumpInterval = setInterval(function () {
        let birdTop = parseInt(getComputedStyle(bird).getPropertyValue('top'))
        if ((birdTop > 6) && (jumpCount < 15)) {
            bird.style.top = (birdTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            isJump = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

function characterHandler() {
    //remove game over box 
    gameOver.classList.remove('show-GameOver')
    //show Character Box
    allBirds.classList.add('show-allBirds')

    //click To character And replace Bird image
    imgCharacter.forEach(function (item) {
        item.addEventListener('click', function (event) {
            let srcCharacter = event.target.src

            bird.setAttribute('src', srcCharacter)
            gameOverBirds.setAttribute('src', srcCharacter)
            allBirds.classList.remove('show-allBirds')

            //call restart Function To Play By New Bird Character
            restartGame()
        })
    })
}

//event jump By onclick and Space
window.addEventListener('click', jump)
window.addEventListener('keypress', function (event) {
    if (event.code == 'Space') {
        jump()
    }
})

//restart After Game Over
restart.addEventListener('click', restartGame)
//start game Event
startbtn.addEventListener('click', hideStartGame)
//click To chose character
character.addEventListener('click', characterHandler)