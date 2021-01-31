const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

/** Slider Class **/
class Slider {
  constructor(position) {
    this.position = position
    this.w = 50
    this.h = 8
    // center the slider
    this.x = canvas.width / 2 - this.w / 2
    // decide y based on top or bottom slider
    this.y = this.position === 'TOP' ? 0 : canvas.height - this.h
    // speed (horizontal)
    this.dx = 8
    this.color = 'white'
    this.draw()
  }

  resetPosition() {
    this.x = canvas.width / 2 - this.w / 2
    this.y = this.position === 'TOP' ? 0 : canvas.height - this.h
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  moveLeft() {
    this.x -= this.dx
  }

  moveRight() {
    this.x += this.dx
  }

  detectWalls() {
    // left wall
    if (this.x <= 0) {
      this.x = 0
    }
    // right wall
    else if (this.x + this.w >= canvas.width) {
      this.x = canvas.width - this.w
    }
  }
}

export { Slider }
