import { topSlider, bottomSlider } from './scripts/main.js'
import { Sound } from './scripts/sound.js'
import { controller } from './scripts/controller.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const ballSliderCollisionSound = new Sound(
  document.createElement('audio'),
  'media/ball_slider_collision_sound.mp3'
)

/**  The Ball **/
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  rad: 6,
  dx: 1,
  dy: -6,
  color: 'coral',

  setProperties() {
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = 1
    ball.dy = -6
  },

  draw: function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  },

  stop: function () {
    this.dx = this.dy = 0
  },

  newPosition: function () {
    this.x += this.dx
    this.y += this.dy
    // returns true if the top or bottom wall is hit
    this.detectWalls()
    this.detectSlider()
  },

  detectWalls: function () {
    // left wall
    if (this.x <= 0) {
      this.dx *= -1
      return false
    }
    // right wall
    if (this.x >= canvas.width) {
      this.dx *= -1
      return false
    }
  },

  /**  Get A Random Deflection Value In The Horizontal Direction **/
  getDeflectionAngle: function () {
    return Math.floor(Math.random() * 5) + 1
  },

  deflectDown: function () {
    // If slider center is hit, then 0 deflection horizontally
    if (this.x === topSlider.x + topSlider.w / 2) {
      this.dx = 0
    } else {
      this.dx = this.getDeflectionAngle()
      // If "A" is pressed and ball is moving left,
      // OR
      // If "D" is pressed and ball is moving right,
      // deflect horizontally in the opposite direction
      if (
        (controller[65].pressed && this.dx < 0) ||
        (controller[68].pressed && this.dx > 0)
      ) {
        this.dx *= -1
      }
    }
    // go in opposite direction
    this.dy *= -1
  },

  deflectUp: function () {
    // If slider center is hit, then 0 deflection horizontally
    if (this.x === bottomSlider.x + bottomSlider.w / 2) {
      this.dx = 0
    } else {
      this.dx = this.getDeflectionAngle()
      // If "LeftArrow" is pressed and ball is moving left,
      // OR
      // If "RightArrow" is pressed and ball is moving right,
      // deflect horizontally in the opposite direction
      if (
        (controller[37].pressed && this.dx < 0) ||
        (controller[39].pressed && this.dx > 0)
      ) {
        this.dx *= -1
      }
    }
    // go in opposite direction
    this.dy *= -1
  },

  detectSlider: function () {
    // detect top slider
    if (this.y - this.rad === topSlider.y + topSlider.h && this.y > 0) {
      // check if ball is horizontally within range of the top slider
      if (
        this.x - this.rad <= topSlider.x + topSlider.w &&
        this.x + this.rad >= topSlider.x
      ) {
        this.deflectDown()
        ballSliderCollisionSound.play()
        return
      }
    }
    // detect bottom slider
    if (this.y + this.rad === bottomSlider.y && this.y < canvas.height) {
      // check if ball is horizontally within range of the bottom slider
      if (
        this.x - this.rad <= bottomSlider.x + bottomSlider.w &&
        this.x + this.rad >= bottomSlider.x
      ) {
        this.deflectUp()
        ballSliderCollisionSound.play()
        return
      }
    }
  },
}

export { ball }
