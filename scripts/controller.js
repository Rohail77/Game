import { topSlider, bottomSlider } from './main.js'

/**  Controller To Control Slider Movements **/
const controller = {
  // left arrow key
  37: {
    pressed: false,
    move: function () {
      bottomSlider.moveLeft()
    },
  },
  // right arrow key
  39: {
    pressed: false,
    move: function () {
      bottomSlider.moveRight()
    },
  },
  // "A" key
  65: {
    pressed: false,
    move: function () {
      topSlider.moveLeft()
    },
  },
  // "D" key
  68: {
    pressed: false,
    move: function () {
      topSlider.moveRight()
    },
  },
}

export { controller }
