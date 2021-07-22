// * DOM Variables

const grid = document.querySelector('.grid')
const start = document.querySelector('#start')

// * Game Variables

const width = 11
const gridCellCount = width * width
const cells = []

let dogPosition = 104

let hoovers = [13,14,15,16,17,18,19,24,25,26,27,28,29,30] 
const hooversMoveForward = []
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
  // addHooversEasy()
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

        const hooverHit = cells[dogShot].classList.contains('hoover')

        if (hooverHit) {
          // const deadHoover = dogShot          
          // hooverGraveyard.push(deadHoover)
          // console.log(deadHoover)
          // console.log(deadHoover)
          // console.log(hooverGraveyard)
          
          cells[dogShot].classList.remove('dogshot', 'hoover')

          hoovers = hoovers.filter(hoover => {
            return dogShot !== hoover
          })
          console.log(hoovers)
          clearInterval(dogShooting)
        }

        const shotHit = cells[dogShot].classList.contains('hoovershot', 'dogshot')
        
        if (shotHit) {
          setTimeout(()=>{
            cells[dogShot].classList.remove('dogshot')
            cells[dogShot += width].classList.remove('hoovershot') 
            // console.log('dog shot dies')
          }, 100)
          clearInterval(dogShooting)
        }

      }, 100)
    }
  }
  window.addEventListener('keydown', shootDog)
    
  // This adds yo Hoover

  hoovers.forEach(hoover => {
    cells[hoover].classList.add('hoover')
  })

  console.log(hoovers)

  function removeHoovers() {
    cells.forEach(cell => {
      cell.classList.remove('hoover')
    })
  }
  
  function hooversMove() {
    setInterval(() => {
      removeHoovers()
      console.log(hoovers)
      hoovers = hoovers.map(hoover => {
        const newHooverPosition = hoover + 1
        cells[newHooverPosition].classList.add('hoover')
        return newHooverPosition
          
      })

      // const removeHooverMovement = hooversMoveForward.filter(hoover => hoover[0])
      // console.log(removeHooverMovement)

      // hooversMoveForward.forEach(hoover => {
      //   cells[hoover].classList.add('hoover')
      //   console.log(hooversMoveForward)
      // })

    }, 1000)

  }
  hooversMove()
  // cells[hooversMoveForward[7]].classList.add('hoover')

  // function addHooversEasy() {
  //   const hooverAdd = setInterval(() => {
  //     for (let i = 0; i <= hoovers.length; i++) {
  //       console.log(hoovers.length, i)
  //       if (!hooverGraveyard.includes(i)) {
  //         cells[i++].classList.add('hoover')

  // console.log([j++])
  console.log(hooverGraveyard)
  // hoovers.splice(0, hoovers.length)
  // const updatingHoovers = hoovers.filter(h => hoovers.length > 6)
  // console.log(updatingHoovers)
  // hoovers.push(i)
  // hoovers.push(j)
  // console.log(hoovers)
  // console.log(hooverGraveyard)
  // hoovers.splice(0, hoovers.length)
  // console.log(hoovers)
  // const hooverArray = document.querySelectorAll('.hoover')
  // console.log(hooverArray)
  // if (cells[j++].classList.contains('right')) {
  //   cells[j] += 10
  // }

  // console.log(i)
          
  //         if (cells[i].classList.contains('end', 'hoover')) {
  //           endGame()
  //           clearInterval(hooverAdd)
  //         }
        
  //       } else {
  //         console.log('hello')
  //       }
  //     }
  //   }, 1500)
  // }
  
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

        if (dogPosition === hooverShot) {
          clearInterval(hooverShooting)
          endGame()
        }

        const shootHit = cells[hooverShot].classList.contains('dogshot', 'hoovershot')
        
        if (shootHit) {
          setTimeout(()=>{
            cells[hooverShot].classList.remove('hoovershot')
            // console.log('hoover shot dies')  
          }, 100)
          clearInterval(hooverShooting)
          return          
        }

      }, 100)
    }
  }, 100)

  // This creates the effect of the Hoovers Moving
  // function removeHooversEasy() {
  //   for (let i = 11; i < 23; i++) {
  //     setInterval(() => {
  //       cells[i++].classList.remove('hoover')
  //       cells[j++].classList.remove('hoover')
  //     }, 1000)
  //   }
  // }
  // removeHooversEasy()


}


// * Events
start.addEventListener('click', startGame)
