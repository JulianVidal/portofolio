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
    this.bgColor = '#F2F2F2' // Background color
    this.barColor = '#172DA6' // Bar color

    // Canvas size based on the window's width
    if (window.innerWidth > 635) {
      this.canvas = new Canvas(window.innerWidth - 333, 370)
    } else {
      this.canvas = new Canvas(303, 370)
    }
    this.canvas.background(this.bgColor)
    this.canvas.canvasElement.style.opacity = '1'

    // Calculates width and height of bars
    this.barWidth = parseInt(document.getElementById('size').value)
    this.barHeight = 370 / ((this.canvas.width) / this.barWidth)

    // Sets up algorithm that will be used
    this.algorithm = new Algorithms[algorithm]()
    this.algorithm.array = array
    this.algorithm.speed = 1 / parseInt(document.getElementById('speed').value) * 1000
    this.algorithmName = algorithm

    // Creates the array that will be sorted
    if (array === undefined) {
      this.algorithm.array = []
      for (let i = 1; i < Math.floor(this.canvas.width / this.barWidth) + 1; i++) {
        this.algorithm.array.push(i)
      }
    }

    // Booleans for animation
    this.isSorting = false
    this.isShuffling = false
    this.isStopped = false
  }

  /**
   * Shuffles the array given at the constructor and draws it
   */
  shuffling () {
    if (this.isSorting) return
    if (!this.isShuffling && !this.isStopped) this.algorithm.animateShuffle(this.algorithm.array)

    this.isShuffling = true

    this.state()

    if (this.algorithm.index >= this.algorithm.array.length || this.isStopped) {
      console.log(this.algorithm.array)
      this.algorithm.index = -1
      this.isShuffling = false
      this.isStopped = false
    } else {
      window.requestAnimationFrame((function (self) {
        return function () {
          self.shuffling()
        }
      })(this))
    }
  }

  /**
   * Sorts the array given at the constructor and draws it
   */
  sorting () {
    if (this.isShuffling) return
    if (!this.isSorting && !this.isStopped) this.algorithm.animateSort(this.algorithm.array)

    this.isSorting = true

    this.state()

    if ((this.algorithm.isSorted(this.algorithm.array) && this.algorithm.done) || this.isStopped) {
      console.log(this.algorithm.array)
      this.algorithm.index = -1
      this.algorithm.jIndex = -1
      this.isSorting = false
      this.isStopped = false
    } else {
      window.requestAnimationFrame((function (self) {
        return function () {
          self.sorting()
        }
      })(this))
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

      if (this.algorithm.index === index && track) {
        color = '#f00'
      }

      if (this.algorithm.jIndex === index && track) {
        color = '#f00'
      }

      const x = index * this.barWidth
      const y = rainbow ? 0 : this.canvas.height - (this.barHeight * element)
      const width = rainbow ? this.barWidth : this.barWidth / 1.1
      const height = rainbow ? this.canvas.height : this.barHeight * element
      Bar.draw(x, y, width, height, color, this.canvas)
    })
  }

  /**
   * Stops all animations and makes an ordered array
   */
  reset () {
    if (this.isShuffling || this.isSorting) {
      this.isStopped = true
    }
    this.isShuffling = false
    this.isSorting = false

    this.barWidth = parseInt(document.getElementById('size').value)
    this.barHeight = (this.canvas.height - 10) / ((this.canvas.width / this.barWidth))

    this.algorithm = new Algorithms[this.algorithmName]()

    this.algorithm.array = []

    for (let index = 1; index < Math.floor(this.canvas.width / this.barWidth) + 1; index++) {
      this.algorithm.array.push(index)
    }

    this.state()
  }

  /**
   * Changes the algorithm variable
   * @param {Algorithms} algorithm The algorithm that will be used in the animations
   */
  changeAlgorithm (algorithm) {
    this.algorithmName = algorithm
    this.algorithm = new Algorithms[algorithm]()
    this.reset()
  }
}
