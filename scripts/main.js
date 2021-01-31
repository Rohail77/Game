import { Slider } from './slider.js'
import { ball } from '../ball.js'
import { controller } from './controller.js'
import { Sound } from './sound.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

/* 
This Must Hold: 
(ball.y - ball.rad) - (topSlider.y + topSlider.h) / dy === 0 
*/

/**  Clear Canvas **/
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/** Update Canvas **/
const update = () => {
  clearCanvas()

  ball.draw()
  topSlider.draw()
  bottomSlider.draw()
  if (isGameOver()) return
  ball.newPosition()

  executeMoves()

  requestAnimationFrame(update)
}

/** Check If Game Is Over **/
const isGameOver = () => {
  // ball hit the top OR bottom wall
  if (ball.y <= 0 || ball.y >= canvas.height) {
    ball.stop()
    const gameOverSound = new Sound(
      document.createElement('audio'),
      'media/game_over.wav'
    )
    gameOverSound.play()
    updateMessages()
    return true
  }
}

/** Execute Slider Moves **/
const executeMoves = () => {
  Object.keys(controller).forEach(key => {
    if (controller[key].pressed) {
      controller[key].move()
      topSlider.detectWalls()
      bottomSlider.detectWalls()
    }
  })
}

const keydown = e => {
  if (controller[e.keyCode]) {
    controller[e.keyCode].pressed = true
  }
}

const keyup = e => {
  if (controller[e.keyCode]) {
    controller[e.keyCode].pressed = false
  }
}

document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)

/** Update Messages When Game Is Over **/
const updateMessages = () => {
  prompt.innerHTML = 'Game Over'
  startGameBtn.disabled = false
  startGameBtn.innerHTML = 'Play Again'
}

const startGameBtn = document.getElementById('start-game-btn')
const prompt = document.getElementById('prompt')

/** Display Initial Timer Before Starting Game **/
const startGame = () => {
  setCanvasObjects()
  startGameBtn.disabled = true
  prompt.innerHTML = 'Get Ready'
  const timer = document.getElementById('timer')
  timer.style.display = 'block'

  let count = 3
  timer.innerHTML = count
  let id = setInterval(displayTime, 1000)

  function displayTime() {
    timer.innerHTML = --count
    if (count === 0) {
      clearInterval(id)
      timer.style.display = 'none'
      prompt.innerHTML = 'Play!'
      requestAnimationFrame(update)
    }
  }
}

let topSlider, bottomSlider

/**  Set The Properties of Sliders And Ball And make Canvas **/
const setCanvasObjects = () => {
  clearCanvas()
  // initialize top and bottom sliders
  topSlider = new Slider('TOP')
  bottomSlider = new Slider('BOTTOM')
  topSlider.draw()
  bottomSlider.draw()
  ball.setProperties()
  ball.draw()
}

startGameBtn.addEventListener('click', startGame)

export { topSlider, bottomSlider }
