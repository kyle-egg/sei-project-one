// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []

let dogPosition = 115
const hooverStartPosition = 2
const hooverEndPositionEasy = 9
const hooverArray = [2,3,4,5,6,7,8,13,14,15,16,17,18,19]
const hooverGraveyard = []

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
  alert('You lose!')
}

function startGame() {
 
  addHooversEasy()
  // This defines the end so the invaders can win
  cells[111].classList.add('end') 

  // cells[21].classList.add('right')

  // This adds dog
  function addDog(dogPosition) {
    cells[dogPosition].classList.add('dog')
  }
  addDog(dogPosition)
  
  function removeDog() {
    cells[dogPosition].classList.remove('dog')
  }
  function addShot(dogShot) {
    cells[dogShot].classList.add('dogshot')
  }

  function removeShot() {
    cells[dogShot].classList.remove('dogshot')
  }
  // !This does not Work!!!
  function shotEnd() {
    clearInterval(shoot)
  }
  
  // This moves yo doggy
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

  // This shoots yo doggy

  function shootDog(e) {  
    let dogShot = dogPosition
    if (e.keyCode === 16) {
      setInterval((shoot) => {
        cells[dogShot].classList.remove('dogshot')
        dogShot -= width
        cells[dogShot].classList.add('dogshot')
        
        // const hooverHit = cells[dogShot].classList.contains('hoover', 'dogshot')
        
        // if (hooverHit) {
        //   console.log(hooverHit)
        //   // ! This is not quite working!!
        //   hooverHit.classList.remove('dogshot', 'hoover')
          
        //   clearInterval(shoot)
        //   const deadHoover = cells[j].indexOf(dogShot)
        //   hooverGraveyard.push(deadHoover)
        //   console.log(deadHoover)
        //   console.log(hooverGraveyard)
        // }
            
      }, 100)
    }
  }
  window.addEventListener('keydown', shootDog)
    
  // This adds yo Hoover

  function addHooversEasy() {
    for (let i = hooverStartPosition, j = 13; i <= hooverEndPositionEasy, j < 20; i++, j++) {
      // if(!)
      cells[i].classList.add('hoover')
      cells[j].classList.add('hoover')
    

      setInterval(() => {
        cells[i++].classList.add('hoover')
        cells[j++].classList.add('hoover')
        // const hooverArray = document.querySelectorAll('.hoover')
        // console.log(hooverArray)
        // if (cells[j++].classList.contains('right')) {
        //   cells[j] += 10
        // }
        // ! Error here too!
        
        function hooversShooting (e) {
          let hooverShot = (dogPosition * Math.random())
          console.log(hooverShot)
          console.log(cells[i].getAttribute('data-index'))
          // let randomShotIndex = (Math.floor(Math.random() * 500))
          // if (randomShotIndex == cells[j].getAttribute('data-index') || cells[i].getAttribute('data-index')) {
          //   console.log('yeah')
          // } else {
          //   console.log('nah')
          // }
        }
        
        hooversShooting()

        if (cells[j].classList.contains('end', 'hoover')) {
          endGame()
          clearInterval()
        }
      
      }, 1000)
    }
  }

  // This creates the effect of the Hoovers Moving
  function removeHooversEasy() {
    for (let i = 0, j = 11; i <= 1, j <= 12; i++, j++) {
      setInterval((removeHoovers) => {
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
