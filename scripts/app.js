// * DOM Variables

const grid = document.querySelector('.grid')
// const start = document.querySelector('#start')
// const scoreDisplay = document.querySelector('#score-display')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []

// let timer
// let score = 0
let dogPosition = 115
// let totalPikas = 0

// * Functions

function addDog(dogposition) {
  cells[dogPosition].classList.add('dog')
}

function removeDog(position) {
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


// function startGame() {
//   timer = setInterval(() => {
//     if (totalPikas > 9) {
//       endGame()
//       return
//     }
//     totalPikas++
//     removePikachu(pikaPosition)
//     pikaPosition = generateRandomPikachuIndex()
//     addPikachu(pikaPosition)
//   }, 1000)
// }

createGrid()
addDog(dogPosition)

// * Events
// start.addEventListener('click', startGame)
