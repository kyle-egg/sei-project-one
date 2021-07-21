// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []

let dogPosition = 104
const hooverStartPosition = 13
const hooverEndPositionEasy = 19
// const hooverArray = [2,3,4,5,6,7,8,13,14,15,16,17,18,19]
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
  alert('You lose!')
  location.reload()
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
      const dogShooting = setInterval(() => {
        cells[dogShot].classList.remove('dogshot')
        dogShot -= width
        cells[dogShot].classList.add('dogshot')
                
        if (dogShot < 11 ) {
          setTimeout(()=>{
            cells[dogShot].classList.remove('dogshot')  
          }, 100)
          clearInterval(dogShooting)
          return
        }

        const hooverHit = cells[dogShot].classList.contains('hoover', 'dogshot')
        
        if (hooverHit) {
          cells[dogShot].classList.remove('dogshot', 'hoover')
          clearInterval(dogShooting)
        //   clearInterval(shoot)
        //   const deadHoover = cells[j].indexOf(dogShot)
        //   hooverGraveyard.push(deadHoover)
        //   console.log(deadHoover)
        //   console.log(hooverGraveyard)
        }

        const shotHit = cells[dogShot].classList.contains('hoovershot', 'dogshot')
        
        if (shotHit) {
          setTimeout(()=>{
            cells[dogShot].classList.remove('dogshot')
            console.log('dog shot dies')
          }, 100)
          clearInterval(dogShooting)
        }

      }, 500)
    }
  }
  window.addEventListener('keydown', shootDog)
    
  // This adds yo Hoover

  function addHooversEasy() {
    for (let i = hooverStartPosition, j = 24; i <= hooverEndPositionEasy, j <= 30; i++, j++) {
      // if(!)
      cells[i].classList.add('hoover')
      cells[j].classList.add('hoover')
    
      const hooverAdd = setInterval(() => {
        cells[i++].classList.add('hoover')
        cells[j++].classList.add('hoover')
        // const hooverArray = document.querySelectorAll('.hoover')
        // console.log(hooverArray)
        // if (cells[j++].classList.contains('right')) {
        //   cells[j] += 10
        // }
        
      
        if (cells[j].classList.contains('end', 'hoover')) {
          endGame()
          clearInterval(hooverAdd)
        }
      
      }, 1000)
    }
    setInterval(() => {
      let hooverShot = (Math.floor(dogPosition * Math.random())) 
      if (cells[hooverShot].classList.contains('hoover')) {

        const hooverShooting = setInterval(() => {

          cells[hooverShot].classList.remove('hoovershot')
          hooverShot += width
          cells[hooverShot].classList.add('hoovershot')
          

          if (hooverShot > 109 ) {
            setTimeout(()=>{
              cells[hooverShot].classList.remove('hoovershot')  
            }, 100)
            // cells[hooverShot].classList.remove('hoovershot')
            clearInterval(hooverShooting)
            return
          }
          
          console.log(dogPosition)
          console.log(hooverShot)

          if (dogPosition === hooverShot) {
            console.log('hit')
            clearInterval(hooverShooting)
            endGame()
          }

          const shootHit = cells[hooverShot].classList.contains('dogshot', 'hoovershot')
        
          if (shootHit) {
            setTimeout(()=>{
              cells[hooverShot].classList.remove('hoovershot')
              console.log('hoover shot dies')  
            }, 100)
            clearInterval(hooverShooting)
            return          
          }

        }, 500)
      }
    }, 100)

    // This creates the effect of the Hoovers Moving
    function removeHooversEasy() {
      for (let i = 11, j = 22; i <= 12, j <= 23; i++, j++) {
        setInterval(() => {
          cells[i++].classList.remove('hoover')
          cells[j++].classList.remove('hoover')
        }, 1000)
      }
    }
    removeHooversEasy()


  }
}
createGrid()
  
// * Events
start.addEventListener('click', startGame)
