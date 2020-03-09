import * as Algorithms from '../algorithms/Algorithms.js'
import { Canvas } from '../../lib/Canvas.js'
import { Bar } from './Bar.js'

export class Visualize {
  /**
   * Creates a space for drawing onto the canvas
   * @param algorithm The algorithm name that will be used
   * @param array The array to be visualised
   */
  constructor (algorithm, array) {
    this.bgColor = '#f7f9fb'
    this.barColor = '#2F6CD0EE'

    this.canvas = new Canvas(window.innerWidth - 333, 370)
    this.canvas.background(this.bgColor)
    this.canvas.canvasElement.style.opacity = '1'

    this.barWidth = parseInt(document.getElementById('size').value)
    this.barHeight = 370 / ((this.canvas.width) / this.barWidth)

    this.speed = parseInt(document.getElementById('speed').value)

    this.algorithm = new Algorithms[algorithm]()
    this.algorithm.array = array

    if (array === undefined) {
      this.algorithm.array = []
      for (let i = 1; i < Math.floor(this.canvas.width / this.barWidth) + 1; i++) {
        this.algorithm.array.push(i)
      }
    }

    this.isSorting = false
    this.isShuffling = false
    this.isStopped = false
  }

  /**
   * Loops a method in this class at the fps given
   * @param  {String} method The string should be the name of the method
   * @param  {Number} fps The frames per second that it should be looping at
   */
  animate (method, fps) {
    if (!this.isShuffling && !this.isSorting) {
      this.loop = setInterval(
        (function (self) {
          return function () {
            self[method]()
          }
        })(this),
        1000 / fps
      )
    }
  }

  /**
   * Shuffles the array given at the constructor and draws it
   */
  shuffling () {
    this.isShuffling = true

    this.state()

    if (this.algorithm.index >= this.algorithm.array.length) {
      console.log(this.algorithm.array)
      this.algorithm.index = 0
      clearInterval(this.loop)
      this.isShuffling = false
    }
  }

  /**
   * Sorts the array given at the constructor and draws it
   */
  sorting () {
    if (!this.isSorting) this.algorithm.animateSort(this.algorithm.array)

    this.isSorting = true

    this.state()

    if (this.algorithm.isSorted(this.algorithm.array)) {
      console.log(this.algorithm.array)
      clearInterval(this.loop)
      this.algorithm.index = 0
      this.isSorting = false
    }
  }

  /**
   * Draws all the bars based on the array
   */
  state () {
    let color
    const rainbow = document.getElementById('rainbow').checked
    const track = document.getElementById('tracked').checked

    this.canvas.background(this.bgColor)

    this.algorithm.array.forEach((element, index) => {
      const hue = (360 / this.algorithm.array.length) * element
      if (rainbow) {
        color = `hsl( ${hue}, 100%, 50% )`
      } else {
        color = this.barColor
      }

      if ((this.algorithm.rIndex === index || this.algorithm.index === index || this.algorithm.jIndex === index) && track){
        color = '#f00'
      }

      if (this.algorithm.pivotIndex) {
        if (this.algorithm.pivotIndex === index) color = '#0f0'
      }
// Rianbow option
      let x = index * this.barWidth
      let y = rainbow ? 0 : this.canvas.height - (this.barHeight * element)
      let width = this.barWidth / 1.1
      let height = rainbow ? this.canvas.height : this.barHeight * element
      Bar.draw(x, y, width, height, color, this.canvas)
    })
  }

  /**
   * Changes the size of the canvas
   */
  resize () {
    this.canvas.setSize(window.innerWidth - 333, visualize.canvas.height)
    this.reset()
    this.state()
  }

  /**
   * Stops all animations and makes an ordered array
   */
  reset () {
    if (this.isShuffling || this.isSorting) {
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
      this.isShuffling = false
      this.isSorting = false
    }

    this.algorithm.index = 0
    this.algorithm.swapOff = 0
    this.algorithm.isSwapping = false

    this.algorithm.array = []

    for (let index = 1; index < (this.canvas.width / this.barWidth) + 1; index++) {
      this.algorithm.array.push(index)
    }

    this.barHeight = (this.canvas.height - 10) / ((this.canvas.width / this.barWidth))
  }

  /**
   * Changes how quickly, step sorted is called, increases speed on animation
   * @param {Number} speed The speed of the animation in fps
   */
  changeSpeed (speed) {
    this.speed = speed

    if (this.isSorting) {
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
      this.isSorting = false
      this.animate('sorting', this.speed)
    }

    if (this.isShuffling) {
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
      this.isShuffling = false
      this.animate( 'shuffling', this.speed)
    }
  }

  /**
   * Changes the width of the bars, will be made to fit the canvas
   * @param {Number} size The width of the bar in px
   */
  changeSize (size) {
    this.barWidth = size
    this.algorithm.barWidth = size
    this.reset()
    this.state()
  }

  /**
   * Stops all animations
   */
  stop () {
    clearInterval(this.loop)
    this.loopMax += this.loop + 1
    this.isStopped = true
  }

  /**
   * Resumes animation based on what function was stopped
   */
  resume () {
    if (!this.isStopped) return
    if (this.isSorting) {
      this.isSorting = false
      this.animate('sorting', this.speed)
      this.isStopped = false
    }
    if (this.isShuffling) {
      this.isShuffling = false
      this.animate('shuffling', 60)
      this.isStopped = false
    }
  }

  /**
   * Changes the algorithm variable
   * @param {Algorithms} algorithm The algorithm that will be used in the animations
   */
  changeAlgorithm (algorithm) {
    this.algorithm = new Algorithms[algorithm]()
    this.reset()
    this.state()
  }
}
