// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')
// const scoreDisplay = document.querySelector('#score-display')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []


// let timer
// let score = 0
let dogPosition = 115
let hooverArray = [2, 3, 4, 5, 6, 7, 8]
const hooverStartPosition = 2
const hooverEndPositionEasy = 9


// * Functions

function removeDog() {
  cells[dogPosition].classList.remove('dog')
}

// function generateRandomPikachuIndex() {
//   return Math.floor(Math.random() * 100)
// }

// function hasPikachu(element) {
//   return element.classList.contains('pika')
// }

function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
    cell.textContent = i
  }
}


function moveDog(event) {

  removeDog(dogPosition) // * remove dog from the current position

  const x = dogPosition % width

  switch (event.keyCode) { // * calculate the next position and update it
    case 39:
      if (x < width - 1) dogPosition++
      break
    case 37:
      if (x > 0) dogPosition--
      break
  }

  addDog(dogPosition) // * add dog to the new position
}


document.addEventListener('keyup', moveDog)



// function endGame() {
//   clearInterval(timer)
//   removePikachu(pikaPosition)
//   alert(score)
// }


function startGame() {
  // timer = setInterval(() => {
  //   if (totalPikas > 9) {
  //     endGame()
  //     return
  //   }
  //   totalhoovers++
  //   removePikachu(pikaPosition)
  //   pikaPosition = generateRandomPikachuIndex()
  //   addPikachu(pikaPosition)
  // }, 1000)
  
  function addDog(dogPosition) {
    cells[dogPosition].classList.add('dog')
  }
  addDog(dogPosition)

  function addHooversEasy() {
    for (let i = hooverStartPosition, j = 13; i <= hooverEndPositionEasy, j < 20; i++, j++) {
    const rowOne = cells[i]
    const rowTwo = cells[j]
    rowOne.classList.add('hoover')
    rowTwo.classList.add('hoover')
    
    setInterval(() => {
    cells[i + 1].classList.add('hoover')
    cells[j + 1].classList.add('hoover')
  }, 1000)
  }
  }
  addHooversEasy()
  // console.log(hooverArray)
  // // timer = setInterval(() => {
  //   hooverArray = hooverArray.map((hoover) => {
  //     return hoover + 1
  //   })
  //   console.log(hooverArray)
  //   hooverArray.classList.add('hoover')
}

createGrid()

// * Events
start.addEventListener('click', startGame)


