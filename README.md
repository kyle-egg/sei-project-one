# **Hoover Invaders** - A Space Invaders JavaScript Game

My first project for the General Assembly Software Engineering Immersive course using JavaScript. 

![Gif of Hoover Invaders](https://media.giphy.com/media/vMzkEdkMbbpnOvxu0X/giphy.gif)

## **Deployment**

I deployed this website on [GitHub Pages](https://kyle-egg.github.io/sei-project-one/). 

## Table Of Contents

* Concept
* Project Brief
* Technologies Used
* Planning
* Coding
* Finishing Touches
* Unsolved Problems
* Challenges
* Wins
* Features Wishlist 
* Key Learnings
* Updates After Deadline

## Concept

Creating the classic Space Invaders Game, but themed on my dog Milo and his not so healthy relationship with the vacuum cleaner! Play as Milo and bark away those pesky Henry Hoovers!

## Project Brief

* Build a working game using JavaScript hosted on the internet.
* Design logic for winning and visually display which player won.
* Implement a wireframe of the project.
* Timeframe: 7 days
* Technologies used:
* HTML5
* CSS3
* JavaScript
* GitHub

## Planning

I started developing the game by sketching out a basic wireframe of how I wanted the game to look. I noted down what was required from the game in order to build an MVP version, such as:
* Hoovers (invaders) moving their way down the grid with a shooting function.
* User being able to move Milo the Dog and shoot.
* Logic regarding shooting and removing Hoovers/Milo.
* Collision logic if Milo and a Hoover collide.
* Ending the game on a win/loss.
* For my extension goals I wanted to include levels and/or different difficulties. 

## Coding

I started by creating a grid using a for-loop. Creating a div element with an index value in order to create a grid for Milo and the hoovers to move within. Within the grid I picked an array of index numbers to pace the hoovers and one number for Milo.
In order for Milo to move with logic to not go out of bounds of the grid, I used the below function.
```javascript
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
```

With Milo moving with the keyboard arrows, I moved onto the logic for the hoovers. I managed to use a map to get the hoovers moving to the right side, using setinterval for them to move every second. 
```javascript
function hooversMoveRight() {
   setInterval(() => {
     removeHoovers()
     hoovers = hoovers.map(hoover => {
       const newHooverPositionRight = hoover + 1
       cells[newHooverPositionRight].classList.add('hoover')
       return newHooverPositionRight
     })
   }, 1000)
 }
 function removeHoovers() {
   cells.forEach(cell => {
     cell.classList.remove('hoover')
   })
 }
 ```

However I got stuck on having them move to the left when reaching to the edge. My first JavaScript hurdle! To not waste valuable time and with the hoovers successfully moving to the right, I moved onto other parts of the game. Making this an extension goal.
Now was the time to move on to getting the shooting sorted. I started with the Milo shot function which includes how he shoots and the collision logic as per the below:

```javascript
 function shootDog(e) { 
   let dogShot = dogPosition
   if (e.keyCode === 16) {
     bark()
     const dogShooting = setInterval(() => {
       cells[dogShot].classList.remove('dogshot')
       dogShot -= width
       cells[dogShot].classList.add('dogshot')
              
       // This ends the error once the shot goes off the grid
 
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
         cells[dogShot].classList.remove('dogshot')
         cells[dogShot += width].classList.remove('hoovershot')
         clearInterval(dogShooting)
       }
 
       // This communicates the WIN
       if (hoovers.length === 0) {
         win()
       }
 
     }, 100)
   }
 }
 ```
 
I then more or less replicated this function with the hoovers, except I changed the hoovers to shoot on a timer using setInterval().

## Finishing Touches

* With the MVP reached, I sadly did not have the time to fix the Hoover movement, nor adding difficulties and/or levels. 
* As of which, I moved onto styling the project and opted for a ‘carpet look’ for the hoovers and Milo to move on. Whilst also finding a great png for Henry Hoovers!
* I also found some good hoover sounds and barks to add to the game for comedic effect, whilst also comically editing the trademark Space Invaders title to Hoover Invaders.  

## Unsolved Problems

* Hoover movements moving in the ‘Space Invader way’
* The shooting can be quite quick. 
* The shots from Milo and the Hoovers sometimes do not cancel each other out (one usually ‘wins’).

## Challenges

This was my first project using JavaScript so I faced many challenges, of which the biggest were:
* Hoover movement movement logic.
* Collision detection logic.
* Working with various set timers to create movement.

## Wins

* Gained experience in programmatic thinking, logical problem solving and different planning stages.
* A fun and topical design theme.

## Features Wish List

* Adding in difficulties and levels. 
* Creating a splash page and editing the looks slightly. 

## Key Learnings

Making my first project using JavaScript was a great learning exercise and a fun way to use my recently learnt skills to create a game! In particular, I learnt a lot about creating logic, different use cases for different JavaScript array methods, and working with a deadline.

## Updates After Deadline
* Touched up the logo.

