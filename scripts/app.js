// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []

let dogPosition = 115
let dogShot = dogPosition - width
const hooverStartPosition = 2
const hooverEndPositionEasy = 9

// * Functions


function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.setAttribute('data-index', i)
    cells.push(cell)
    grid.appendChild(cell)
    cell.textContent = i
  }
}

function endGame(){
  console.log('meow')
  clearInterval()
  alert("You lose bitch")
  }

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
  addHooversEasy()
  
  cells[30].classList.add('end')
  function addDog(dogPosition) {
    cells[dogPosition].classList.add('dog')
  }
  addDog(dogPosition)

  function removeDog() {
    cells[dogPosition].classList.remove('dog')
  }

  // function addShot(dogShot) {
  //   cells[dogShot].classList.add('dogshot')
  // }

  // function removeShot() {
  //   cells[dogShot].classList.remove('dogshot')
  // }



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
window.addEventListener('keyup', moveDog)

// function shootDog(event) {  
//   switch (event.keyCode) {
//     case 16:
//     addShot(dogShot)++ // * add shot
//     break
// }
//   addShot(dogShot)
// }

// window.addEventListener('keypress', shootDog)

  function addHooversEasy() {
    for (let i = hooverStartPosition, j = 13; i <= hooverEndPositionEasy, j < 20; i++, j++) {
    cells[i].classList.add('hoover')
    cells[j].classList.add('hoover')

    setInterval(() => {
    cells[i++].classList.add('hoover')
    cells[j++].classList.add('hoover')
      
    if (cells[j].classList.contains('end', 'hoover')) {
    endGame()
    clearInterval()
    }

    // cells[j + 20].classList.add('hoover')
    // if (cells[j].classList.contains('hoover')) {
    // for (let i = 50; i <= 55; i++) {
    //     cells[i].classList.add('hoover')
    // }}
    // console.log(cells[i++])
    // console.log(cells[j++])
    // if (cells[i++] < width - 1) cells[i + 50]
      // brea
    // case 37:
    //   if (x > 0) dogPosition--
    //   break
    // cells[i--].classList.remove('hoover')
  }, 1000)
  }
  }

  function removeHooversEasy() {
    for (let i = 0, j = 11; i <= 1, j<= 12; i++, j++) {
    setInterval(() => {
    cells[i++].classList.remove('hoover')
    cells[j++].classList.remove('hoover')
    }, 1000)
  }
}
removeHooversEasy()

}

createGrid()

// * Events
start.addEventListener('click', startGame)
