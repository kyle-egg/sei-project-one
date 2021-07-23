// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score-display')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []
const rightSide = [10,21,32,43,54,65,76,87,98,109,120]

let dogPosition = 104
let hoovers = [13,14,15,16,17,18,19,24,25,26,27,28,29,30,35,36,37,38,39,40,41] 
let score = 0

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
  alert(`You Suck! You Scored ${score} Points! Play Again?`)
  location.reload()
}

function win() {
  alert(`You Win! With A Score Of ${score}! Play Again?`)
  location.reload()
}

function startGame() {
  createGrid()

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
  
  // This moves your doggy

  function moveDog(event) {
    removeDog(dogPosition) 
    const x = dogPosition % width
    switch (event.keyCode) { 
      case 39:
        if (x < width - 1) dogPosition++
        break
      case 37:
        if (x > 0) dogPosition--
        break
    }
    addDog(dogPosition) 
  }
  window.addEventListener('keyup', moveDog)

  // This shoots your doggy

  function shootDog(e) {  
    let dogShot = dogPosition
    if (e.keyCode === 16) {
      const dogShooting = setInterval(() => {
        cells[dogShot].classList.remove('dogshot')
        dogShot -= width
        cells[dogShot].classList.add('dogshot')
                
        // This ends the error once shot goes off the grid

        if (dogShot < 11 ) {
          setTimeout(()=>{
            cells[dogShot].classList.remove('dogshot')  
          }, 100)
          clearInterval(dogShooting)
          return
        }
        // This defines the point where a hoover dies

        const hooverHit = cells[dogShot].classList.contains('hoover')

        // This is how the hoover dies

        if (hooverHit) {
          cells[dogShot].classList.remove('dogshot', 'hoover')
          score += 1000
          scoreDisplay.textContent = score
          hoovers = hoovers.filter(hoover => {
            return dogShot !== hoover
          })
          clearInterval(dogShooting)
        }


        // This defines the point where the shot collides with the shot

        const shotHit = cells[dogShot].classList.contains('hoovershot', 'dogshot')
        
        // This is how we counteract the collision

        if (shotHit) {
          // setTimeout(()=>{
          cells[dogShot].classList.remove('dogshot')
          cells[dogShot += width].classList.remove('hoovershot') 
          // console.log('dog shot dies')
          // }, 100)
          clearInterval(dogShooting)
        }

        // This communicates the WIN

        if (hoovers.length === 0) {
          console.log('yay')
          win()
        }

      }, 100)
    }
  }
  window.addEventListener('keydown', shootDog)
    
  // This adds your Hoover

  hoovers.forEach(hoover => {
    cells[hoover].classList.add('hoover')
  })

  function removeHoovers() {
    cells.forEach(cell => {
      cell.classList.remove('hoover')
    })
  }

  // This moves the Hoovers
  

  function hooversMoveRight() {
    const movingRight = setInterval(() => {
      removeHoovers()
      hoovers = hoovers.map(hoover => {
        const newHooverPositionRight = hoover + 1
        // if (rightSide.includes(newHooverPositionRight)) {
        //   console.log(newHooverPositionRight)
        cells[newHooverPositionRight].classList.add('hoover')
        //   clearInterval(movingRight)
        //   removeHoovers()
        //   hooversMoveDown()
        return newHooverPositionRight
        // } else {
        //   cells[newHooverPositionRight].classList.add('hoover')
        //   return newHooverPositionRight
        // }
      })
    }, 1000)
  }

  
  // function hooversMoveDown() {
  //     hoovers = hoovers.map(hoover => {
  //       const newHooverPositionDown = hoover + 4
  //       cells[newHooverPositionDown].classList.add('hoover')
  //       return newHooverPositionDown
  //     })
  // }


  hooversMoveRight()

  // This shoots the hoovers randomly
  
  setInterval(() => {
    let hooverShot = (Math.floor(dogPosition * Math.random())) 
    if (cells[hooverShot].classList.contains('hoover')) {

      const hooverShooting = setInterval(() => {

        cells[hooverShot].classList.remove('hoovershot')
        hooverShot += width
        cells[hooverShot].classList.add('hoovershot')
          
        // This makes sure the hoover shot does not go beyond the grid 

        if (hooverShot > 109 ) {
          // setTimeout(()=>{
          cells[hooverShot].classList.remove('hoovershot')  
          // }, 100)
          clearInterval(hooverShooting)
          return
        }

        // This results in the GAME OVER

        if (dogPosition === hooverShot) {
          clearInterval(hooverShooting)
          endGame()
        }

        // This shows where the shots collide

        const shootHit = cells[hooverShot].classList.contains('dogshot', 'hoovershot')
        if (shootHit) {
          // setTimeout(()=>{
          cells[hooverShot].classList.remove('hoovershot')
          // console.log('hoover shot dies')  
          // }, 100)
          clearInterval(hooverShooting)
          return          
        }
      }, 100)
    }
  }, 200)
}


// * Events
start.addEventListener('click', startGame)
